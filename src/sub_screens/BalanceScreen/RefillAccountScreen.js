import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GLOBALS from '../../constants/Globals';
import AsyncStorage from '@react-native-community/async-storage';

// import {Transactions} from '../../constants/TransactionHistory';
export default class RefillAccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: this.props.route.params.currency,
      amount: '',
      userInfo: {},
      balanceInfo: {},
      isEmpty: true,
      isHistory: false,
    };
  }
  componentDidMount() {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo');
        const balance_value = await AsyncStorage.getItem('balanceInfo');
        const balanceInfo = JSON.parse(balance_value);
        this.setState({balanceInfo: balanceInfo});
        if (balanceInfo[this.state.currency.name] === '0') {
          this.setState({isEmpty: true});
        } else {
          this.setState({isEmpty: false});
        }
        this.setState({userInfo: JSON.parse(value)});
        let url = GLOBALS.BASE_URL + GLOBALS.GET_TRANSFER_HISTORY;
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
  doAdd() {
    (async () => {
      try {
        const balance_value = await AsyncStorage.getItem('balanceInfo');
        const user_value = await AsyncStorage.getItem('userInfo');
        const balanceInfo = JSON.parse(balance_value);
        const userInfo = JSON.parse(user_value);
        this.setState({balanceInfo: balanceInfo});
        this.setState({userInfo: userInfo});
        this.props.navigation.navigate('AddMoney', {
          currency: this.state.currency,
          balanceInfo: balanceInfo,
          userInfo: userInfo,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }
  refresh() {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo');
        this.setState({userInfo: JSON.parse(value)});
        let url = GLOBALS.BASE_URL + GLOBALS.GET_TRANSFER_HISTORY;
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
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.titleArea}>
          <Text style={styles.currencyName}>{this.state.currency.name}</Text>
          <Text style={styles.brand}>Royal Transfert balance</Text>
          <View style={styles.amountArea}>
            <Text style={styles.currencyUnit}>
              {this.state.currency.symbol} {':'}
            </Text>
            <Text style={styles.amount}>
              {this.state.balanceInfo[this.state.currency.name]}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.toolbar}>
            <TouchableOpacity
              style={styles.tool}
              onPress={() => {
                this.doAdd();
              }}>
              <Icon name="plus" color={'white'} size={20} />
              <Text style={styles.title}>Add{'\n'}Money</Text>
            </TouchableOpacity>
            {this.state.isEmpty === false && (
              <>
                <TouchableOpacity
                  style={styles.tool}
                  onPress={() => {
                    this.props.navigation.navigate('TransferStack');
                  }}>
                  <Icon name="recycle" color={'white'} size={20} />
                  <Text style={styles.title}>Transfer{'\n'}Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tool}
                  onPress={() => {
                    this.props.navigation.navigate('Exchange');
                  }}>
                  <Icon name="exchange" color={'white'} size={20} />
                  <Text style={styles.title}>Exchange{'\n'}Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.tool1}
                  onPress={() => {
                    this.props.navigation.navigate('History');
                  }}>
                  <Icon name="history" color={'white'} size={20} />
                  <Text style={styles.title}>Transaction{'\n'}History</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text style={styles.historyTitle}>Recent Transactions</Text>
          {this.state.isHistory === true ? (
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
                        + {item.currency} {'*'} {item.amount} - B{' '}
                        {item.coinAmount}
                      </Text>
                      <Text style={styles.entryDate1}>
                        {item.senderAccountNumber} -->{' '}
                        {item.receiverAccountNumber}
                      </Text>
                      <Text style={styles.entryDate}>
                        {item.date.substring(0, 10)} {'*'} ID{item.transferID}
                      </Text>
                    </View>
                  </View>
                  <Icon name="check-circle" size={40} color={'green'} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.panel}>
              <Text style={styles.panel_txt}>No Transaction History ...</Text>
            </View>
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
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  titleArea: {
    backgroundColor: GLOBALS.BASE_COLOR,
    width: '100%',
    alignItems: 'center',
  },
  currencyName: {
    color: 'white',
    fontSize: 24,
  },
  brand: {
    color: 'white',
    fontSize: 16,
  },
  amountArea: {
    flexDirection: 'row',
  },
  currencyUnit: {
    color: 'white',
    fontSize: 32,
    marginRight: 5,
  },
  amount: {
    color: 'white',
    fontSize: 32,
  },
  container: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    // backgroundColor: 'tomato',
    paddingTop: 20,
    // justifyContent: 'center',
  },
  toolbar: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: GLOBALS.BASE_COLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 15,
  },
  tool: {
    alignItems: 'center',
    width: '25%',
    borderRightColor: 'white',
    borderRightWidth: 1,
  },
  tool1: {
    alignItems: 'center',
    width: '25%',
  },
  text: {
    fontSize: 24,
    color: '#FC427B',
  },
  content_ara: {
    // backgroundColor: 'red',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 200,
  },
  bg: {
    width: 150,
    height: 150,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  historyTitle: {
    color: GLOBALS.BASE_COLOR,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  entry: {
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ccc',
    marginBottom: 2,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  list: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
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
  panel: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  panel_txt: {
    fontSize: 20,
    color: GLOBALS.BASE_COLOR,
  },
});
