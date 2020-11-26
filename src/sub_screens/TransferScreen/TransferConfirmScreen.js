import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// import WebView from 'react-native-webview';

import GLOBALS from '../../constants/Globals';
import Toast from 'react-native-simple-toast';
const win = Dimensions.get('window');

export default class TransferConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.route.params.userInfo,
      receiverAN: this.props.route.params.receiverAN,
      currency: this.props.route.params.currency,
      amount: this.props.route.params.amount,
      total: this.props.route.params.total,
      balance: this.props.route.params.balance,
    };
  }
  doTransfer() {
    // this.props.navigation.navigate('TransferResult');
    if (this.state.receiverAN === this.state.userInfo.accountNumber) {
      Toast.show(
        'You can not transfer money to your wallet',
        Toast.LONG,
        Toast.TOP,
      );
      this.props.navigation.goBack();
    }

    let url = GLOBALS.BASE_URL + GLOBALS.SET_TRANSFER;
    console.log(url);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senderAccountNumber: this.state.userInfo.accountNumber,
        receiverAccountNumber: this.state.receiverAN,
        currency: this.state.currency.name,
        amount: this.state.amount,
        total: this.state.total,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // this.storeData(responseJson);
        console.log(responseJson);
        this.props.navigation.navigate('TransferResult', {
          transferInfo: responseJson,
          userInfo: this.state.userInfo,
          receiverAN: this.state.receiverAN,
          currency: this.state.currency,
          amount: this.state.amount,
          total: this.state.total,
          balance: this.state.balance,
        });
      })
      .catch((error) => {
        console.error(error);
        Toast.show(error, Toast.LONG, Toast.TOP);
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.header}>
          <Image source={this.state.currency.iconUri} style={styles.logo} />
          <Text style={styles.currencySymbol}>
            {this.state.currency.symbol}
          </Text>
          <Text style={styles.amount}>{this.state.amount}</Text>
        </View>
        <View style={styles.scroll}>
          <View style={styles.container}>
            <Text style={styles.title}>Payment information</Text>
            <View style={styles.infoDialog}>
              <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}>
                <View style={styles.infoSection}>
                  <Text style={styles.subject}>Operation type</Text>
                  <Text style={styles.info}>Transfer</Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.subject}>Payment system</Text>
                  <Text style={styles.info}>Royal Transfert</Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.subject}>Cancellation amount</Text>
                  <Text style={styles.red_info}>
                    {' '}
                    - {this.state.currency.symbol} {this.state.total}
                  </Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.subject}>Admissions amount</Text>
                  <Text style={styles.green_info}>
                    + {this.state.currency.symbol} {this.state.amount}
                  </Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.subject}>From</Text>
                  <Text style={styles.info}>
                    Royal Transfert {this.state.currency.name}
                  </Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.subject}>To</Text>
                  <Text style={styles.info}>
                    Royal Transfert {this.state.currency.name},{' '}
                    {this.state.receiverAN}
                  </Text>
                </View>
                <View style={styles.infoSection}>
                  <Text style={styles.subject}>Gateway fee</Text>
                  <Text style={styles.red_info}>
                    - {this.state.currency.symbol} 0.00
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            this.doTransfer();
          }}>
          <Text style={styles.nextText}>CONFIRM</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#fcc9b9',
  },
  header: {
    width: '100%',
    height: win.height * 0.15,
    paddingHorizontal: '5%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GLOBALS.BASE_COLOR,
  },
  logo: {
    width: win.height * 0.1,
    height: win.height * 0.1,
    marginRight: 10,
  },
  currencySymbol: {
    color: 'white',
    fontSize: 28,
    marginRight: 10,
  },
  amount: {
    color: 'white',
    fontSize: 50,
  },
  scroll: {
    width: '100%',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10,
    // backgroundColor: 'tomato',
  },
  title: {
    fontSize: 16,
    color: GLOBALS.BASE_COLOR,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  infoDialog: {
    marginTop: 10,
    width: '100%',
    height: win.height * 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  infoSection: {
    width: '100%',
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  infoSection1: {
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'center',
  },
  subject: {
    fontSize: 20,
    color: '#111',
  },
  info: {
    fontSize: 20,
    color: '#aaa',
  },
  red_info: {
    fontSize: 20,
    color: '#EA7773',
  },
  green_info: {
    fontSize: 20,
    color: '#6AB04A',
  },
  nextBtn: {
    backgroundColor: '#6AB04A',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
  },
});
