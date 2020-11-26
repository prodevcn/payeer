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
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: this.props.route.params.currency,
      userInfo: this.props.route.params.userInfo,
      balanceInfo: this.props.route.params.balanceInfo,
      system: this.props.route.params.system,
      amount: '',
      total: '',
      balance: this.props.route.params.balanceInfo[
        this.props.route.params.currency.name
      ],
      fee: 5.96,
    };
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
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={styles.headerArea}>
            <View style={styles.topLogo}>
              <Image source={this.state.system.iconUri} style={styles.logo} />
              <Text style={styles.coinTitle}>{this.state.system.name}</Text>
            </View>
            <Icon name="long-arrow-right" size={24} color={'white'} />
            <View style={styles.topLogo}>
              <Image source={this.state.currency.iconUri} style={styles.logo} />
              <Text style={styles.coinTitle}>{this.state.currency.name}</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.title}>Amount</Text>
            <View style={styles.item}>
              <TextInput
                style={styles.input}
                onChangeText={(input) => this.setAmount(input)}
                value={String(this.state.amount)}
                // keyboardType="email"
              />
              <Image
                source={require('../../../assets/images/payment_systems/rt.png')}
                style={styles.logo}
              />
            </View>
          </View>
          <View style={styles.balance}>
            <Text style={styles.title}>
              Balance : {this.state.balance} {this.state.currency.symbol}
            </Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.title}>Total</Text>
            <View style={styles.item}>
              <TextInput
                style={styles.input}
                onChangeText={(input) => this.setTotal(input)}
                value={String(this.state.total)}
                // keyboardType="email"
              />
              <Image source={this.state.system.iconUri} style={styles.logo} />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={
            this.state.amount !== '' && this.state.total !== ''
              ? styles.nextBtn
              : styles.nextBtn_disabled
          }
          disabled={
            this.state.amount !== '' && this.state.total !== '' ? false : true
          }
          onPress={() => {
            this.props.navigation.navigate('AddConfirm', {
              currency: this.state.currency,
              amount: this.state.amount,
              total: this.state.total,
              balance: this.state.balance,
              userInfo: this.state.userInfo,
              balanceInfo: this.state.balanceInfo,
              system: this.state.system,
            });
          }}>
          <Text style={styles.nextText}>NEXT</Text>
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
    width: '80%',
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  topLogo: {
    // backgroundColor: 'tomato',
    alignItems: 'center',
  },
  formItem: {
    // b
    width: '100%',
    marginVertical: 20,
  },
  balance: {
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  coinTitle: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    // backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 24,
    width: '85%',
  },
  logo: {
    width: 40,
    height: 40,
  },
  nextBtn: {
    backgroundColor: GLOBALS.SUB_COLOR,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  nextBtn_disabled: {
    backgroundColor: GLOBALS.SUB_COLOR,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    opacity: 0.5,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
  },
});
