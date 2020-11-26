import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Modal from 'react-native-modal';
import Header from '../../components/header';
import {coinData} from '../../libs/Constants';
import WalletDetail from '../../components/WalletDetail';
import AsyncStorage from '@react-native-community/async-storage';
import GLOBALS from '../../constants/Globals';

const win = Dimensions.get('window');

export default class BalanceScreen extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      title: 'Balance',
      currency: '',
      currencyRate: {},
      selectedCurrency: coinData[1].name,
      currencyIcon: coinData[1].iconUri,
      currencySymbol: coinData[1].symbol,
      rate: '',
      showModal: false,
      balanceInfo: {},
      userInfo: {},
    };
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
          let sim = 'CAD';
          console.log(responseJson[sim]);
          console.log(userInfo.accountNumber);
          this.setState({balanceInfo: responseJson});
          // AsyncStorage.setItem('balanceInfo', JSON.stringify(responseJson));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  componentDidMount() {
    // this.getData();
    // console.log(this.sate.userInfo);
    fetch(GLOBALS.CURRENCY_RATE_URL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({currencyRate: responseJson.rates});
        let rate = (1 / responseJson.rates.EUR).toFixed(5);
        this.setState({rate: rate});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  setSelectedValue(value) {
    fetch(GLOBALS.CURRENCY_RATE_URL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        // this.setState({currencyRate: responseJson.rates});
        let key;
        let currencyRates = responseJson.rates;
        console.log(currencyRates);
        console.log(value.name);
        for (key in currencyRates) {
          if (currencyRates.hasOwnProperty(key)) {
            if (key === value.name) {
              let rate = (1 / currencyRates[key]).toFixed(5);
              this.setState({rate: rate});
              console.log(key);
              break;
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({currencyIcon: value.iconUri});
    this.setState({currencySymbol: value.symbol});
    this.setState({selectedCurrency: value.name, showModal: false});
  }
  refresh() {
    let url = GLOBALS.BASE_URL + GLOBALS.GET_WALLET_INFO;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountNumber: this.state.userInfo.accountNumber,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        let sim = 'CAD';
        console.log(responseJson[sim]);
        console.log(this.state.userInfo.accountNumber);
        this.setState({balanceInfo: responseJson});
        AsyncStorage.setItem('balanceInfo', JSON.stringify(responseJson));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header title={this.state.title} navigation={this.props.navigation} />
        <View style={styles.sub_header}>
          <View style={styles.element}>
            <TouchableOpacity activeOpacity={0.6} onPress={this.refresh()}>
              <Text style={styles.price}>
                {this.state.currencySymbol}:
                {this.state.balanceInfo[this.state.selectedCurrency]}
              </Text>
              <Text style={styles.description}>
                {this.state.userInfo.accountNumber}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          style={styles.main}>
          <View style={styles.modalView}>
            <FlatList
              style={styles.list}
              data={coinData}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.item_area}
                  onPress={() => {
                    this.setSelectedValue(item);
                  }}>
                  <Image source={item.iconUri} style={styles.logo} />
                  <Text style={styles.currencyName}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Modal>
        <View style={styles.titleArea}>
          <Text style={styles.titleStyle}>Trade</Text>
        </View>
        <View style={styles.trade_panel}>
          <View style={styles.chart_area}>
            <View style={styles.rank}>
              <Text style={styles.rank_text}>${this.state.rate}</Text>
              <Text style={styles.rank_rate}> @329.84(4.42%)</Text>
            </View>
            <Image
              source={require('../../../assets/images/chart.png')}
              style={styles.chart}
            />
          </View>
          <TouchableOpacity
            style={styles.currency_area}
            onPress={() => {
              this.setState({showModal: true});
            }}>
            <Image
              source={this.state.currencyIcon}
              style={styles.currency_small}
            />
            <View style={styles.down}>
              <Text style={styles.currencyName}>
                {this.state.selectedCurrency}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.titleArea}>
          <Text style={styles.titleStyle}>My wallets</Text>
        </View>
        <View style={styles.wallet_panel}>
          <View style={styles.wallet_board}>
            <FlatList
              style={styles.list}
              data={coinData}
              renderItem={({item}) => (
                <WalletDetail
                  navigation={this.props.navigation}
                  userInfo={this.state.userInfo}
                  currency={item}
                />
              )}
              keyExtractor={(item) => item.name}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#FC427B',
  },
  main: {
    alignItems: 'flex-end',
  },
  modalView: {
    width: win.width * 0.4,
    height: win.width * 0.8 * 0.75, //win.height * 0.6,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 5,
    // alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 15,
  },
  item_area: {
    width: '90%',
    // backgroundColor: 'red',
    // height: ,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    // marginTop: 5,
    paddingVertical: 5,
    // marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 20,
    // flex: 1,
  },
  currencyName: {
    color: '#aaa',
  },
  picker: {
    height: '50%',
    width: '100%',
    // backgroundColor: 'tomato',
  },
  sub_header: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#6c5ce7',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  price: {
    color: 'white',
    fontSize: 24,
  },
  description: {
    color: 'white',
  },
  trade_panel: {
    // marginTop: 20,
    width: '95%',
    height: '12%',
    // borderWidth: 2,
    // backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom: 20,
    borderRadius: 5,
    borderColor: '#6c5ce7',
    shadowColor: '#6c5ce7',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleArea: {
    // backgroundColor: 'tomato',
    width: '90%',
    marginVertical: 10,
  },
  titleStyle: {
    color: '#FC427B',
  },
  currency: {
    width: 50,
    height: 50,
  },
  currency_small: {
    width: 40,
    height: 40,
  },
  chart_area: {
    width: '75%',
    borderRightWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    // backgroundColor: 'tomato',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  chart: {
    width: 75,
    height: 45,
    // backgroundColor: 'pink',
    marginRight: 20,
    // margin: '10%',
  },
  currency_area: {
    // width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'purple',
    width: '20%',
    marginRight: 12,
  },
  rank: {
    paddingLeft: 20,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  rank_rate: {
    color: 'green',
  },
  rank_text: {
    fontSize: 24,
  },
  wallet_panel: {
    width: '95%',
    flex: 1,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'tomato',
  },
  wallet_board: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#6c5ce7',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  list: {
    paddingRight: 5,
  },
});
