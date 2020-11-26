import React, {Component} from 'react';
import {Animated, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// import screens
import Onboarding from '../screens/Onboarding';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import SignupSuccessScreen from '../screens/SignupSuccessScreen';
import CreatePINScreen from '../screens/CreatePINScreen';
import ChangePINScreen from '../screens/CreatePINScreen/ChangePINScreen';
import RestorePwdScreen from '../screens/RestorePwdScreen';
import RestoreSecretScreen from '../screens/RestoreSecretScreen';
import RestoreScreen from '../screens/RestoreScreen';
import ChangePwdScreen from '../screens/ChangePwdScreen';
import Main from '../screens/Main';
import SupportScreen from '../screens/SupportScreen';
import NewTicketScreen from '../screens/NewTicketScreen';
import MessagesScreen from '../screens/MessagesScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TemplatesScreen from '../screens/TemplatesScreen';
import ResetPwdScreen from '../screens/ResetPwdScreen';
import BalanceCurrencyScreen from '../screens/BalanceCurrencyScreen';
import SecurityScreen from '../screens/SecurityScreen';
import PasswordSettingsScreen from '../screens/PasswordSettingsScreen';
import VerificationScreen from '../screens/AccountInfoScreen/VerificationScreen';
import BindScreen from '../screens/BindScreen';
import AsyncStorage from '@react-native-community/async-storage';
//

const Stack = createStackNavigator();
const forFade = ({current, next}) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0,
  ).interpolate({
    inputRange: [0, 0, 2],
    outputRange: [0, 10, 0],
  });
  return {
    leftButtonStyle: {opacity},
    rightButtonStyle: {opacity},
    titleStyle: {opacity},
    backgroundStyle: {opacity},
  };
};

const headerOption = {
  headerShown: false,
};

const headerOption_1 = {
  headerTintColor: 'white',
  headerStyle: {backgroundColor: '#6c5ce7'},
  headerStyleInterpolator: forFade,
  headerShown: true,
  headerTitle: 'User Agreement',
};

// function RootStack() {
//   return (
//   );
// }
export default class RoyalTransferApp extends Component {
  constructor() {
    super();
    (async () => {
      AsyncStorage.clear();
    })();
  }
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={headerOption}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={headerOption_1}
          />
          <Stack.Screen
            name="SignupSuccess"
            component={SignupSuccessScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="CreatePIN"
            component={CreatePINScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="ChangePIN"
            component={ChangePINScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="RestorePwd"
            component={RestorePwdScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="RestoreSecret"
            component={RestoreSecretScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="Restore"
            component={RestoreScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="PasswordSettings"
            component={PasswordSettingsScreen}
            options={headerOption}
          />
          <Stack.Screen
            name="ChangePwd"
            component={ChangePwdScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: '',
            }}
          />
          <Stack.Screen name="Main" component={Main} options={headerOption} />
          <Stack.Screen
            name="Support"
            component={SupportScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Support',
            }}
          />
          <Stack.Screen
            name="NewTicket"
            component={NewTicketScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="Messages"
            component={MessagesScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Messages',
            }}
          />
          <Stack.Screen
            name="AccountInfo"
            component={AccountInfoScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Account Info',
            }}
          />
          <Stack.Screen
            name="Security"
            component={SecurityScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Security',
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Settings',
            }}
          />
          <Stack.Screen
            name="Templates"
            component={TemplatesScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Templates',
            }}
          />
          <Stack.Screen
            name="ResetPwd"
            component={ResetPwdScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Change Password',
            }}
          />
          <Stack.Screen
            name="BalanceCurrency"
            component={BalanceCurrencyScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Balance Currency',
            }}
          />
          <Stack.Screen
            name="Verification"
            component={VerificationScreen}
            options={headerOption_1}
          />
          <Stack.Screen
            name="Bind"
            component={BindScreen}
            options={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#6c5ce7',
                shadowOpacity: 0,
                borderBottomWidth: 0,
                elevation: 0,
              },
              headerStyleInterpolator: forFade,
              headerShown: true,
              headerTitle: 'Bind',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
