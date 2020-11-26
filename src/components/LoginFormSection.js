import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
class LoginFormSection extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>
        <TouchableOpacity style={styles.settingBtn}>
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
    height: '8%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default LoginFormSection;
