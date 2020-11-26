import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class AccountInfoScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Templates</Text>
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
});
