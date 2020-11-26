import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  //   FlatList,
} from 'react-native';
import {ChargeSystems} from '../../constants/ChargeSystems';
import Header from '../../components/header';
import GLOBALS from '../../constants/Globals';
export default class AddMoneyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Add',
      currency: this.props.route.params.currency,
      userInfo: this.props.route.params.userInfo,
      balanceInfo: this.props.route.params.balanceInfo,
    };
  }
  componentDidMount() {
    console.log(this.props.route.params.balanceInfo);
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
            {ChargeSystems.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.system}
                  key={index}
                  onPress={() => {
                    this.props.navigation.navigate('AddForm', {
                      system: item,
                      currency: this.state.currency,
                      userInfo: this.state.userInfo,
                      balanceInfo: this.state.balanceInfo,
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
    backgroundColor: GLOBALS.BASE_COLOR,
    // flex: 1,
    width: '100%',
    borderRadius: 10,
    // shadowColor: '#6c5ce7',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  system: {
    marginHorizontal: 10,
    borderBottomColor: 'white',
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
    color: 'white',
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
