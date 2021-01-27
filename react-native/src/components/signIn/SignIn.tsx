import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import styles from './styles/SignInStyles';
import {colors} from '../../styles/appColors';
import 'react-native-gesture-handler';
import IUserLogin from '../../model/signInSignUp/IUserLogin';
import IAuth from '../../api/authentication/IAuth';
import StudentAuth from '../../api/authentication/StudentAuth';
import TutorAuth from '../../api/authentication/TutorAuth';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import ISignInPage from '../../model/signInSignUp/ISignInPage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '@ui-kitten/components';
import ToggleBarStudentTutor from './ToggleUserType';

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
  signIn = async (): Promise<void> => {
    if (!this.state.email.includes('@') || this.state.password.length < 8) {
      Alert.alert('Please fill the required information before proceeding.');
      return;
    }
    let auth: IAuth;
    if (true) {
      // TODO add for tutor
      auth = new StudentAuth();
    } else {
      auth = new TutorAuth();
    }
    let user = {};
    try {
      user = await auth.signInWithEmailAndPassword(this.state);
      this.props.navigation.navigate('Home');
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  forgotPassword = (): void => {
    // TODO: Redirect to forgot password page
  };

  signInWithGoogle = (): void => {
    // TODO: Redirect to Google Sign In
  };

  render(): JSX.Element {
    return (
      <ImageBackground
        source={require('../../assets/images/icons/signInBackground.png')}
        style={styles.background}>
        <SafeAreaView style={[styles.safeArea]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingView}>
            <View style={styles.component}>
              <View style={styles.logo}>
                <Image
                  source={require('../../assets/images/icons/logo.png')}
                  style={styles.title}
                />
              </View>

              <View style={styles.container}>
                <ScrollView>
                  <ToggleBarStudentTutor />
                  <View style={styles.inputView}>
                    <View style={styles.userInputView}>
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

                    <View style={styles.userInputView}>
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
                  <View style={styles.signInButtonView}>
                    <TouchableOpacity
                      style={styles.signInButton}
                      onPress={(): void => {
                        this.signIn();
                      }}>
                      <Text style={styles.signInText} category="label">
                        {' '}
                        Sign In{' '}
                      </Text>
                      <Image
                        source={require('../../assets/images/icons/nextArrow.png')}
                        style={styles.nextArrow}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.forgotPasswordButton}
                      onPress={(): void => this.forgotPassword()}>
                      <Text style={styles.forgotPasswordText} category="label">
                        Forgot password?
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.createAnAccountButton}
                      onPress={(): void => {
                        this.props.navigation.navigate('SignUpCredentials');
                      }}>
                      <Text style={styles.createAccountText} category="label">
                        {' '}
                        Create an account{' '}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.signInWithGoogleButton}
                      onPress={(): void => this.signInWithGoogle()}>
                      <Image
                        source={require('../../assets/images/icons/googleIcon.png')}
                        style={styles.googleIcon}
                      />
                      <Text
                        style={styles.signInWithGoogleText}
                        category="label">
                        {' '}
                        Sign in with Google{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
export default SignIn;
