import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  //   Image,
  ScrollView,
  //   Dimensions,
} from 'react-native';
import GLOBALS from '../../constants/Globals';
export default class SecurityInfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountNumber: 'P1021847486',
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.group}>
            <Text style={styles.category}>Contact information</Text>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  this.props.navigation.navigate('Bind', {
                    title: 'Email',
                    text: 'address',
                  });
                }}>
                <Text style={styles.optionTitle}>Email</Text>
                <Text style={styles.optionStatus}>No set</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  this.props.navigation.navigate('Bind', {
                    title: 'Phone',
                    text: 'number',
                  });
                }}>
                <Text style={styles.optionTitle}>Mobile phone</Text>
                <Text style={styles.optionStatus}>No set</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.category}>Apps</Text>
            <View style={styles.options}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  this.props.navigation.navigate('Bind', {
                    title: 'Telegram',
                    text: 'username',
                  });
                }}>
                <Text style={styles.optionTitle}>Telegram</Text>
                <Text style={styles.optionStatus}>Not set</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.category}>Authorization</Text>
            <View style={styles.options}>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionTitle}>Send verification code</Text>
                <Text style={styles.optionStatus}>Never send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionTitle}>Confirmation method</Text>
                <Text style={styles.optionStatus}>No set</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.category}>Internal transfers</Text>
            <View style={styles.options}>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionTitle}>
                  Incoming payment notification
                </Text>
                <Text style={styles.optionStatus}>No set</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionTitle}>
                  Minimum amount for notification
                </Text>
                <Text style={styles.optionStatus}>No set</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.category}>Restore password</Text>
            <View style={styles.options}>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionTitle}>Code sending method</Text>
                <Text style={styles.optionStatus}>No set</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.optionTitle}>Password recovery</Text>
                <Text style={styles.optionStatus} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
// const win = Dimensions.get('window');
const styles = StyleSheet.create({
  main: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    // backgroundColor: 'tomato',
  },
  content: {
    flex: 1,
    // backgroundColor: 'purple',
    marginHorizontal: 20,
    paddingTop: 10,
  },
  group: {
    width: '100%',
    // marginVertical: 10,
    // backgroundColor: 'red',
    paddingVertical: 10,
  },
  category: {
    fontSize: 16,
    color: GLOBALS.BASE_COLOR,
    marginBottom: 10,
  },
  options: {
    // backgroundColor: 'yellow',
    width: '100%',
    borderRadius: 5,
    borderColor: '#6c5ce7',
    shadowColor: '#6c5ce7',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 10,
  },
  option: {
    // backgroundColor: 'aqua',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 5,
  },
  optionTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  optionStatus: {
    fontSize: 14,
    color: '#aaa',
  },
  saveBtn: {
    width: '100%',
    backgroundColor: GLOBALS.SUB_COLOR,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
