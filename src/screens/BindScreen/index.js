import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import GLOBALS from '../../constants/Globals';
export default class BindScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.route.params.title,
      text: this.props.route.params.text,
      inputValue: '',
    };
    // if (this.props.route.params.title === 'Email') {
    //   this.setState({text: 'Address'});
    // } else if (this.props.route.params.title === 'Phone') {
    //   this.setState({text: 'Number'});
    // } else if (this.props.route.prams.title === 'Telegram') {
    //   this.setState({text: 'username'});
    // }
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.title}>{this.state.title}</Text>
          <View style={styles.inputArea}>
            <Text style={styles.tip}>
              {this.state.title} {this.state.text}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Please set your entry"
              onChangeText={(input) => this.setState({inputValue: input})}
              value={this.state.inputValue}
              // onSubmitEditing={() => this.passwordInput.focus()}
            />
          </View>
          <TouchableOpacity style={styles.submit}>
            <Text style={styles.btn_text}>Confirm</Text>
          </TouchableOpacity>
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
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: GLOBALS.BASE_COLOR,
    marginBottom: 50,
  },
  inputArea: {
    // backgroundColor: 'tomato',
    width: '100%',
    borderBottomColor: GLOBALS.BASE_COLOR,
    borderBottomWidth: 2,
  },
  tip: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    fontSize: 20,
  },
  submit: {
    width: '60%',
    backgroundColor: 'green',
    marginTop: 50,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 100,
  },
  btn_text: {
    color: 'white',
    fontSize: 20,
  },
});
