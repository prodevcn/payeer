/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import RoyalTransferApp from './src/navigation/index';
import {setCustomText} from 'react-native-global-props';
const customTextProps = {
  style: {
    fontFamily: 'Lato-Regular',
  },
};
export default class App extends Component {
  constructor() {
    super();
    setCustomText(customTextProps);
  }
  render() {
    return <RoyalTransferApp />;
  }
}
