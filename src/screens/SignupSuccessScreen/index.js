import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  // Clipboard,
} from 'react-native';

import Toast from 'react-native-simple-toast';
import Clipboard from '@react-native-community/clipboard';
import GLOBALS from '../../constants/Globals';

const win = Dimensions.get('window');

export default class SignupSuccessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: '',
      password: '',
      secretNumber: '',
      userInfo: {},
    };
  }
  componentDidMount() {
    const url = GLOBALS.BASE_URL + 'user/register';
    fetch(url, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          accountNumber: responseJson.accountNumber,
          password: responseJson.password,
          secretNumber: responseJson.secretNumber,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  saveUserInfo() {
    const url = GLOBALS.BASE_URL + 'user/register/new';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountNumber: this.state.accountNumber,
        password: this.state.password,
        secretNumber: this.state.secretNumber,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.tip) {
          Toast.show(
            'this account number already exists',
            Toast.LONG,
            Toast.TOP,
          );
          this.props.navigation.navigate('Onboarding');
        } else {
          this.props.navigation.navigate('CreatePIN', {
            title: 'Create PIN code',
            userInfo: responseJson,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  copyToClipboard() {
    Clipboard.setString(this.state.accountNumber);
  }

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.logoSection}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.infoSection}>
            <Text style={styles.info}>Password Settings</Text>
            <Text style={styles.description}>
              After you set your password, keep it in an safe place
            </Text>
            <View style={styles.detail}>
              <Text style={styles.label}>Accounter number</Text>
              <Text style={styles.value}>{this.state.accountNumber}</Text>
              <Text style={styles.label}>Password</Text>
              <Text style={styles.value}>{this.state.password}</Text>
              <Text style={styles.label}>Secret word</Text>
              <Text style={styles.value}>{this.state.secretNumber}</Text>
            </View>
            <Text style={styles.description}>
              Be aware that you must remember this secret word, it's required to
              restore access to your account
            </Text>
            <TouchableOpacity
              style={styles.changePwd}
              activeOpacity={0.5}
              onPress={() => {
                Toast.show(
                  'Authentication data copied to clipboard. Please keep this data in safe place!',
                  Toast.LONG,
                  Toast.TOP,
                );
                this.copyToClipboard();
              }}>
              <Text style={styles.btnText3}>COPY TO CLIPBOARD &gt;</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnSection}>
            <TouchableOpacity
              style={styles.confirmBtn}
              activeOpacity={0.7}
              onPress={() => {
                this.saveUserInfo();
              }}>
              <Text style={styles.btnText1}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.changePwd}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.navigate('ChangePwd', {
                  password: this.state.password,
                  secretNumber: this.state.secretNumber.toString(),
                  accountNumber: this.state.accountNumber,
                });
              }}>
              <Text style={styles.btnText2}>CHANGE PASSWORD &gt;</Text>
            </TouchableOpacity>
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
    flex: 4,
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'center',
    paddingTop: 10,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  logoSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
  },
  logo: {
    height: win.width * 0.3,
    width: win.width * 0.3,
  },
  infoSection: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // backgroundColor: 'yellow',
  },
  info: {
    fontSize: 24,
    color: '#6c5ce7',
  },
  description: {
    color: '#6c5ce7',
    fontSize: 14,
  },
  detail: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10,
  },
  label: {
    color: '#6c5ce7',
    fontSize: 16,
  },
  value: {
    color: '#FC427B',
    fontSize: 20,
  },
  btnSection: {
    flex: 3,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  confirmBtn: {
    backgroundColor: '#6c5ce7',
    borderRadius: 50,
    padding: 8,
    marginBottom: 30,
    alignItems: 'center',
    width: '60%',
  },
  btnText1: {
    fontSize: 20,
    color: 'white',
  },
  btnText2: {
    fontSize: 16,
    color: '#FC427B',
  },
  btnText3: {
    marginTop: 10,
    fontSize: 16,
    color: '#6c5ce7',
  },
});
