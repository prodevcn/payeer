import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
export default class SupportScreen extends Component {
  state = {
    exist_ticket: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.ticket_area}>
          <Image
            style={styles.ticket}
            source={require('../../../assets/images/ticket.png')}
          />
          <Text style={styles.title}>You don't have any tickets yet</Text>
          <Text style={styles.sub_title}>
            Have any questions or problems with your RT card / account ?
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('NewTicket')}>
          <Text style={styles.newTicketBtn}>COMPOSE A NEW TICKET</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  ticket_area: {
    alignItems: 'center',
    flex: 7,
    paddingTop: 30,
    width: '80%',
  },
  ticket: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
  title: {
    color: '#6c5ce7',
    fontSize: 20,
  },

  text: {
    fontSize: 24,
    color: '#FC427B',
  },
  newTicketBtn: {
    fontSize: 18,
    color: '#FC427B',
    marginBottom: 20,
  },
});
