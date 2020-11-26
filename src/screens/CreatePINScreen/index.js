import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import GLOBALS from '../../constants/Globals';

const userBalance = {USD: '0', EUR: '0', GBP: '0', CAD: '0', AUD: '0'};

export default class CreatePINScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: ['', '', '', ''],
      complete: false,
      index: 0,
      title: this.props.route.params.title,
      userInfo: this.props.route.params.userInfo,
    };
  }
  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };
  onUpdateItems = (e) => {
    if (this.state.index < 4) {
      let newArray = [...this.state.item];
      newArray[this.state.index] = e;
      this.setState({item: newArray});
      this.setState({index: this.state.index + 1});
      if (this.state.index === 3) {
        this.setState({complete: true});
      }
    }
  };
  clear() {
    let newArray = [...this.state.item];
    for (let i = 0; i < 4; i++) {
      newArray[i] = '';
    }
    this.setState({item: newArray, index: 0});
    this.setState({complete: false});
  }
  backspace() {
    if (this.state.index !== 0) {
      let newArray = [...this.state.item];
      this.setState({index: this.state.index - 1});
      newArray[this.state.index - 1] = '';
      this.setState({item: newArray});
      this.setState({complete: false});
    }
  }
  goMain() {
    let pinCode = '';
    let url = GLOBALS.BASE_URL + 'user/register/newpincode';
    for (let index = 0; index < 4; index++) {
      pinCode += this.state.item[index];
    }
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountNumber: this.state.userInfo.accountNumber,
        password: this.state.userInfo.password,
        secretNumber: this.state.userInfo.secretNumber,
        pinCode: pinCode,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.storeData('userInfo', responseJson);
        this.storeData('userBalance', userBalance);
        this.props.navigation.navigate('Main', {userInfo: responseJson});
        this.clear();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <View style={styles.pin_area}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text style={styles.sub_title}>
              Secure your privacy with PIN code
            </Text>
            <View style={styles.pin_code}>
              <Text style={styles.pin_element}> {this.state.item[0]} </Text>
              <Text style={styles.pin_element}> {this.state.item[1]} </Text>
              <Text style={styles.pin_element}> {this.state.item[2]}</Text>
              <Text style={styles.pin_element}> {this.state.item[3]} </Text>
            </View>
            {this.state.complete === true && (
              <TouchableOpacity
                style={styles.createBtn}
                onPress={() => {
                  this.goMain();
                }}>
                <Text style={styles.creatBtnText}>Create Code</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.keyboard}>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('1');
                }}>
                <Text style={styles.keyText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('2');
                }}>
                <Text style={styles.keyText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('3');
                }}>
                <Text style={styles.keyText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('4');
                }}>
                <Text style={styles.keyText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('5');
                }}>
                <Text style={styles.keyText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('6');
                }}>
                <Text style={styles.keyText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('7');
                }}>
                <Text style={styles.keyText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('8');
                }}>
                <Text style={styles.keyText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('9');
                }}>
                <Text style={styles.keyText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.backspace();
                }}>
                <Image
                  source={require('../../../assets/images/back_btn.png')}
                  style={styles.back_img}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.onUpdateItems('0');
                }}>
                <Text style={styles.keyText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyEntry}
                onPress={() => {
                  this.props.navigation.navigate('SignupSuccess');
                }}>
                <Image
                  source={require('../../../assets/images/return.png')}
                  style={styles.back_img}
                />
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
  },
  container: {
    flex: 1,
  },
  pin_area: {
    flex: 3,
    // backgroundColor: 'tomato',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    color: '#FC427B',
    fontSize: 24,
    marginBottom: 10,
  },
  sub_title: {
    color: '#6c5ce7',
    fontSize: 18,
  },
  pin_code: {
    width: '90%',
    // backgroundColor: 'gold',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  pin_element: {
    width: '22%',
    height: '100%',
    // backgroundColor: 'pink',
    color: '#FC427B',
    borderBottomColor: '#6c5ce7',
    borderBottomWidth: 2,
    fontSize: 36,
    textAlign: 'center',
  },
  createBtn: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6c5ce7',
    borderRadius: 20,
    padding: 10,
    width: '60%',
  },
  creatBtnText: {
    textAlign: 'center',
    width: '100%',
    color: 'white',
  },

  keyboard: {
    flex: 5,
    // backgroundColor: 'aqua',
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    // backgroundColor: 'purple',
    marginBottom: 10,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keyEntry: {
    width: 60,
    height: 60,
    textAlign: 'center',
    backgroundColor: '#686de0',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: 24,
  },
  back_img: {
    width: 30,
    height: 30,
  },
});
