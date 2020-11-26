import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.route.params.userInfo,
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item_list}>
          <View style={styles.row}>
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('AccountInfo', {
                    accountNumber: this.state.userInfo.accountNumber,
                    userInfo: this.state.userInfo,
                  });
                }}>
                <Icon name="user" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.text}>My account</Text>
            </View>
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('Security');
                }}>
                <Icon name="shield" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.text}>Security</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('ResetPwd');
                }}>
                <Icon name="lock" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.text}>Change password</Text>
            </View>
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('ChangePIN', {
                    userInfo: this.state.userInfo,
                  });
                }}>
                <Icon name="code" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.text}>Change PIN code</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('BalanceCurrency');
                }}>
                <Icon name="money" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.text}>Balance currency</Text>
            </View>
            <View style={styles.item}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.props.navigation.navigate('Templates');
                }}>
                <Icon name="shirtsinbulk" size={50} color="white" />
              </TouchableOpacity>
              <Text style={styles.text}>Templates</Text>
            </View>
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
    justifyContent: 'center',
    backgroundColor: '#6c5ce7',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
  },
  item_list: {
    width: '80%',
    height: '80%',
    // backgroundColor: 'tomato',
  },
  row: {
    width: '100%',
    flex: 1,
    // backgroundColor: 'purple',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    // textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: '100%',
    backgroundColor: '#6c5ce7',
    // borderWidth: 2,
    borderRadius: 20,
    borderColor: '#6c5ce7',
  },
  item1: {
    // textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#6c5ce7',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#6c5ce7',
  },
});
