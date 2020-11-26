import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

import GLOBALS from '../../constants/Globals';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';

export default class AccountInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: this.props.route.params.accountNumber,
      userInfo: this.props.route.params.userInfo,
    };
  }
  copyToClipboard() {
    Clipboard.setString(this.state.accountNumber.toString());
  }
  logout() {
    (async () => {
      AsyncStorage.clear();
      this.props.navigation.navigate('Onboarding');
    })();
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.header}>
          <View style={styles.accountInfoArea}>
            <Image style={styles.avatar} source={GLOBALS.DEFAULT_AVATAR} />
            <View style={styles.title}>
              <Text style={styles.mainTitle}>Account No.</Text>
              <Text style={styles.accountNumber}>
                {this.state.accountNumber}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Toast.show(
                'Account number copied to clipboard !',
                Toast.LONG,
                Toast.TOP,
              );
              this.copyToClipboard();
            }}>
            <Text style={styles.copyBtn}>COPY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Account</Text>
          <View style={styles.settingOption}>
            <View style={styles.realArea}>
              <TouchableOpacity
                style={styles.item}
                onPress={() =>
                  this.props.navigation.navigate('Verification', {
                    userInfo: this.state.userInfo,
                  })
                }>
                <Text style={styles.itemTitle}>Verification</Text>
                <Text style={styles.itemStatus}>Inactive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Text style={styles.itemTitle}>Account Type</Text>
                <Text style={styles.itemStatus}>Registered</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Text style={styles.itemTitle}>Registration</Text>
                <Text style={styles.itemStatus}>
                  {this.state.userInfo.date}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  this.props.navigation.navigate('Security');
                }}>
                <Text style={styles.itemTitle}>IP security</Text>
                <Text style={styles.itemStatus}>Inactive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  this.props.navigation.navigate('Security');
                }}>
                <Text style={styles.itemTitle}>SMS security</Text>
                <Text style={styles.itemStatus}>Inactive</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  this.logout();
                }}>
                <Text style={styles.itemTitle}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
    // backgroundColor: 'tomato',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    color: GLOBALS.SUB_COLOR,
    fontSize: 20,
    marginVertical: 10,
  },
  settingOption: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
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
  header: {
    width: '100%',
    paddingHorizontal: '5%',
    height: 52,
    alignItems: 'center',
    backgroundColor: GLOBALS.BASE_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountInfoArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  mainTitle: {
    color: 'white',
  },
  realArea: {
    // marginTop: '5%',
    // backgroundColor: 'tomato',
    width: '96%',
    height: '96%',
    alignItems: 'center',
  },
  accountNumber: {
    color: 'white',
  },
  copyBtn: {color: 'white'},
  text: {
    fontSize: 24,
    color: GLOBALS.SUB_COLOR,
  },
  item: {
    width: '90%',
    height: '17%',
    // backgroundColor: 'tomato',
    // alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemTitle: {
    fontSize: 18,
    color: GLOBALS.BASE_COLOR,
  },
  itemStatus: {
    color: '#aaa',
  },
});
