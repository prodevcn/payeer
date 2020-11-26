import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import GLOBALS from '../../constants/Globals';
import Modal from 'react-native-modal';
const win = Dimensions.get('window');
export default class MessagesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userInfo: this.props.route.params.userInfo,
      isVisible: false,
      description: '',
      date: '',
    };
    let url = GLOBALS.BASE_URL + GLOBALS.GET_MESSAGE;
    let config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({accountNumber: this.state.userInfo.accountNumber}),
    };
    fetch(url, config)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({messages: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.refreshData();
    });
  }
  refreshData() {
    let url = GLOBALS.BASE_URL + GLOBALS.GET_MESSAGE;
    let config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({accountNumber: this.state.userInfo.accountNumber}),
    };
    fetch(url, config)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({messages: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  }
  toggleModal(value) {
    this.setState({
      description: value.description,
      date: value.date,
      isVisible: true,
    });
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.container}>
          <Modal isVisible={this.state.isVisible} style={styles.box}>
            <View style={styles.modal}>
              <Text style={styles.date}>{this.state.date}</Text>
              <Text style={styles.description1}>{this.state.description}</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  this.setState({isVisible: false});
                }}>
                <Text style={styles.btnText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Text style={styles.title}>Messages</Text>
          <ScrollView
            style={styles.messageBox}
            showsVerticalScrollIndicator={false}>
            {this.state.messages.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.messageContext}
                  key={index}
                  onPress={() => {
                    this.toggleModal(item);
                  }}>
                  <Text
                    style={
                      item.checked === true ? styles.checked : styles.unchecked
                    }>
                    {item.description}
                  </Text>
                  <View style={styles.date}>
                    <Text style={styles.dateTxt}>{item.date}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
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
  container: {
    width: '90%',
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: '#FC427B',
  },
  title: {
    color: GLOBALS.BASE_COLOR,
    fontSize: 16,
    marginVertical: 10,
  },
  messageContext: {
    borderBottomColor: '#777',
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  date: {
    alignSelf: 'flex-end',
    color: 'green',
  },
  dateTxt: {
    color: 'green',
    alignSelf: 'flex-end',
  },
  checked: {
    color: '#777',
  },
  unchecked: {
    color: '#000',
  },
  box: {
    alignSelf: 'center',
    // backgroundColor: 'white',
    width: win.width * 0.8,
  },
  modal: {
    width: win.width * 0.8,
    // height: (win.width * 0.8 * 3) / 4,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btn: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: GLOBALS.BASE_COLOR,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 12,
  },
  description1: {
  
  },
});
