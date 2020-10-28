import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';

interface IProps {
  email: string;
  password: string;
  navigation: NavigationInjectedProps;
  passwordHidden: boolean;
}

interface IState {
  email: string;
  password: string;
  passwordHidden: boolean;
}

class SignIn extends Component<IProps, IState> {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordHidden: true,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.alertMandatoryFields = this.alertMandatoryFields.bind(this);
    this.signIn = this.signIn.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }

  handleEmail = (text) => {
    this.setState({email: text});
  };

  handlePassword = (text) => {
    this.setState({password: text});
  };

  changePasswordVisibility = () => {
    this.setState({passwordHidden: !this.state.passwordHidden})
  };

  alertMandatoryFields() {
    Alert.alert('Please fill the required information before proceeding.');
  }

  signIn = () => {
    if (this.state.email === '' || this.state.password === ''){
      return false;
    }
    //TODO Pass sign in info to node.js code
    return true;
  };

  forgotPassword = () => {
    //TODO: Redirect to forgot password page
  };

  signInWithGoogle = () => {
    //TODO: Redirect to Google Sign In
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../assets/images/signInBackground.png')}
          style={styles.background}
        />

        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: 75,
            width: 200,
            marginTop: 10,
            marginRight: 10,
          }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.title}
          />
        </View>

        <View style={styles.container}>
          <View style={{marginBottom: 40, width: '85%'}}>
            <Text style={styles.welcome}>Welcome!</Text>

            <Text style={styles.signInToContinue}>Sign in to continue</Text>

            <View style={{flexDirection: 'row', margin: 15, marginLeft: 30}}>
              <View style={styles.iconBox}>
                <Image
                  source={require('../../assets/images/user.png')}
                  style={styles.icon}
                />
              </View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="email"
                placeholderTextColor="#8B9CB3"
                autoCapitalize="none"
                onChangeText={this.handleEmail}
              />
            </View>

            <View style={{flexDirection: 'row', margin: 15, marginLeft: 30}}>
              <View style={styles.iconBox}>
                <Image
                  source={require('../../assets/images/lock.png')}
                  style={styles.icon}
                />
              </View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="password"
                secureTextEntry={this.state.passwordHidden}
                placeholderTextColor="#8B9CB3"
                autoCapitalize="none"
                onChangeText={this.handlePassword}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={this.changePasswordVisibility}>
              <Image
              source={this.state.passwordHidden?require('../../assets/images/eyeClosed.png'):require('../../assets/images/eyeOpened.png')}
              style={styles.eyeIcon}
              />
            </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => 
                {this.signIn()
                  ? this.props.navigation.navigate('')
                  : this.alertMandatoryFields();
              }}>
              <Text style={{color: 'white'}}> Sign In </Text>
              <Image
                source={require('../../assets/images/nextArrow.png')}
                style={styles.nextArrow}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => this.forgotPassword()}>
              <Text style={{color: '#96A7AF', fontSize: 12}}>
                {' '}
                Forgot password?{' '}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createAnAccountButton}
              onPress={() => {
                this.props.navigation.navigate('SignUpCredentials');
              }}>
              <Text style={{color: '#E86D2C'}}> Create an account </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInWithGoogleButton}
              onPress={() => this.signInWithGoogle()}>
              <Image
                source={require('../../assets/images/googleIcon.png')}
                style={styles.googleIcon}
              />
              <Text style={{color: '#8B9CB3'}}> Sign in with Google </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default SignIn;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'stretch',
    width: '100%',
  },
  title: {
    width: '100%',
    height: '100%',
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 18,
    marginLeft: 20,
  },
  icon: {
    width: '60%',
    height: '50%',
    alignSelf: 'center',
  },
  iconBox: {
    backgroundColor: '#FCEED9',
    height: 40,
    width: 32,
    borderRadius: 10,
    justifyContent: 'center',
  },
  signInToContinue: {
    fontSize: 20,
    marginBottom: 28,
    marginLeft: 20,
  },
  input: {
    height: 40,
    borderColor: '#8B9CB3',
    borderBottomWidth: 0.75,
    width: '100%',
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  eyeButton: {
    right: 35,
    top: 5,
  },
  eyeIcon: {
    position:"relative"
  },
  signInButton: {
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
  forgotPasswordButton: {
    margin: 5,
    height: 25,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAnAccountButton: {
    backgroundColor: '#FCEED9',
    margin: 5,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInWithGoogleButton: {
    backgroundColor: '#F1F3F8',
    margin: 5,
    marginBottom: 20,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  googleIcon: {
    width: 20,
    height: 22,
    position: 'absolute',
    left: 25,
  },
})
