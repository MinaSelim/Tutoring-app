import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Image, Alert} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import styles from './styles/SignInStyles';
import {colors} from '../../styles/appColors';
import 'react-native-gesture-handler';
import IAuth from '../../api/authentication/IAuth';
import StudentAuth from '../../api/authentication/StudentAuth';
import TutorAuth from '../../api/authentication/TutorAuth';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import ISignInPage from '../../model/signInSignUp/ISignInPage';
import {SafeAreaView} from 'react-native-safe-area-context';
import IUser from '../../model/common/IUser';
import {persistAuthUser} from '../../utils/localstorage/localstorage';

import {Text} from '@ui-kitten/components';

interface ISignIn extends NavigationInjectedProps {
  userType: string;
  userAuth: IAuth;
}

// This component corresponds to the sign in page
const SignIn: React.FunctionComponent<ISignIn> = ({
  navigation,
  userType,
  userAuth,
}: ISignIn) => {
  // Hooks
  // const [user, setAuthUser] = useAuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  //Send user to homepage if they are still in localstorage i.e signedIn
  //TODO We should have access and refresh tokens
  // useEffect(() => {
  //   if (user != null) navigation.navigate('Home');
  // }

  const signIn = async (): Promise<void> => {
    if (!this.state.email.includes('@') || this.state.password.length < 8) {
      Alert.alert('Please fill the required information before proceeding.');
      return;
    }

    try {
      const user = await userAuth.signInWithEmailAndPassword({
        email,
        password,
      });
      navigation.navigate('HomeUI');
      persistAuthUser(user);
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

  return (
    <>
      <Text style={styles.welcome} category="h4">
        Welcome!
      </Text>
      <View style={styles.signInAsAView}>
        <Text style={styles.signInToContinue}>Sign in as a </Text>
        <Text style={styles.signInUserType} category="s1">
          {userType}
        </Text>
      </View>
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
            onChangeText={(text): void => setEmail(text)}
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
            secureTextEntry={isPasswordHidden}
            placeholderTextColor={colors.appSilver}
            autoCapitalize="none"
            onChangeText={(text): void => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={(): void => setPasswordHidden(!isPasswordHidden)}>
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
      <View style={styles.signInButtonView}>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={(): void => {
            signIn();
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
          onPress={(): void => forgotPassword()}>
          <Text style={styles.forgotPasswordText} category="label">
            Forgot password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAnAccountButton}
          onPress={(): void => {
            navigation.navigate('SignUpCredentials');
          }}>
          <Text style={styles.createAccountText} category="label">
            {' '}
            Create an account{' '}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInWithGoogleButton}
          onPress={(): void => signInWithGoogle()}>
          <Image
            source={require('../../assets/images/icons/googleIcon.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.signInWithGoogleText} category="label">
            {' '}
            Sign in with Google{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default SignIn;
