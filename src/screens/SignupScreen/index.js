import React, {Component} from 'react';
import Letter from '../../constants/UserAgreementText';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const win = Dimensions.get('window');
export default class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAgreement: Letter(),
    };
  }
  componentDidMount() {}
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
          />
          <ScrollView style={styles.scroll}>
            <Text style={styles.scrollText}>{this.state.userAgreement}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={styles.agreeBtn}
          activeOpacity={0.5}
          onPress={() => {
            this.props.navigation.navigate('SignupSuccess');
          }}>
          <Text style={styles.btnTitle}>AGREE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'tomato',
  },
  container: {
    flex: 1,
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingTop: 50,
  },
  agreeBtn: {
    bottom: 0,
    color: 'white',
    fontSize: 24,
    backgroundColor: '#FC427B',
    height: 52,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollText: {
    color: 'black',
    // width: '80%',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: 'transparent',
    width: '100%',
  },
  btnTitle: {
    color: 'white',
    fontSize: 16,
  },
  logo: {
    width: win.width * 0.4,
    height: win.width * 0.4,
    margin: 20,
  },
});
