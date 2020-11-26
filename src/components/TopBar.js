import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
        <TouchableOpacity
          style={styles.settingBtn}
          onPress={() => this.props.navigation.navigate('Support')}>
          <Image
            source={require('../../assets/images/headset.png')}
            style={styles.head}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingBtn: {
    backgroundColor: 'transparent',
  },
  head: {
    width: 25,
    height: 25,
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
});

export default TopBar;
