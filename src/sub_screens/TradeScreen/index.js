import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TradingHomeScreen from './TradingHomeScreen';
import OrderingScreen from './OrderingScreen';
const Stack = createStackNavigator();
const headerOption = {
  headerShown: false,
};

export default class TradeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator initialRouteName="TradingHome">
        <Stack.Screen
          name="TradingHome"
          component={TradingHomeScreen}
          options={headerOption}
        />
        <Stack.Screen
          name="Ordering"
          component={OrderingScreen}
          options={{
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: '#6c5ce7',
              shadowOpacity: 0,
              borderBottomWidth: 0,
              elevation: 0,
            },
            headerShown: true,
            headerTitle: 'Order',
          }}
        />
      </Stack.Navigator>
    );
  }
}
