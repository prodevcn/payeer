import React, {Component} from 'react';
import {
  // View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import GLOBALS from '../../constants/Globals';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class TransferResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transferInfo: this.props.route.params.transferInfo,
      userInfo: this.props.route.params.userInfo,
      receiverAN: this.props.route.params.receiverAN,
      currency: this.props.route.params.currency,
      amount: this.props.route.params.amount,
      total: this.props.route.params.total,
      balance: this.props.route.params.balance,
    };
  }
  componentDidMount() {}
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <Icon name="check-circle" size={100} color={'white'} />
        <Text style={styles.currency}>
          {this.state.currency.symbol} {this.state.amount}
        </Text>
        <Text style={styles.transferID}>
          Transfer #{this.state.transferInfo.transferID}
        </Text>
        <Text style={styles.transferID}>completed</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Transfer');
          }}>
          <Text style={styles.btnText}>CLOSE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GLOBALS.BASE_COLOR,
  },
  currency: {
    color: 'white',
    fontSize: 40,
  },
  transferID: {
    color: 'white',
    fontSize: 24,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: GLOBALS.SUB_COLOR,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
  },
});
