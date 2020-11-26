import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

export default class WalletDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: this.props.userInfo,
      currency: this.props.currency,
    };
  }
  componentDidMount() {
    console.log(this.state.currency);
  }
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate('RefillScreen', {
            currency: this.state.currency,
          });
        }}>
        <Image source={this.state.currency.iconUri} style={styles.logo} />
        <Text style={styles.text}>{this.state.currency.name}</Text>
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
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
});
