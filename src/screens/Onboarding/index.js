import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const win = Dimensions.get('window');
export default class Onboarding extends Component {
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <ImageBackground
          source={require('../../../assets/images/background1.png')}
          style={styles.background}>
          <View style={styles.container}>
            <View style={styles.logo_area}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.logo}
              />
              <Image
                source={require('../../../assets/images/title.png')}
                style={styles.logo_title}
              />
            </View>
            <View style={styles.text_area}>
              <Text style={styles.subtitle}>MOBILE</Text>
              <Text style={styles.subheading}> INSTANT PAYMENTS</Text>
              <Text style={styles.subheading}> AROUND THE WORLD</Text>
            </View>
            <View style={styles.btn_area}>
              <TouchableOpacity
                style={styles.Btn}
                activeOpacity={0.5}
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
                <Text style={styles.btnText}>SIGNUP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Btn}
                activeOpacity={0.5}
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}>
                <Text style={styles.btnText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_area: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: 'tomato',
  },
  text_area: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btn_area: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 54,
    color: 'white',
  },
  subtitle: {
    fontFamily: 'Tangerine',
    fontSize: 24,
    color: '#F3B431',
  },
  logo_title: {
    width: win.width * 0.8,
    height: win.width * 0.2,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: win.width * 0.4,
    height: win.width * 0.4,
    marginBottom: 20,
  },
  subheading: {
    fontSize: 16,
    color: '#f20530',
  },
  Btn: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#6c5ce7',
    opacity: 0.8,
    borderStyle: 'solid',
    borderColor: '#f7b731',
    borderWidth: 1,
    width: '80%',
    padding: 8,
    // borderBottomStartRadius: 20,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 16,
    color: '#f7b731',
  },
});
