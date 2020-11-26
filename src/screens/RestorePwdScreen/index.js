import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  // KeyboardAvoidingView,
} from 'react-native';

import GLOBALS from '../../constants/Globals';
import Toast from 'react-native-simple-toast';

export default class RestorePwdScreen extends Component {
  state = {
    id: '',
    pwd: '',
  };
  RestorePwd() {
    console.log(this.state.id);
    console.log(this.state.pwd);
    let url = GLOBALS.BASE_URL + 'user/login/restore_password';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: this.state.id,
        secretNumber: this.state.pwd,
      }),
    })
      .then((response) => {
        const statusCode = response.status;
        console.log(statusCode);
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.info === 'no_user') {
          Toast.show('Wrong UserID or Password', Toast.LONG, Toast.TOP);
        } else {
          this.setData;
          Toast.show('Restore password successfully !', Toast.LONG, Toast.TOP);
          this.props.navigation.navigate('PasswordSettings', {
            userInfo: responseJson,
          });
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
          <View style={styles.title_section}>
            <Text style={styles.title}>Restore password</Text>
            <Text style={styles.subTitle}>
              Enter email, account, number or mobile phone
            </Text>
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
            <TouchableOpacity
              style={styles.recall}
              onPress={() => {
                this.props.navigation.navigate('RestoreSecret');
              }}>
              {/* <Text style={styles.recallText}>RECALL ?</Text> */}
            </TouchableOpacity>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.login_form_item_pwd}
                placeholder="Secret word"
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
            <Text style={styles.forgotText}>
              If you did not add a secret word, leave the field blank
            </Text>
          </View>
          <TouchableOpacity
            style={
              this.state.id === '' || this.state.pwd === ''
                ? styles.disabled
                : styles.loginbtn
            }
            activeOpacity={0.8}
            onPress={() => {
              this.RestorePwd();
            }}
            disabled={
              this.state.id === '' || this.state.pwd === '' ? true : false
            }>
            <Text style={styles.btnText}>Go next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text style={styles.login_text}>LOGIN &gt;</Text>
          </TouchableOpacity>
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
    flexDirection: 'column',
    width: '100%',
  },
  head: {
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    justifyContent: 'flex-end',
    width: '100%',
    flex: 3,
  },
  logo: {
    width: 100,
    height: 100,
    // marginBottom: '10%',
  },
  title: {
    marginTop: 20,
    fontSize: 36,
    color: 'white',
    marginBottom: 10,
  },
  title_section: {
    alignItems: 'center',
    // backgroundColor: 'tomato',
    marginBottom: 30,
  },
  subTitle: {
    // fontSize: 28,
    color: 'white',
  },
  formSection: {
    justifyContent: 'space-between',
    flex: 7,
    backgroundColor: 'transparent',
    width: '85%',
    paddingBottom: 20,
    alignItems: 'center',
  },
  input_area: {
    marginTop: '10%',
    width: '100%',
  },
  subheading: {
    fontSize: 26,
    color: 'white',
  },
  forgotPassword: {
    marginTop: 20,
    backgroundColor: 'transparent',
    width: '80%',
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
    fontSize: 14,
    color: '#6c5ce7',
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
    marginBottom: 20,
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
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    margin: 0,
  },
  login_text: {
    color: '#FC427B',
    fontSize: 18,
    // fontWeight: 'bold',
  },
  recall: {
    // backgroundColor: 'orange',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  recallText: {
    color: '#FC427B',
  },
});
