import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  // KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import TopBar from '../../components/TopBar';
import GLOBALS from '../../constants/Globals';
import Toast from 'react-native-simple-toast';

const win = Dimensions.get('window');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      pwd: '',
      accountNumber: '',
      userInfo: {},
    };
  }
  setData = () => {
    AsyncStorage.setItem('accountNumber', this.state.id);
  };
  doLogin() {
    console.log(this.state.id);
    console.log(this.state.pwd);
    let url = GLOBALS.BASE_URL + 'user/login';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: this.state.id,
        password: this.state.pwd,
      }),
    })
      .then((response) => {
        const statusCode = response.status;
        console.log(statusCode);
        return response.json();
      })
      .then((responseJson) => {
        // console.log(responseJson);
        if (responseJson.info === 'no_user') {
          Toast.show('Wrong UserID or Password', Toast.LONG, Toast.TOP);
        } else {
          (async () => {
            try {
              await AsyncStorage.setItem(
                'userInfo',
                JSON.stringify(responseJson),
              );
              Toast.show('login success !', Toast.LONG, Toast.TOP);
              this.props.navigation.navigate('Main', {
                userInfo: responseJson,
              });
            } catch (e) {
              console.log(e);
            }
          })();
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // this.props.navigation.navigate('Main');
  }
  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <View style={styles.head}>
          <TopBar navigation={this.props.navigation} />
          <View style={styles.title_section}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
            />
          </View>
        </View>
        <View style={styles.formSection}>
          <View style={styles.input_area}>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.login_form_item_id}
                placeholder="Account number, email or phone"
                onChangeText={(input) => this.setState({id: input})}
                value={this.state.id}
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
              />
              <Image
                source={require('../../../assets/images/login_avatar.png')}
                style={styles.ImageStyle}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.login_form_item_pwd}
                placeholder="Password"
                onChangeText={(input) => this.setState({pwd: input})}
                secureTextEntry={true}
                value={this.state.pwd}
                returnKeyType="go"
                ref={(input) => (this.passwordInput = input)}
              />
              <Image
                source={require('../../../assets/images/login_lock.png')}
                style={styles.ImageStyle}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotPassword}
              activeOpacity={0.5}
              onPress={() => {
                this.props.navigation.navigate('RestorePwd');
              }}>
              <Text style={styles.forgotText}>Forgot password ?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btn_area}>
            <TouchableOpacity
              style={
                this.state.id === '' || this.state.pwd === ''
                  ? styles.disabled
                  : styles.loginbtn
              }
              activeOpacity={0.8}
              disabled={
                this.state.id === '' || this.state.pwd === '' ? true : false
              }
              onPress={() => {
                this.doLogin();
              }}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.goSign}
              onPress={() => {
                this.props.navigation.navigate('Signup');
              }}>
              <Text style={styles.goSign_text}>Sign Up ></Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
  head: {
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    width: '100%',
    // flex: 1,
  },
  logo: {
    width: win.width * 0.4,
    height: win.width * 0.4,
    marginBottom: '10%',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    color: 'white',
  },
  title_section: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  subtitle: {
    fontSize: 28,
    color: '#555',
  },
  formSection: {
    // justifyContent: 'space-between',
    flex: 2,
    backgroundColor: 'transparent',
    width: '85%',
    paddingBottom: 20,
    alignItems: 'center',
  },
  input_area: {
    marginTop: '10%',
    width: '100%',
    // backgroundColor: 'tomato',
    flex: 2,
  },
  btn_area: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subheading: {
    fontSize: 26,
    color: 'white',
  },
  forgotPassword: {
    marginTop: 30,
    alignSelf: 'flex-start',
    // backgroundColor: 'tomato',
    // width: '80%',
  },
  loginbtn: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(108, 92, 231, 1)',
    width: '80%',
    padding: 10,
    bottom: 0,
    borderRadius: 50,
  },
  disabled: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.5)',
    width: '80%',
    padding: 10,
    bottom: 0,
    borderRadius: 50,
  },
  forgotText: {
    fontSize: 16,
    color: '#FC427B',
    // backgroundColor: 'yellow',
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
  login_form_item_id: {
    borderBottomColor: '#999999',
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingBottom: 0,
  },
  login_form_item_pwd: {
    borderBottomColor: '#aaaaaa',
    backgroundColor: 'transparent',
    fontSize: 16,
    paddingBottom: 0,
  },
  SectionStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    borderColor: '#aaaaaa',
    marginTop: 30,
    padding: 0,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  goSign: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 0,
  },
  goSign_text: {
    color: '#FC427B',
    fontSize: 18,
    // fontWeight: 'bold',
  },
});
