import React, {useState, useEffect} from 'react';
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
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import ISignInPage from '../../model/signInSignUp/ISignInPage';
import store from '../store';
import actions from '../../utils/Actions';

interface IState extends IUserLogin, ISignInPage {}



// Send the user's input to the back-end
const signIn = async (): Promise<void> => {
  if (!email.includes('@') || password.length < 8) {
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
  let user = null;
  try {
    user = await auth.signInWithEmailAndPassword(state);
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
    props.navigation.navigate('Home');
  } catch (error) {
    Alert.alert(`${error}`);
  }
};

const forgotPassword = (): void => {
  // TODO: Redirect to forgot password page
};

const signInWithGoogle = (): void => {
  // TODO: Redirect to Google Sign In
};

const SignIn: React.FunctionComponent<INavigation> = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isPasswordHidden, setPasswordHidden] = useState(true);

	const handleEmail = (text): void => {
		useEffect(() => setEmail(text))
	};
	  
	const handlePassword = (text): void => {
		useEffect(() => setPassword(text))
	};
	  
	const changePasswordVisibility = (): void => {
		useEffect(() => setPasswordHidden(!isPasswordHidden))
	};

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
                onChangeText={(e) => handleEmail(e)}
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
                secureTextEntry={isPasswordHidden}
                placeholderTextColor={colors.appSilver}
                autoCapitalize="none"
                onChangeText={(e) => handlePassword(e)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={changePasswordVisibility}>
                <Image
                  source={
                    isPasswordHidden
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
              onPress={(): void => {
                signIn();
              }}>
              <Text style={styles.signInText}> Sign In </Text>
              <Image
                source={require('../../assets/images/icons/nextArrow.png')}
                style={styles.nextArrow}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={(): void => forgotPassword()}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.createAnAccountButton}
              onPress={(): void => {
                this.props.navigation.navigate('SignUpCredentials');
              }}>
              <Text style={styles.createAccountText}> Create an account </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signInWithGoogleButton}
              onPress={(): void => this.signInWithGoogle()}>
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
