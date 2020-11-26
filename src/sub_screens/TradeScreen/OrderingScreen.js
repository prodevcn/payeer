import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../../constants/Globals';
import {Picker} from '@react-native-community/picker';
import {coinData} from '../../libs/Constants';
import AsyncStorage from '@react-native-community/async-storage';

const win = Dimensions.get('window');

export default class OrderingScreen extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      userInfo: {},
      balanceInfo: {},
      title: 'Exchange',
      giveCurrency: 'USD',
      giveAmount: '0',
      giveBalance: '',
      getCurrency: 'EUR',
      getAmount: '0',
      getBalance: '',
      type: this.props.route.params.type,
      tradeRate: '',
    };
  }
  selectGiveCurrency(value) {
    this.setState({giveCurrency: value});
    this.setState({giveBalance: this.state.balanceInfo[value]});
    let tradeRate = (
      Number(this.state.rate[this.state.getCurrency]) /
      Number(this.state.rate[value])
    ).toFixed(2);
    this.setState({tradeRate: String(tradeRate)});
    let giveAmount = (
      (Number(this.state.rate[value]) /
        Number(this.state.rate[this.state.getCurrency])) *
      Number(this.state.getAmount)
    ).toFixed(2);
    this.setState({giveAmount: String(giveAmount)});
  }
  selectGetCurrency(value) {
    this.setState({getCurrency: value});
    this.setState({getBalance: this.state.balanceInfo[value]});
    let tradeRate = (
      Number(this.state.rate[value]) /
      Number(this.state.rate[this.state.giveCurrency])
    ).toFixed(2);
    this.setState({tradeRate: String(tradeRate)});
    let getAmount = (
      (Number(this.state.rate[value]) /
        Number(this.state.rate[this.state.giveCurrency])) *
      Number(this.state.giveAmount)
    ).toFixed(2);
    this.setState({getAmount: String(getAmount)});
  }
  giveCurrency(input) {
    this.setState({giveAmount: input});
    console.log(this.state.rate);
    let getAmount = (
      (Number(this.state.rate[this.state.getCurrency]) /
        Number(this.state.rate[this.state.giveCurrency])) *
      Number(input)
    ).toFixed(2);
    this.setState({getAmount: String(getAmount)});
  }
  getCurrency(input) {
    this.setState({getAmount: input});
    let giveAmount = (
      (Number(this.state.rate[this.state.giveCurrency]) /
        Number(this.state.rate[this.state.getCurrency])) *
      Number(input)
    ).toFixed(2);
    this.setState({giveAmount: String(giveAmount)});
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      this.setState({userInfo: JSON.parse(value)});
      let userInfo = JSON.parse(value);
      let url = GLOBALS.BASE_URL + GLOBALS.GET_WALLET_INFO;
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountNumber: userInfo.accountNumber,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({balanceInfo: responseJson});
          this.setState({
            giveBalance: responseJson[this.state.giveCurrency],
          });
          this.setState({getBalance: responseJson[this.state.getCurrency]});
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
    fetch(GLOBALS.CURRENCY_RATE_URL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({currencyRate: responseJson.rates});
        let rate = responseJson.rates;
        console.log(rate);
        this.setState({rate: rate});
        let tradeRate = (
          Number(rate[this.state.giveCurrency]) /
          Number(rate[this.state.getCurrency])
        ).toFixed(2);
        this.setState({tradeRate: String(tradeRate)});
      })
      .catch((error) => {
        console.error(error);
      });
  };
  refresh() {
    this.getData();
    this.setState({giveAmount: '0', getAmount: '0'});
  }
  componentDidMount() {
    this.getData();
  }
  doExchange() {
    let url = GLOBALS.BASE_URL + GLOBALS.SET_EXCHANGE;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountNumber: this.state.userInfo.accountNumber,
        giveCurrency: this.state.giveCurrency,
        giveAmount: this.state.giveAmount,
        getCurrency: this.state.getCurrency,
        getAmount: this.state.getAmount,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.refresh();
        this.props.navigation.navigate('Balance');
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={styles.typeBar}>
            <TouchableOpacity
              onPress={() => {
                this.setState({type: 'buy'});
              }}>
              <Text
                style={
                  this.state.type === 'buy' ? styles.enabled : styles.disabled
                }>
                BUY
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({type: 'sell'});
              }}>
              <Text
                style={
                  this.state.type === 'sell' ? styles.enabled : styles.disabled
                }>
                SELL
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.type === 'sell' && (
            <View>
              <Text style={styles.title}>Give</Text>
              <View style={styles.titleArea}>
                {coinData.map((item, index) => {
                  if (item.name === this.state.giveCurrency) {
                    return (
                      <Image
                        source={item.iconUri}
                        style={styles.logo}
                        key={index}
                      />
                    );
                  }
                })}
                <TextInput
                  style={styles.input}
                  placeholder=""
                  onChangeText={(input) => {
                    this.giveCurrency(input);
                  }}
                  value={this.state.giveAmount}
                />
                <View style={styles.selectArea}>
                  <Picker
                    note
                    mode="dropdown"
                    selectedValue={this.state.giveCurrency}
                    onValueChange={this.selectGiveCurrency.bind(this)}>
                    {coinData.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          color={GLOBALS.SUB_COLOR}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.balanceArea}>
                <Text style={styles.title}>Balance : </Text>
                <Text style={styles.title}>{this.state.giveBalance}</Text>
              </View>
              <Text style={styles.title}>
                Price for {this.state.getCurrency}
              </Text>
              <View style={styles.titleArea}>
                {coinData.map((item, index) => {
                  if (item.name === this.state.getCurrency) {
                    return (
                      <Image
                        source={item.iconUri}
                        style={styles.logo}
                        key={index}
                      />
                    );
                  }
                })}
                <TextInput
                  style={styles.input1}
                  placeholder=""
                  onChangeText={(input) => {
                    this.setState({tradeRate: input});
                  }}
                  value={this.state.tradeRate}
                />
              </View>
              <Text style={styles.title}>Get</Text>
              <View style={styles.titleArea}>
                {coinData.map((item, index) => {
                  if (item.name === this.state.getCurrency) {
                    return (
                      <Image
                        source={item.iconUri}
                        style={styles.logo}
                        key={index}
                      />
                    );
                  }
                })}
                <TextInput
                  style={styles.input}
                  placeholder=""
                  onChangeText={(input) => {
                    this.getCurrency(input);
                  }}
                  value={this.state.getAmount}
                />
                <View style={styles.selectArea}>
                  <Picker
                    note
                    mode="dropdown"
                    selectedValue={this.state.getCurrency}
                    onValueChange={this.selectGetCurrency.bind(this)}>
                    {coinData.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          color={GLOBALS.SUB_COLOR}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.balanceArea}>
                <Text style={styles.title}>Balance : </Text>
                <Text style={styles.title}>{this.state.getBalance}</Text>
              </View>
            </View>
          )}
          {this.state.type === 'buy' && (
            <View>
              <Text style={styles.title}>Get</Text>
              <View style={styles.titleArea}>
                {coinData.map((item, index) => {
                  if (item.name === this.state.getCurrency) {
                    return (
                      <Image
                        source={item.iconUri}
                        style={styles.logo}
                        key={index}
                      />
                    );
                  }
                })}
                <TextInput
                  style={styles.input}
                  placeholder=""
                  onChangeText={(input) => {
                    this.getCurrency(input);
                  }}
                  value={this.state.getAmount}
                />
                <View style={styles.selectArea}>
                  <Picker
                    note
                    mode="dropdown"
                    selectedValue={this.state.getCurrency}
                    onValueChange={this.selectGetCurrency.bind(this)}>
                    {coinData.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          color={GLOBALS.SUB_COLOR}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.balanceArea}>
                <Text style={styles.title}>Balance : </Text>
                <Text style={styles.title}>{this.state.getBalance}</Text>
              </View>
              <Text style={styles.title}>
                Price for {this.state.getCurrency}
              </Text>
              <View style={styles.titleArea}>
                {coinData.map((item, index) => {
                  if (item.name === this.state.getCurrency) {
                    return (
                      <Image
                        source={item.iconUri}
                        style={styles.logo}
                        key={index}
                      />
                    );
                  }
                })}
                <TextInput
                  style={styles.input1}
                  placeholder=""
                  onChangeText={(input) => {
                    this.setState({tradeRate: input});
                  }}
                  value={this.state.tradeRate}
                />
              </View>
              <Text style={styles.title}>Give</Text>
              <View style={styles.titleArea}>
                {coinData.map((item, index) => {
                  if (item.name === this.state.giveCurrency) {
                    return (
                      <Image
                        source={item.iconUri}
                        style={styles.logo}
                        key={index}
                      />
                    );
                  }
                })}
                <TextInput
                  style={styles.input}
                  placeholder=""
                  onChangeText={(input) => {
                    this.giveCurrency(input);
                  }}
                  value={this.state.giveAmount}
                />
                <View style={styles.selectArea}>
                  <Picker
                    note
                    mode="dropdown"
                    selectedValue={this.state.giveCurrency}
                    onValueChange={this.selectGiveCurrency.bind(this)}>
                    {coinData.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          color={GLOBALS.SUB_COLOR}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View style={styles.balanceArea}>
                <Text style={styles.title}>Balance : </Text>
                <Text style={styles.title}>{this.state.giveBalance}</Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={() => {
              this.refresh();
            }}>
            <Icon name="refresh" color="white" size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            this.doExchange();
          }}
          style={
            this.state.giveAmount !== '0' &&
            this.state.giveAmount !== '' &&
            this.state.getAmount !== '' &&
            this.state.getAmount !== '0' &&
            Number(this.state.giveAmount) < Number(this.state.giveBalance)
              ? styles.exchangeBtn
              : styles.exchangeBtn_disabled
          }
          disabled={
            this.state.giveAmount !== '0' &&
            this.state.giveAmount !== '' &&
            this.state.getAmount !== '' &&
            this.state.getAmount !== '0' &&
            Number(this.state.giveAmount) < Number(this.state.giveBalance)
              ? false
              : true
          }>
          <Text style={styles.eBtn}>EXCHANGE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  exchangeBtn: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 15,
    backgroundColor: GLOBALS.SUB_COLOR,
  },
  exchangeBtn_disabled: {
    width: '100%',
    opacity: 0.5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 15,
    backgroundColor: GLOBALS.SUB_COLOR,
  },
  eBtn: {
    color: 'white',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: GLOBALS.BASE_COLOR,
  },
  container: {
    flex: 1,
    width: '90%',
    paddingTop: 30,
  },
  titleArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectArea: {
    width: '40%',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  textArea: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    width: '40%',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  input1: {
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    width: win.width * 0.8 * 0.9 + 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    marginVertical: 10,
    fontSize: 16,
    color: 'white',
  },
  balanceArea: {
    flexDirection: 'row',
  },
  refreshBtn: {
    width: 50,
    height: 50,
    backgroundColor: GLOBALS.SUB_COLOR,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // right: 20,
    // bottom: 200,
    alignSelf: 'flex-end',
  },
  typeBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  space: {
    width: '10%',
  },
  rateText: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  enabled: {
    backgroundColor: 'white',
    color: GLOBALS.BASE_COLOR,
    padding: 10,
    borderRadius: 20,
  },
  disabled: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
});
