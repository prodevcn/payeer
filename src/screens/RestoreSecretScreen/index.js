import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  // KeyboardAvoidingView,
} from 'react-native';

export default class RestoreSecretScreen extends Component {
  componentDidMount() {
    console.log('here is my restore secret screen');
  }
  render() {
    return (
      <View behavior="padding" style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Restore secret word</Text>
          <Text style={styles.sub_title}>Give as much details as possible</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.form_item}>
            <Text style={styles.label}>Account number</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.form_item}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.form_item}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.form_item}>
            <Text style={styles.label}>Phone</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.nextBtn}
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate('Restore');
            }}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              this.props.navigation.navigate('RestorePwd');
            }}>
            <Text style={styles.btnText2}> BACK </Text>
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
    flex: 3,
    backgroundColor: '#6c5ce7',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
