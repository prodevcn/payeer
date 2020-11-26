import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

import GLOBALS from '../../constants/Globals';
import {coinData} from '../../libs/Constants';
import {paymentSystems} from '../../constants/PaymentSystems';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default class TransferMain extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      currency: this.props.route.params.system,
      amount: '',
      total: '',
      receiverAN: '',
      balance: this.props.route.params.balance,
      fee: 0.5,
      userInfo: {},
    };
  }
  componentDidMount() {
    this.getData();
  }
  setAmount(input) {
    this.setState({amount: input});
    let total = ((input * (100 + this.state.fee)) / 100).toFixed(2);
    this.setState({total: String(total)});
  }
  setTotal(input) {
    this.setState({total: input});
    let amount = ((input / (100 + this.state.fee)) * 100).toFixed(2);
    this.setState({amount: String(amount)});
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      this.setState({userInfo: JSON.parse(value)});
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          {coinData.map((item, index) => {
            if (item.name === this.props.route.params.system) {
              return (
                <View key={index}>
                  <Image source={item.iconUri} style={styles.logo} />
                  <Text style={styles.coinTitle}>{item.name}</Text>
                </View>
              );
            }
          })}
          {paymentSystems.map((item, index) => {
            if (item.name === this.props.route.params.system) {
              return (
                <View key={index}>
                  <Image source={item.iconUri} style={styles.logo} />
                  <Text style={styles.coinTitle}>{item.name}</Text>
                </View>
              );
            }
          })}
          <View style={styles.formItem}>
            <Text style={styles.title}>Amount</Text>
            <View style={styles.inputArea}>
              <View style={styles.symbolArea}>
                <Text style={styles.symbol}>{this.state.currency.symbol}</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(input) => this.setAmount(input)}
                value={String(this.state.amount)}
                placeholder="0.00"
                // keyboardType="numeric"
                placeholderTextColor="#aaa"
              />
              <Image source={this.state.currency.iconUri} style={styles.logo} />
            </View>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.title}>Total</Text>
            <View style={styles.inputArea}>
              <View style={styles.symbolArea}>
                <Text style={styles.symbol}>{this.state.currency.symbol}</Text>
              </View>
              <TextInput
                style={styles.input}
                onChangeText={(input) => this.setTotal(input)}
                value={String(this.state.total)}
                // keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#aaa"
              />
              <Image source={this.state.currency.iconUri} style={styles.logo} />
            </View>
          </View>
          <Text style={styles.title1}>Balance : {this.state.balance}</Text>
          <Text style={styles.fee}>Fee : {this.state.fee} % </Text>
          <View style={styles.accountNumber}>
            <Text style={styles.title2}>Account Number</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input1}
                onChangeText={(input) => this.setState({receiverAN: input})}
                value={this.state.receiverAN}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    receiverAN: this.state.userInfo.accountNumber,
                  });
                }}>
                <Icon name="user-circle" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={
            this.state.amount !== '' &&
            this.state.total !== '' &&
            this.state.receiverAN !== '' &&
            Number(this.state.total) < Number(this.state.balance) &&
            this.state.receiverAN.length === 11 &&
            this.state.receiverAN[0] === 'R'
              ? styles.nextBtn
              : styles.nextBtn_disabled
          }
          disabled={
            this.state.amount !== '' &&
            this.state.total !== '' &&
            this.state.receiverAN !== '' &&
            Number(this.state.total) < Number(this.state.balance) &&
            this.state.receiverAN.length === 11 &&
            this.state.receiverAN[0] === 'R'
              ? false
              : true
          }
          onPress={() =>
            this.props.navigation.navigate('TransferConfirm', {
              userInfo: this.state.userInfo,
              receiverAN: this.state.receiverAN,
              currency: this.state.currency,
              amount: this.state.amount,
              total: this.state.total,
              balance: this.state.balance,
            })
          }>
          <Text style={styles.btnText}>NEXT</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: GLOBALS.BASE_COLOR,
  },
  container: {
    width: '90%',
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  formItem: {
    // b
    width: '100%',
    marginVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginLeft: '15%',
  },
  title2: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  inputArea: {
    flexDirection: 'row',
    // backgroundColor: 'tomato',
    alignItems: 'center',
  },
  symbolArea: {
    width: '15%',
    alignItems: 'center',
  },
  symbol: {
    fontSize: 20,
    color: 'white',
  },
  coinTitle: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 24,
    width: '70%',
  },
  input1: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 24,
    width: '85%',
  },
  logo: {
    width: 50,
    height: 50,
  },
  title1: {
    color: 'white',
    fontSize: 16,
    marginLeft: '15%',
    alignSelf: 'flex-start',
  },
  fee: {
    marginTop: 10,
    color: '#aaa',
    alignSelf: 'flex-start',
  },
  accountNumber: {
    width: '100%',
    // backgroundColor: 'tomato',
    alignItems: 'center',
    marginTop: 20,
  },
  inputAN: {
    width: '85%',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
  },
  nextBtn: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    backgroundColor: GLOBALS.SUB_COLOR,
  },
  nextBtn_disabled: {
    paddingVertical: 15,
    opacity: 0.5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: GLOBALS.SUB_COLOR,
  },
  btnText: {
    color: 'white',
    fontSize: 20,
  },
});
