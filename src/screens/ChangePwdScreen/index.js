import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  // KeyboardAvoidingView,
} from 'react-native';
import GLOBALS from '../../constants/Globals';
export default class ChangePwdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        password: this.props.route.params.password,
        secretNumber: this.props.route.params.secretNumber,
      },
    };
  }
  componentDidMount() {
    // this.setState({
    //   password: this.props.route.params.password,
    //   secretNumber: this.props.route.params.secretNumber,
    // });
    // this.state.secretNumber = this.props.route.params.secretNumber;
    // console.log(this.props.route.params.password);
  }
  saveUserInfo() {
    let url = GLOBALS.BASE_URL + 'user/register/new';
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
        console.log(responseJson);
        console.log(this.state.accountNumber);
        this.props.navigation.navigate('CreatePIN', {
          title: 'Create PIN code',
          accountNumber: this.state.accountNumber,
          password: this.state.password,
          secretNumber: this.state.secretNumber,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Password settings</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.form_item}>
            <Text style={styles.label}>Password </Text>
            <TextInput
              style={styles.input}
              placeholder="Please set your password"
              onChangeText={(input) =>
                this.setState((prevState) => ({
                  userInfo: {...prevState.userInfo, password: input},
                }))
              }
              value={this.state.userInfo.password}
              returnKeyType="next"
              // onSubmitEditing={() => this.passwordInput.focus()}
            />
          </View>
          <View style={styles.form_item}>
            <Text style={styles.label}>Re-enter password</Text>
            <TextInput
              style={styles.input}
              placeholder="Retype password"
              onChangeText={(input) =>
                this.setState((prevState) => ({
                  userInfo: {...prevState.userInfo, password: input},
                }))
              }
              // secureTextEntry={true}
              value={this.state.userInfo.password}
              returnKeyType="next"
              // ref={(input) => (this.passwordInput = input)}
              // onSubmitEditing={() => this.passwordInput.focus()}
            />
          </View>
          <View style={styles.form_item}>
            <Text style={styles.label}>Secret word </Text>
            <TextInput
              style={styles.input}
              placeholder="Secret Number"
              onChangeText={(input) =>
                this.setState((prevState) => ({
                  userInfo: {...prevState.userInfo, secretNumber: input},
                }))
              }
              // secureTextEntry={true}
              value={this.state.userInfo.secretNumber}
              returnKeyType="next"
            />
          </View>

          <Text style={styles.red_label}>
            Be aware that you must remember this secret word, it's required to
            restore access to your account
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate('CreatePIN', {
                title: 'Create PIN code',
                userInfo: this.state.userInfo,
              });
            }}>
            <Text style={styles.btnText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate('SignupSuccess');
            }}>
            <Text style={styles.btnText2}> REVERT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'tomato',
    alignItems: 'center',
    flexDirection: 'column',
    // width: '100%',
  },
  header: {
    flex: 2,
    backgroundColor: '#6c5ce7',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 12,
  },
  sub_title: {
    color: 'white',
    fontSize: 18,
    marginBottom: 30,
  },
  form: {
    flex: 5,
    // backgroundColor: 'blue',
    paddingTop: 10,
    width: '80%',
  },
  input: {
    paddingBottom: 0,
  },
  form_item: {
    // backgroundColor: 'tomato',
    width: '100%',
    borderColor: '#6c5ce7',
    borderBottomWidth: 1,
    padding: 0,
    marginBottom: 10,
  },
  footer: {
    flex: 2,
    // backgroundColor: 'yellow',
    width: '80%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  label: {
    color: '#6c5ce7',
  },
  red_label: {
    color: '#FC427B',
  },
  nextBtn: {
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(108, 92, 231, 0.8)',
    width: '80%',
    padding: 10,
    bottom: 0,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 16,
    color: 'white',
  },
  btnText2: {
    color: '#FC427B',
    marginBottom: 10,
    fontSize: 16,
  },
});
