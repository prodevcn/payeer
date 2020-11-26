import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {coinData} from '../../libs/Constants';
import CoinDetail from '../../components/CoinDetail';
export default class BalanceCurrencyScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={coinData}
          renderItem={({item}) => (
            <CoinDetail coinName={item.name} iconUri={item.iconUri} />
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#FC427B',
  },
  list: {
    marginTop: 30,
    marginBottom: 30,
    width: '90%',
    borderWidth: 1,
    padding: 5,
  },
});
