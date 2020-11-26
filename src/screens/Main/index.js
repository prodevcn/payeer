import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import BalanceScreen from '../../sub_screens/BalanceScreen';
import TransferScreen from '../../sub_screens/TransferScreen';
import TradeScreen from '../../sub_screens/TradeScreen';
import ExchangeScreen from '../../sub_screens/ExchangeScreen';
import HistoryScreen from '../../sub_screens/HistoryScreen';
import RefillAccountScreen from '../../sub_screens/BalanceScreen/RefillAccountScreen';
import AddMoneyScreen from '../../sub_screens/BalanceScreen/AddMoneyScreen';
import {createStackNavigator} from '@react-navigation/stack';
import TransferMain from '../../sub_screens/TransferScreen/TransferMain';
import AddForm from '../../sub_screens/BalanceScreen/AddForm';
import AddConfirmScreen from '../../sub_screens/BalanceScreen/AddConfirmScreen';
import TransferConfirmScreen from '../../sub_screens/TransferScreen/TransferConfirmScreen';
import TransferResultScreen from '../../sub_screens/TransferScreen/TransferResultScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SubStack() {
  return (
    <Stack.Navigator initialRouteName="Balance">
      <Stack.Screen
        name="Balance"
        component={BalanceScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RefillScreen"
        component={RefillAccountScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#6c5ce7',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="AddMoney"
        component={AddMoneyScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#6c5ce7',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerShown: true,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="AddForm"
        component={AddForm}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#6c5ce7',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerShown: true,
          headerTitle: 'Add',
        }}
      />
      <Stack.Screen
        name="AddConfirm"
        component={AddConfirmScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#6c5ce7',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerShown: true,
          headerTitle: 'Add money',
        }}
      />
    </Stack.Navigator>
  );
}
function TransferStack() {
  return (
    <Stack.Navigator initialRouteName="Transfer">
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransferMain"
        component={TransferMain}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#6c5ce7',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerShown: true,
          headerTitle: 'Transfer',
        }}
      />
      <Stack.Screen
        name="TransferConfirm"
        component={TransferConfirmScreen}
        options={{
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#6c5ce7',
            shadowOpacity: 0,
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerShown: true,
          headerTitle: 'Payment options',
        }}
      />
      <Stack.Screen
        name="TransferResult"
        component={TransferResultScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Tab.Navigator
        initialRouteName="BalanceScreen"
        tabBarOptions={{
          activeTintColor: '#e91e63',
          inactiveTintColor: '#6c5ce7',
        }}>
        <Tab.Screen
          name="BalanceScreen"
          component={SubStack}
          options={{
            tabBarLabel: 'Balance',
            tabBarIcon: ({color, size}) => (
              <Icon2 name="wallet" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="TransferStack"
          component={TransferStack}
          options={{
            tabBarLabel: 'Transfer',
            tabBarIcon: ({color, size}) => (
              <Icon name="recycle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Trade"
          component={TradeScreen}
          options={{
            tabBarLabel: 'Trade',
            tabBarIcon: ({color, size}) => (
              <Icon name="line-chart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Exchange"
          component={ExchangeScreen}
          options={{
            tabBarLabel: 'Exchange',
            tabBarIcon: ({color, size}) => (
              <Icon name="exchange" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({color, size}) => (
              <Icon name="history" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
