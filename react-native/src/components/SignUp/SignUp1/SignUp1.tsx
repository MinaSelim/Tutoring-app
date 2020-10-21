import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  navigation: NavigationInjectedProps;
}

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

class SignUp extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    };

    this.saveInfo = this.saveInfo.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.alertMandatoryFields = this.alertMandatoryFields.bind(this);
  }

  handleFirstName = (text) => {
    this.setState({firstName: text});
  };

  handleLastName = (text) => {
    this.setState({lastName: text});
  };

  handleEmail = (text) => {
    this.setState({email: text});
  };

  handlePhone = (text) => {
    this.setState({phone: text});
  };

  handlePassword = (text) => {
    this.setState({password: text});
  };

  alertMandatoryFields() {
    Alert.alert('Fields with * are mandatory.');
  }

  saveInfo() {
    if (
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.email === '' ||
      this.state.password === ''
    ) {
      return false;
    }
    //TODO send info to node.js
    return true;
  }

  signInWithGoogle = () => {
    //TODO: Redirect to Google sign-in
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'stretch'}}>
        <ImageBackground
          source={require('../../../assets/images/signUpBackground.png')}
          style={{width: '100%', height: '100%', position: 'absolute'}}
        />
        <TouchableOpacity
          style={{position: 'absolute'}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backBtn.png')}
            style={{width: 40, height: 30, left: 10, top: 10}}
          />
        </TouchableOpacity>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 36, fontWeight: 'bold'}}>Sign up</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="First Name"
              placeholderTextColor="#8B9CB3"
              onChangeText={this.handleFirstName}
            />
          </View>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Last Name"
              placeholderTextColor="#8B9CB3"
              onChangeText={this.handleLastName}
            />
          </View>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor="#8B9CB3"
              onChangeText={this.handleEmail}
            />
          </View>
          <View style={styles.inputSection}>
            <TextInput
              style={styles.inputBox}
              placeholder=" Phone"
              placeholderTextColor="#8B9CB3"
              onChangeText={this.handlePhone}
            />
          </View>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#8B9CB3"
              onChangeText={this.handlePassword}
            />
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            marginLeft: '5%',
            marginRight: '5%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              this.saveInfo()
                ? this.props.navigation.navigate('SignUp2')
                : this.alertMandatoryFields();
            }}>
            <Text style={{color: 'white'}}> Next </Text>
            <Image
              source={require('../../../assets/images/nextArrow.png')}
              style={styles.nextArrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signInWithGoogleButton}
            onPress={() => this.signInWithGoogle()}>
            <Image
              source={require('../../../assets/images/googleIcon.png')}
              style={styles.googleIcon}
            />
            <Text style={{color: '#8B9CB3'}}> Sign in with Google </Text>
          </TouchableOpacity>
          <Text style={styles.footer}>go.study</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: '#8B9CB3',
  },
  star: {
    color: '#E86D2C',
    fontWeight: 'bold',
  },
  inputSection: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'row',
  },
  inputBox: {
    borderColor: '#979797',
    borderBottomWidth: 1,
    width: '100%',
    height: 40,
    fontSize: 18,
    color: 'black',
  },
  nextButton: {
    backgroundColor: '#F0793A',
    margin: 5,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nextArrow: {
    width: 20,
    height: 12,
    marginLeft: 5,
  },
  signInWithGoogleButton: {
    backgroundColor: '#F1F3F8',
    margin: 5,
    marginBottom: 10,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 22,
    position: 'absolute',
    left: 25,
  },
  footer: {
    alignSelf: 'center',
    color: '#E9EAEE',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SignUp;
