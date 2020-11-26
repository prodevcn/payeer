import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
// import WebView from 'react-native-webview';
import WebView from 'react-native-webview';
import GLOBALS from '../../constants/Globals';
import AsyncStorage from '@react-native-community/async-storage';
// let value = 0;
const win = Dimensions.get('window');

export default class AddConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: this.props.route.params.currency,
      amount: this.props.route.params.amount,
      total: this.props.route.params.total,
      balance: this.props.route.params.balance,
      system: this.props.route.params.system,
      userInfo: this.props.route.params.userInfo,
      balanceInfo: this.props.route.params.balanceInfo,
      showModal: false,
      status: 'Pending',
    };
  }
  complete() {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo');
        this.setState({userInfo: JSON.parse(value)});
        let userInfo = JSON.parse(value);
        console.log(userInfo);
        let url = GLOBALS.BASE_URL + GLOBALS.CHARGE_WALLET;
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountNumber: userInfo.accountNumber,
            currency: this.state.currency.name,
            amount: this.state.amount,
            total: this.state.total,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log('--------------------');
            console.log(userInfo.accountNumber);
            this.props.navigation.navigate('Balance');
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        // error reading value
        console.log(e);
      }
    })();
  }
  handleResponse = (data) => {
    console.log(data);
    if (data.title === 'success') {
      this.setState({showModal: false, status: 'Complete'});
      this.complete();
    } else if (data.title === 'cancel') {
      this.setState({showModal: false, status: 'Cancelled'});
    } else {
      return;
    }
  };
  render() {
    let injectjs =
      'document.getElementById("price").value=' +
      this.state.total +
      ';' +
      'document.getElementById("currency").value="' +
      String(this.state.currency.name) +
      '";';
    // console.log(injectjs);
    return (
      <SafeAreaView style={styles.main}>
        <Modal
          visible={this.state.showModal}
          onRequestClose={() => this.setState({showModal: false})}>
          <WebView
            source={{uri: GLOBALS.PAYPAL_URL}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            automaticallyAdjustContentInsets={true}
            startInLoadingState={true}
            onNavigationStateChange={(data) => this.handleResponse(data)}
            injectedJavaScript={injectjs}
          />
        </Modal>
        <View style={styles.header}>
          <Image source={this.state.currency.iconUri} style={styles.logo} />
          <Text style={styles.currencySymbol}>
            {this.state.currency.symbol}
          </Text>
          <Text style={styles.amount}>{this.state.amount}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Payment information</Text>
          <View style={styles.infoDialog}>
            <View style={styles.infoSection}>
              <Text style={styles.subject}>Operation type</Text>
              <Text style={styles.info}>Deposit</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.subject}>Payment system</Text>
              <Text style={styles.info}>{this.state.system.name}</Text>
            </View>
            <View style={styles.infoSection}>
              <Text style={styles.subject}>Cancellation amount</Text>
              <Text style={styles.red_info}>
                {' '}
                - {this.state.currency.symbol} {this.state.total}
              </Text>
            </View>
            <View style={styles.infoSection1}>
              <Text style={styles.subject}>Admissions amount</Text>
              <Text style={styles.green_info}>
                + {this.state.currency.symbol} {this.state.amount}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => {
            this.setState({showModal: true});
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
  container: {
    width: '90%',
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
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
  infoSection: {
    width: '100%',
    height: '25%',
    // backgroundColor: 'purple',
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  infoSection1: {
    width: '100%',
    height: '25%',
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
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
  },
});
