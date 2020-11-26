import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import AsyncStorage from '@react-native-community/async-storage';
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      color: '',
      newMsg: false,
      accountNumber: '',
      userInfo: {},
    };
    this.getData();
    this.state.title = this.props.title;
    if (this.state.newMsg === false) {
      this.state.color = 'white';
    } else {
      this.state.color = '#FC427B';
    }
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      this.setState({userInfo: JSON.parse(value)});
    } catch (e) {
      console.log(e);
    }
  };
  goSettings() {
    this.props.navigation.navigate('Settings', {
      userInfo: this.state.userInfo,
    });
  }
  goMessageBox() {
    this.props.navigation.navigate('Messages', {
      userInfo: this.state.userInfo,
    });
  }
  render() {
    return (
      <>
        <View style={styles.container}>
          {this.state.title === 'Balance' ? (
            <TouchableOpacity
              style={styles.accountInfoSection}
              onPress={() => {
                this.props.navigation.navigate('AccountInfo', {
                  accountNumber: this.state.userInfo.accountNumber,
                  userInfo: this.state.userInfo,
                });
              }}>
              <Image
                source={require('../../assets/images/user.png')}
                style={styles.avatar}
              />
              <View style={styles.info_area}>
                <Text style={styles.tip}>Account No.</Text>
                <Text style={styles.number}>
                  {this.state.userInfo.accountNumber}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.title_section}>
              <Text style={styles.text}>{this.state.title}</Text>
            </View>
          )}
          <View style={styles.gadget_group}>
            {this.state.title === 'Balance' && (
              <TouchableOpacity
                style={styles.gadget}
                onPress={() => {
                  this.goMessageBox();
                }}>
                <Icon
                  name="facebook-messenger"
                  size={30}
                  color={this.state.color}
                />
              </TouchableOpacity>
            )}
            {this.state.title === 'Balance' && (
              <TouchableOpacity
                style={styles.gadget}
                onPress={() => {
                  this.props.navigation.navigate('Support');
                }}>
                <Image
                  source={require('../../assets/images/headset.png')}
                  style={styles.head}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.gadget}
              onPress={() => {
                this.goSettings();
              }}>
              <Image
                source={require('../../assets/images/settings.png')}
                style={styles.settings}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '15%',
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
  },
  title_section: {
    // backgroundColor: 'white',
    flex: 1,
    paddingLeft: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    // backgroundColor: 'tomato',
  },
  gadget_group: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // backgroundColor: 'tomato',
    flex: 1,
    alignItems: 'center',
  },
  gadget: {
    width: '20%',
    marginLeft: '2%',
    marginRight: '3%',
    // backgroundColor: 'aqua',
    alignItems: 'center',
  },
  head: {
    width: 28,
    height: 28,
  },
  settings: {
    width: 36,
    height: 36,
  },
  sub_header: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: '#6c5ce7',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  element: {
    // backgroundColor: 'tomato',
  },
  price: {
    color: 'white',
    fontSize: 24,
  },
  description: {
    color: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  accountInfoSection: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tip: {
    color: '#999',
    fontSize: 16,
  },
  number: {
    color: 'white',
    fontSize: 18,
  },
});
