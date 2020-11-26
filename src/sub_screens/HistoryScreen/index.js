import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import Header from '../../components/header';
import GLOBALS from '../../constants/Globals';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      title: 'History',
      isHistory: false,
      userInfo: {},
    };
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo');
      this.setState({userInfo: JSON.parse(value)});
      let url = GLOBALS.BASE_URL + GLOBALS.GET_TRANSFER_HISTORY;
      console.log(value);
      console.log(url);
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountNumber: JSON.parse(value).accountNumber,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (!responseJson[0]) {
            this.setState({isHistory: false});
          } else {
            this.setState({isHistory: true});
            this.setState({transactions: responseJson});
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };
  refresh() {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo');
        this.setState({userInfo: JSON.parse(value)});
        let url = GLOBALS.BASE_URL + GLOBALS.GET_TRANSFER_HISTORY;
        console.log(value);
        console.log(url);
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accountNumber: JSON.parse(value).accountNumber,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (!responseJson[0]) {
              this.setState({isHistory: false});
            } else {
              this.setState({isHistory: true});
              this.setState({transactions: responseJson});
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (e) {
        console.log(e);
      }
    })();
  }
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <View style={styles.main}>
        <Header title={this.state.title} navigation={this.props.navigation} />
        <View style={styles.container}>
          {this.state.isHistory === false && (
            <View style={styles.content_area}>
              <Image
                style={styles.bg}
                source={require('../../../assets/images/empty_transaction.png')}
              />
              <Text style={styles.title}>
                There is no transaction history...
              </Text>
            </View>
          )}
          {this.state.isHistory === true && (
            <FlatList
              style={styles.list}
              data={this.state.transactions}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.entry}>
                  <View style={styles.header}>
                    <Image
                      source={require('../../../assets/images/icon-round.png')}
                      style={styles.logo}
                    />
                    <View style={styles.entryInfo}>
                      <Text style={styles.entryAmount}>
                        {' '}
                        + {item.currency} {'*'} {item.amount}
                      </Text>
                      <Text style={styles.entryDate1}>
                        {item.senderAccountNumber} -->{' '}
                        {item.receiverAccountNumber}
                      </Text>
                      <Text style={styles.entryDate}>
                        {item.date.substring(0, 10)} {'*'} ID {item.transferID}
                      </Text>
                    </View>
                  </View>
                  <Icon name="check-circle" size={40} color={'green'} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={() => {
            this.refresh();
          }}>
          <View style={styles.btn_area}>
            <Icon name="refresh" size={16} color="white" />
            <Text style={styles.refresh}>REFRESH</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    // backgroundColor: 'tomato',
    paddingTop: 20,
  },
  text: {
    fontSize: 24,
    color: '#FC427B',
  },
  content_area: {
    // backgroundColor: 'red',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // height: 200,
  },
  bg: {
    width: 150,
    height: 150,
    marginTop: '50%',
  },
  title: {
    color: '#6c5ce7',
    fontSize: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  entry: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginBottom: 2,
  },
  list: {
    width: '100%',
  },
  entryAmount: {
    color: 'green',
  },
  entryInfo: {
    paddingLeft: 10,
  },
  entryDate: {
    color: '#717171',
  },
  entryDate1: {
    color: GLOBALS.SUB_COLOR,
  },
  refreshBtn: {
    position: 'absolute',
    width: '100%',
    paddingVertical: 15,
    bottom: 0,
    backgroundColor: GLOBALS.BASE_COLOR,
    alignItems: 'center',
  },
  btn_area: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refresh: {
    marginLeft: 10,
    color: 'white',
    fontSize: 16,
  },
});
