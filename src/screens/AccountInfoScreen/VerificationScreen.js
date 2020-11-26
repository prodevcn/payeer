import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import GLOBALS from '../../constants/Globals';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

const win = Dimensions.get('window');
const options = {
  title: 'select ID',
  quality: 1.0,
  maxWidth: win.width * 0.6,
  maxHeight: win.width * 0.6,
  storageOptions: {
    skipBackup: true,
  },
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'choose photo from library',
};
export default class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeSelected: false,
      formCompleted: false,
      name: 'a',
      lastname: 'a',
      birth: 'a',
      country: 'a',
      address: 'a',
      card1: '',
      card2: '',
      bill: '',
      incorporation: 'a',
      userInfo: this.props.route.params.userInfo,
    };
  }
  onPickUserAccount(value) {
    this.setState({
      accountType: value,
    });
    if (value !== '') {
      this.setState({
        typeSelected: true,
      });
    } else {
      this.setState({
        typeSelected: false,
      });
    }
  }
  onSelectFrontID() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('response', response);
      if (response.uri) {
        this.setState({card1: response});
      }
    });
  }
  onSelectBackID() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('response', response);
      if (response.uri) {
        this.setState({card2: response});
      }
    });
  }
  onSelectBill() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('response', response);
      if (response.uri) {
        this.setState({bill: response});
      }
    });
  }
  componentDidUpdate() {
    console.log('updated');
  }
  onConfirm() {
    if (this.state.accountType === 'Personal') {
      if (this.state.accountType === '') {
        return false;
      } else if (this.state.name === '') {
        return false;
      } else if (this.state.lastname === '') {
        return false;
      } else if (this.state.birth === '') {
        return false;
      } else if (this.state.country === '') {
        return false;
      } else if (this.state.address === '') {
        return false;
      } else if (!this.state.card1.path) {
        return false;
      } else if (!this.state.card2.path) {
        return false;
      } else if (!this.state.bill.path) {
        return false;
      } else {
        return true;
      }
    }
    if (this.state.accountType === 'Business') {
      if (this.state.name === '') {
        return false;
      } else if (this.state.incorporation === '') {
        return false;
      } else if (this.state.country === '') {
        return false;
      } else if (this.state.address === '') {
        return false;
      } else if (!this.state.card1.path) {
        return false;
      } else if (!this.state.card2.path) {
        return false;
      } else if (!this.state.bill.path) {
        return false;
      } else {
        return true;
      }
    }
  }
  onSubmit() {
    let uploadImage = [];
    uploadImage[0] = this.state.card1;
    uploadImage[1] = this.state.card2;
    uploadImage[2] = this.state.bill;
    let data = new FormData();
    uploadImage.map((item, index) => {
      data.append('images', {
        uri: item.uri,
        type: 'image/jpeg',
        name: item.filename || `filename${index}.jpg`,
      });
    });
    let personalInfo = {};
    if (this.state.accountType === 'Personal') {
      personalInfo.accountType = this.state.accountType;
      personalInfo.name = this.state.name;
      personalInfo.lastname = this.state.lastname;
      personalInfo.birth = this.state.birth;
      personalInfo.country = this.state.country;
      personalInfo.address = this.state.address;
      personalInfo._id = this.state.userInfo._id;
      personalInfo.accountNumber = this.state.userInfo.accountNumber;
    } else {
      personalInfo.accountType = this.state.accountType;
      personalInfo.name = this.state.name;
      personalInfo.incorporation = this.state.incorporation;
      personalInfo.country = this.state.country;
      personalInfo.address = this.state.address;
      personalInfo._id = this.state.userInfo._id;
      personalInfo.accountNumber = this.state.userInfo.accountNumber;
    }
    Object.keys(personalInfo).forEach(function (key) {
      data.append(key, personalInfo[key]);
      console.log(data);
    });
    console.log(data);
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };
    let url = GLOBALS.BASE_URL + 'user/register/refill-personal';
    // let url = 'http://192.168.1.135:3000/api/photo';
    fetch(url, config)
      .then((checkStatusAndGetJSONResponse) => {
        console.log(checkStatusAndGetJSONResponse);
        this.props.navigation.navigate('Settings');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <SafeAreaView style={styles.main}>
        <ScrollView
          style={styles.main_area}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Text style={styles.topTitle}>Choose account type</Text>
            {this.state.typeSelected === true && (
              <Text style={styles.inputTitle}>Account Type</Text>
            )}
            <View style={styles.picker_area}>
              <Picker
                note
                mode="dropdown"
                selectedValue={this.state.accountType}
                onValueChange={this.onPickUserAccount.bind(this)}>
                <Picker.Item label="Account Type" value="" />
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Business" value="Business" />
              </Picker>
            </View>
            {this.state.accountType === 'Personal' && (
              <View>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                  style={styles.picker_area}
                  onChangeText={(input) => {
                    this.setState({name: input});
                  }}
                  value={this.state.name}
                />
                <Text style={styles.inputTitle}>Last Name</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) => this.setState({lastname: input})}
                  value={this.state.lastname}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Date of birth</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) => this.setState({birth: input})}
                  value={this.state.birth}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Country</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) => this.setState({country: input})}
                  value={this.state.country}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Address</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) => this.setState({address: input})}
                  value={this.state.address}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Your Passport or ID </Text>
                <View style={styles.uploadArea}>
                  <Text style={styles.id}>{this.state.card1.path} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectFrontID();
                    }}>
                    <Icon name="upload" size={20} color={GLOBALS.BASE_COLOR} />
                  </TouchableOpacity>
                </View>
                <View style={styles.uploadArea}>
                  <Text style={styles.id}>{this.state.card2.path} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectBackID();
                    }}>
                    <Icon name="upload" size={20} color={GLOBALS.BASE_COLOR} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputTitle}>Proof of address</Text>
                <View style={styles.uploadArea}>
                  <Text style={styles.id}>{this.state.bill.path} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectBill();
                    }}>
                    <Icon name="upload" size={20} color={GLOBALS.BASE_COLOR} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {this.state.accountType === 'Business' && (
              <View>
                <Text style={styles.inputTitle}>Company Name</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) => this.setState({name: input})}
                  value={this.state.name}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Date of incorporation</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) =>
                    this.setState({incorporation: input})
                  }
                  value={this.state.incorporation}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Country</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) => this.setState({country: input})}
                  value={this.state.country}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Address</Text>
                <TextInput
                  style={styles.picker_area}
                  placeholder=""
                  onChangeText={(input) => this.setState({address: input})}
                  value={this.state.address}
                  returnKeyType="next"
                />
                <Text style={styles.inputTitle}>Director passport </Text>
                <View style={styles.uploadArea}>
                  <Text style={styles.id}>{this.state.card1.path} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectFrontID();
                    }}>
                    <Icon name="upload" size={20} color={GLOBALS.BASE_COLOR} />
                  </TouchableOpacity>
                </View>
                <View style={styles.uploadArea}>
                  <Text style={styles.id}>{this.state.card2.path} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectBackID();
                    }}>
                    <Icon name="upload" size={20} color={GLOBALS.BASE_COLOR} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.inputTitle}>Company docs</Text>
                <View style={styles.uploadArea}>
                  <Text style={styles.id}>{this.state.bill.path} </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.onSelectBill();
                    }}>
                    <Icon name="upload" size={20} color={GLOBALS.BASE_COLOR} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {this.onConfirm() === true && (
            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                this.onSubmit();
              }}>
              <Text style={styles.submit_text}>SUBMIT FOR REVIEW</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  main_area: {
    flex: 1,
    width: '100%',
  },
  container: {
    width: '80%',
    flex: 1,
    alignSelf: 'center',
  },
  topTitle: {
    width: '100%',
    color: GLOBALS.BASE_COLOR,
    // backgroundColor: 'aqua',
    marginBottom: 10,
  },
  inputTitle: {
    width: '100%',
    color: GLOBALS.BASE_COLOR,
    // backgroundColor: 'aqua',
    marginTop: 20,
  },
  picker_area: {
    // backgroundColor: 'pink',
    borderBottomColor: GLOBALS.BASE_COLOR,
    borderBottomWidth: 1,
  },
  picker: {
    color: '#aaa',
  },
  uploadArea: {
    alignItems: 'flex-end',
    borderBottomColor: GLOBALS.BASE_COLOR,
    borderBottomWidth: 1,
    // backgroundColor: 'tomato',
    marginVertical: 10,
  },
  id: {
    color: GLOBALS.BASE_COLOR,
  },
  submit: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: GLOBALS.SUB_COLOR,
    // position: 'absolute',
    // bottom: 0,
  },
  submit_text: {
    color: 'white',
  },
  imgArea: {
    width: win.width * 0.6,
    height: win.width * 0.6,
  },
});
