import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import styles from './styles/SignInStyles';
import {colors} from '../../styles/appColors';
import 'react-native-gesture-handler';
import IUserLogin from '../../model/signInSignUp/IUserLogin';
import IAuth from '../../api/authentication/IAuth';
import StudentAuth from '../../api/authentication/StudentAuth';
import TutorAuth from '../../api/authentication/TutorAuth';
import INavigation from '../../model/navigation/INavigation';
import ISignInPage from '../../model/signInSignUp/ISignInPage';
import store from '../store';
import actions from '../../utils/Actions';

interface IState extends IUserLogin, ISignInPage {}

// This component corresponds to the sign in page
class SignIn extends Component<INavigation, IState> {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordHidden: true,
    };

    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.signIn = this.signIn.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
  }

  handleEmail = (text): void => {
    this.setState({email: text});
  };

  handlePassword = (text): void => {
    this.setState({password: text});
  };

  changePasswordVisibility = (): void => {
    this.setState((prevState) => ({passwordHidden: !prevState.passwordHidden}));
  };

  // Send the user's input to the back-end
  signIn = async (): Promise<boolean> => {
    if (!this.state.email.includes('@') || this.state.password.length < 8) {
      Alert.alert('Please fill the required information before proceeding.');
      return false;
    }
    let auth: IAuth;
    if (true) {
      // TODO add for tutor
      auth = new StudentAuth();
    } else {
      auth = new TutorAuth();
    }
    try {
      const user = await auth.signInWithEmailAndPassword(this.state);
      store.dispatch({
        type: actions.userInfo,
        payload: {
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          avatar: user.avatar,
          phone: user.phone,
        },
      });
    } catch (error) {
      Alert.alert(`${error}`);
      return false;
    }
    return true;
  };

  forgotPassword = (): void => {
    // TODO: Redirect to forgot password page
  };

  signInWithGoogle = (): void => {
    // TODO: Redirect to Google Sign In
  };

  render() {
    return (
      <View style={styles.component}>
        <ImageBackground
          source={require('../../assets/images/icons/signInBackground.png')}
          style={styles.background}
        />

        <View style={styles.logo}>
          <Image
            source={require('../../assets/images/icons/logo.png')}
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
                  source={require('../../assets/images/icons/user.png')}
                  style={styles.icon}
                />
              </View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="email"
                placeholderTextColor={colors.appSilver}
                autoCapitalize="none"
                onChangeText={this.handleEmail}
              />
            </View>

            <View style={{flexDirection: 'row', margin: 15, marginLeft: 30}}>
              <View style={styles.iconBox}>
                <Image
                  source={require('../../assets/images/icons/lock.png')}
                  style={styles.icon}
                />
              </View>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="password"
                secureTextEntry={this.state.passwordHidden}
                placeholderTextColor={colors.appSilver}
                autoCapitalize="none"
                onChangeText={this.handlePassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={this.changePasswordVisibility}>
                <Image
                  source={
                    this.state.passwordHidden
                      ? require('../../assets/images/icons/eyeClosed.png')
                      : require('../../assets/images/icons/eyeOpened.png')
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => {
                if (this.signIn()) {
                  this.props.navigation.navigate('Home');
                }
              }}>
              <Text style={styles.signInText}> Sign In </Text>
              <Image
                source={require('../../assets/images/icons/nextArrow.png')}
                style={styles.nextArrow}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => this.forgotPassword()}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createAnAccountButton}
              onPress={() => {
                this.props.navigation.navigate('SignUpCredentials');
              }}>
              <Text style={styles.createAccountText}> Create an account </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInWithGoogleButton}
              onPress={() => this.signInWithGoogle()}>
              <Image
                source={require('../../assets/images/icons/googleIcon.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.signInWithGoogleText}>
                {' '}
                Sign in with Google{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default SignIn;
