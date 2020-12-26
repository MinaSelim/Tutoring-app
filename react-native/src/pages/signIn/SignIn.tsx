import React, {useState} from 'react';
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
import IAuth from '../../api/authentication/IAuth';
import StudentAuth from '../../api/authentication/StudentAuth';
import TutorAuth from '../../api/authentication/TutorAuth';
import INavigation from '../../models/navigation/NavigationInjectedPropsConfigured';

const SignIn: React.FunctionComponent<INavigation> = ({
  navigation,
}: INavigation) => {
  // Hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handleEmailChange = (text): void => {
    setEmail(text);
  };

  const handlePasswordChange = (text): void => {
    setPassword(text);
  };

  const changePasswordVisibility = (): void => {
    setPasswordHidden(!isPasswordHidden);
  };

  const forgotPassword = (): void => {
    // TODO: Redirect to forgot password page
  };

  const signInWithGoogle = (): void => {
    // TODO: Redirect to Google Sign In
  };

  const signIn = async (): Promise<void> => {
    if (!email.includes('@') || password.length < 8) {
      Alert.alert('Please fill the required information before proceeding.');
      return;
    }
    // TODO Distinguish between student and tutor auth
    const auth: IAuth = new StudentAuth();
    // } else {
    // auth = new TutorAuth();
    // }
    // const user = null;
    try {
      const userLoginInfo = {email, password};
      await auth.signInWithEmailAndPassword(userLoginInfo);

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  // Rendering component
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
              onChangeText={(e): void => handleEmailChange(e)}
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
              onChangeText={(e): void => handlePasswordChange(e)}
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
              navigation.navigate('SignUpCredentials');
            }}>
            <Text style={styles.createAccountText}> Create an account </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInWithGoogleButton}
            onPress={(): void => signInWithGoogle()}>
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
};

export default SignIn;
