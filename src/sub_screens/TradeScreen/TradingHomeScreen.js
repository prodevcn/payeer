import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Header from '../../components/header';
import {coinData} from '../../libs/Constants';
import GLOBALS from '../../constants/Globals';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {LineChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
const win = Dimensions.get('window');
export default class TradingHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Trade',
      targetUri: coinData[0].iconUri,
      targetCurrencyAmount: '',
      targetCurrencyName: coinData[0].name,
      baseUri: coinData[1].iconUri,
      baseCurrencyAmount: '',
      baseCurrencyName: coinData[1].name,
      userInfo: {},
      balanceInfo: {},
      period: '',
      graphImage:
        'https://www1.oanda.com/labsds/graph/EUR_USD_2020-06-01_1d_l.png',
    };
  }
  selectTargetCurrency(value) {
    this.setState({targetCurrencyName: value});
    coinData.map((item, index) => {
      if (item.name === value) {
        this.setState({
          targetUri: item.iconUri,
          targetCurrencyAmount: this.state.balanceInfo[item.name],
        });
      }
    });
  }
  selectBaseCurrency(value) {
    this.setState({baseCurrencyName: value});
    coinData.map((item, index) => {
      if (item.name === value) {
        this.setState({
          baseUri: item.iconUri,
          baseCurrencyAmount: this.state.balanceInfo[item.name],
        });
      }
    });
  }
  componentDidMount() {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo');
        const balance_value = await AsyncStorage.getItem('balanceInfo');
        this.setState({userInfo: JSON.parse(value)});
        this.setState({balanceInfo: JSON.parse(balance_value)});
        let userInfo = JSON.parse(value);
        let balanceInfo = JSON.parse(balance_value);
        this.setState({
          targetCurrencyAmount: balanceInfo[coinData[0].name],
          baseCurrencyAmount: balanceInfo[coinData[1].name],
        });
        console.log(userInfo);
        console.log(balanceInfo);
      } catch (e) {
        // error reading value
        console.log(e);
      }
    })();
  }
  setPeriod(period) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    console.log(date);
    console.log(year + '-' + month + '-' + day);
    let base_uri =
      'https://www1.oanda.com/labsds/graph/' +
      this.state.baseCurrencyName +
      '_' +
      this.state.targetCurrencyName +
      '_';
    // let uri = 'https://www1.oanda.com/labsds/graph/AUD_JPY_2020-01-02_3M_l.png';

    if (period === '1y') {
      let uri = base_uri + year + '-' + '01-01_1Y_l.png';
      this.setState({graphImage: uri});
      console.log(uri);
    }
    if (period === '6m') {
      console.log(month);
      let mm = Number(month) - 5;
      let uri = base_uri + year + '-' + '0' + mm + '-01_6M_l.png';
      this.setState({graphImage: uri});
      console.log(uri);
    }
    if (period === '3m') {
      let mm = Number(month) - 2;
      let uri = base_uri + year + '-' + '0' + mm + '-01_3M_l.png';
      this.setState({graphImage: uri});
      console.log(uri);
    }
    if (period === '1m') {
      let mm;
      if (String(month).length === 1) {
        mm = '0' + month;
      } else {
        mm = month;
      }
      let uri = base_uri + year + '-' + mm + '-01_1M_l.png';
      this.setState({graphImage: uri});
      console.log(uri);
    }
    if (period === '5d') {
      let mm;
      if (String(month).length === 1) {
        mm = '0' + month;
      } else {
        mm = month;
      }
      let dd;
      if (day < 5) {
        dd = '01';
      } else {
        if (String(day - 4).length === 1) {
          dd = '0' + String(day - 4);
        } else {
          dd = String(day - 4);
        }
      }
      let uri = base_uri + year + '-' + mm + '-' + dd + '_5d_l.png';
      this.setState({graphImage: uri});
      console.log(uri);
    }
    if (period === '2d') {
      let mm;
      if (String(month).length === 1) {
        mm = '0' + month;
      } else {
        mm = month;
      }
      let dd;
      if (day < 2) {
        dd = '01';
      } else {
        if (String(day - 1).length === 1) {
          dd = '0' + String(day - 4);
        } else {
          dd = String(day - 1);
        }
      }
      let uri = base_uri + year + '-' + mm + '-' + dd + '_2d_l.png';
      this.setState({graphImage: uri});
      console.log(uri);
    }
    if (period === '1d') {
      let mm;
      if (String(month).length === 1) {
        mm = '0' + month;
      }
      let dd;
      if (String(day).length === 1) {
        dd = '0' + day;
      } else {
        dd = day;
      }
      let uri = base_uri + year + '-' + mm + '-' + dd + '_1d_l.png';
      this.setState({graphImage: uri});
      console.log(uri);
    }
    this.setState({period: period});
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <Header title={this.state.title} navigation={this.props.navigation} />
        <View style={styles.content}>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}>
            <View style={styles.coinBar}>
              <View style={styles.container1}>
                <View style={styles.itemPart}>
                  <Image
                    style={styles.currencyIcon}
                    source={this.state.targetUri}
                  />
                  <View style={styles.currencyInfo}>
                    <Text style={styles.currencyTitle}>
                      {this.state.targetCurrencyName} BALANCE
                    </Text>
                    <Text style={styles.amount}>
                      {this.state.targetCurrencyAmount}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemPart}>
                  <Image
                    style={styles.currencyIcon}
                    source={this.state.baseUri}
                  />
                  <View style={styles.currencyInfo}>
                    <Text style={styles.currencyTitle}>
                      {this.state.baseCurrencyName} BALANCE
                    </Text>
                    <Text style={styles.amount}>
                      {this.state.baseCurrencyAmount}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <View style={styles.coinSelectBar}>
                <View style={styles.targetPicker}>
                  <Picker
                    note
                    mode="dropdown"
                    selectedValue={this.state.targetCurrencyName}
                    onValueChange={this.selectTargetCurrency.bind(this)}>
                    {coinData.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <View style={styles.sellPicker}>
                  <Picker
                    note
                    mode="dropdown"
                    selectedValue={this.state.baseCurrencyName}
                    onValueChange={this.selectBaseCurrency.bind(this)}>
                    {coinData.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item.name}
                          value={item.name}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                </View>
                {/* <View style={styles.basePicker} /> */}
              </View>
              <View style={styles.ratePanel}>
                <View style={styles.tradeArea}>
                  <Text style={styles.lastTitle}>$ {this.state.lastPrice}</Text>
                  <Text style={styles.subText}>Last Price</Text>
                </View>
                <View style={styles.tradeArea}>
                  <Text style={styles.lastTitle}>$ {this.state.lastPrice}</Text>
                  <Text style={styles.subText}>24h Volume</Text>
                </View>
                <View style={styles.tradeArea}>
                  <Text style={styles.lastTitle}>$ {this.state.bidPrice}</Text>
                  <Text style={styles.subText}>Bid</Text>
                </View>
                <View style={styles.tradeArea1}>
                  <Text style={styles.lastTitle}>$ {this.state.askPrice}</Text>
                  <Text style={styles.subText}>Ask</Text>
                </View>
              </View>
              <View style={styles.periodBar}>
                <TouchableOpacity
                  onPress={() => {
                    this.setPeriod('1d');
                  }}>
                  <Text
                    style={
                      this.state.period === '1d'
                        ? styles.enabled
                        : styles.disabled
                    }>
                    1D
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setPeriod('2d');
                  }}>
                  <Text
                    style={
                      this.state.period === '2d'
                        ? styles.enabled
                        : styles.disabled
                    }>
                    2D
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setPeriod('5d');
                  }}>
                  <Text
                    style={
                      this.state.period === '5d'
                        ? styles.enabled
                        : styles.disabled
                    }>
                    5D
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setPeriod('1m');
                  }}>
                  <Text
                    style={
                      this.state.period === '1m'
                        ? styles.enabled
                        : styles.disabled
                    }>
                    1M
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setPeriod('3m');
                  }}>
                  <Text
                    style={
                      this.state.period === '3m'
                        ? styles.enabled
                        : styles.disabled
                    }>
                    3M
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setPeriod('6m');
                  }}>
                  <Text
                    style={
                      this.state.period === '6m'
                        ? styles.enabled
                        : styles.disabled
                    }>
                    6M
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setPeriod('1y');
                  }}>
                  <Text
                    style={
                      this.state.period === '1y'
                        ? styles.enabled
                        : styles.disabled
                    }>
                    1Y
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{
                  uri: this.state.graphImage,
                }}
                style={styles.graph}
              />
            </View>
          </ScrollView>
        </View>
        <View style={styles.btn_group}>
          <TouchableOpacity
            style={styles.btn_buy}
            onPress={() => {
              this.props.navigation.navigate('Ordering', {type: 'buy'});
            }}>
            <View style={styles.btn_title}>
              <Text style={styles.title}>BUY</Text>
              <Text style={styles.title}>{this.state.targetCurrencyName}</Text>
            </View>
            <Icon name="arrow-circle-down" size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_new}
            onPress={() => {
              this.props.navigation.navigate('Ordering', {type: 'buy'});
            }}>
            <View style={styles.btn_title}>
              <Text style={styles.title}>NEW</Text>
              <Text style={styles.title}>ORDER</Text>
            </View>
            <Icon name="edit" size={24} color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn_sell}
            onPress={() => {
              this.props.navigation.navigate('Ordering', {type: 'sell'});
            }}>
            <View style={styles.btn_title}>
              <Text style={styles.title}>SELL</Text>
              <Text style={styles.title}>{this.state.targetCurrencyName}</Text>
            </View>
            <Icon name="arrow-circle-up" size={24} color={'white'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  container: {
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
    // flex: 1,
  },
  container1: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coinBar: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: GLOBALS.BASE_COLOR,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  itemPart: {
    width: '48%',
    flexDirection: 'row',
    // backgroundColor: 'tomato',
  },
  currencyIcon: {
    width: 50,
    height: 50,
  },
  currencyInfo: {
    marginLeft: 5,
  },
  currencyTitle: {
    color: 'white',
  },
  amount: {
    fontSize: 20,
    color: 'white',
  },
  title: {
    color: 'white',
    // fontSize: 20,
  },
  coinSelectBar: {
    marginVertical: 20,
    padding: 0,
    width: '100%',
    // backgroundColor: 'purple',
    flexDirection: 'row',
    // backgroundColor: 'tomato',
  },
  targetPicker: {
    // backgroundColor: 'tomato',
    width: '48%',
    marginRight: '4%',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'green',
  },
  sellPicker: {
    // backgroundColor: 'tomato',
    width: '48%',
    marginRight: '4%',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'tomato',
  },
  ratePanel: {
    width: '100%',
    backgroundColor: '#F8EFBA',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 5,
    marginVertical: 30,
    // marginTop: 50,
  },
  tradeArea: {
    width: '25%',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'green',
    borderRightWidth: 1,
  },
  tradeArea1: {
    width: '25%',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradePrice: {
    width: '50%',
  },
  lastTitle: {
    fontSize: 12,
    color: 'green',
  },
  subText: {
    fontSize: 12,
    color: '#777',
  },
  chartArea: {
    marginTop: 0,
  },
  chart: {
    borderRadius: 1,
  },
  btn_group: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
  },
  btn_buy: {
    backgroundColor: '#45CE30',
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  btn_new: {
    backgroundColor: '#3498DB',
    width: '34%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  btn_sell: {
    backgroundColor: '#FF362E',
    width: '33%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  scroll: {
    // backgroundColor: 'red',
    width: '100%',
  },
  content: {
    // backgroundColor: 'yellow',
    width: '100%',
    alignItems: 'center',
    marginBottom: win.height * 0.2,
    paddingBottom: 20,
  },
  graph: {
    width: win.width * 0.9,
    height: (win.width * 0.9 * 596) / 795,
  },
  periodBar: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  enabled: {
    backgroundColor: GLOBALS.SUB_COLOR,
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
  disabled: {
    backgroundColor: 'transparent',
    color: GLOBALS.SUB_COLOR,
    padding: 10,
    borderRadius: 20,
  },
});
