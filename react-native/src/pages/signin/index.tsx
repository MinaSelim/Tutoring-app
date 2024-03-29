import {View, TouchableOpacity, TextInput, Image, Alert} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {colors} from '../../styles/appColors';
import 'react-native-gesture-handler';
import IAuth from '../../api/authentication/IAuth';
import useAuthUser from '../../hooks/authUser';
import {Text} from '@ui-kitten/components';
import constants from '../../constants';

interface ISignIn extends NavigationInjectedProps {
  userType: string;
  userAuth: IAuth;
}

const SignIn: React.FunctionComponent<ISignIn> = ({
  navigation,
  userType,
  userAuth,
}: ISignIn) => {
  // Hooks
  const [user, setAuthUser] = useAuthUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  useEffect(() => {
    if (user != null) navigation.navigate('HomeDrawer');
  });

  const signIn = async (): Promise<void> => {
    if (!email.includes('@') || password.length < 8) {
      Alert.alert('Please fill the required information before proceeding.');
      return;
    }

    try {
      const userFromBackend = await userAuth.signInWithEmailAndPassword({
        email,
        password,
      });
      setAuthUser(userFromBackend);
      if (userFromBackend) navigation.navigate('HomeDrawer');
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  const forgotPassword = (): void => {
    navigation.navigate('PasswordReset');
  };

  const signInWithGoogle = (): void => {
    // TODO: Redirect to Google Sign In
  };

  return (
    <>
      <Text style={styles.welcome} category="h4">
        {constants.signin.welcome}
      </Text>
      <View style={styles.signInAsAView}>
        <Text style={styles.signInToContinue}>{constants.signin.signInAs}</Text>
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
            {' ' + constants.signin.signIn + ' '}
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
            {constants.signin.forgotPassword}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAnAccountButton}
          onPress={(): void => {
            navigation.navigate('SignUpCredentials');
          }}>
          <Text style={styles.createAccountText} category="label">
            {' ' + constants.signin.createAccount + ' '}
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
            {' ' + constants.signin.signInWithGoogle + ' '}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default SignIn;
