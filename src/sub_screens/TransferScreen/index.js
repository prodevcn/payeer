import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {paymentSystems} from '../../constants/PaymentSystems';
import {coinData} from '../../libs/Constants';
import Header from '../../components/header';
import GLOBALS from '../../constants/Globals';
import AsyncStorage from '@react-native-community/async-storage';
export default class TransferScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balanceInfo: {},
      title: 'Transfer',
    };
  }
  componentDidMount() {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('balanceInfo');
        this.setState({balanceInfo: JSON.parse(value)});
      } catch (e) {
        console.log(e);
      }
    })();
  }
  doMain(item) {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('balanceInfo');
        this.setState({balanceInfo: JSON.parse(value)});
        let balance = JSON.parse(value)[item.name];
        this.props.navigation.navigate('TransferMain', {
          system: item,
          balance: balance,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <Header title={this.state.title} navigation={this.props.navigation} />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Payment systems</Text>
          <View style={styles.systemList}>
            <View style={styles.system1}>
              <TouchableOpacity
                style={styles.header}
                onPress={() => {
                  this.props.navigation.navigate('TransferMain', {
                    system: coinData[0],
                  });
                  console.log(coinData[0]);
                }}>
                <Image
                  source={require('../../../assets/images/payment_systems/rt.png')}
                  style={styles.logo}
                />
                <Text style={styles.systemName}>Royal Transfert</Text>
              </TouchableOpacity>
              <View style={styles.subSystem}>
                <FlatList
                  style={styles.list}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={coinData}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.doMain(item);
                      }}>
                      <Image source={item.iconUri} style={styles.logo} />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.name}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            </View>
            {paymentSystems.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.system}
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate('TransferMain', {
                      system: item,
                    });
                  }}>
                  <Image source={item.iconUri} style={styles.logo} />
                  <Text style={styles.systemName}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: 'tomato',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    // backgroundColor: 'aqua',
    // flex: 1,
  },
  title: {
    fontSize: 16,
    color: GLOBALS.BASE_COLOR,
    marginVertical: 10,
    marginLeft: 10,
  },
  systemList: {
    backgroundColor: 'white',
    // flex: 1,
    borderRadius: 5,
    borderColor: '#6c5ce7',
    shadowColor: '#6c5ce7',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  system: {
    marginHorizontal: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  system1: {
    marginHorizontal: 10,
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
    height: 50,
  },
  systemName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#888',
  },
  subSystem: {
    width: '40%',
    // backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
