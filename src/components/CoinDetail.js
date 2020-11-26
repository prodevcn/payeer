import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

export default class CoinDetail extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Image source={this.props.iconUri} style={styles.logo} />
        <Text style={styles.text}>{this.props.coinName}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  text: {
    color: '#888',
    flex: 1,
    fontSize: 20,
    // fontFamily:
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
    // flex: 1,
  },
});
