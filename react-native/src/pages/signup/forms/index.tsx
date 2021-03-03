import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../../styles/appColors';
import styles from './styles';
import 'react-native-gesture-handler';
import INavigation from '../../../model/navigation/NavigationInjectedPropsConfigured';
import errorMessages from '../../../constants/errors';
import constants from '../../../constants';

interface ISignUpCredentials extends INavigation {}

// This component corresponds to the first sign up page
const SignUpCredentials: React.FunctionComponent<ISignUpCredentials> = ({
  navigation,
}: ISignUpCredentials) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);

  // alert the user if some inputs are invalid
  const alertMandatoryFields = (): void => {
    if (!email.includes('@')) {
      Alert.alert(errorMessages.signup.invalidEmail);
    } else if (password.length < 8) {
      Alert.alert(errorMessages.signup.invalidPassword);
    } else if (password !== confirmPassword) {
      Alert.alert(errorMessages.signup.noMatchingPassword);
    } else {
      Alert.alert(errorMessages.signup.missingManadatoryFields);
    }
  };

  // check if all inputs are valid before moving to next page
  const isInputValid = (): boolean => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      !email.includes('@') ||
      password.length < 8 ||
      password !== confirmPassword
    ) {
      return false;
    }

    return true;
  };

  const signInWithGoogle = (): void => {
    // TODO: Redirect to Google sign-in
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/icons/signUpBackground.png')}
      style={styles.backgroundImage}>
      <SafeAreaView style={{flex: 1, alignItems: 'stretch'}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <TouchableOpacity
            style={{position: 'absolute'}}
            onPress={(): boolean => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/icons/backBtn.png')}
              style={styles.goBackButton}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 0.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.signUpText}>Sign up</Text>
          </View>
          <ScrollView contentContainerStyle={{flex: 1}}>
            <View style={styles.inputSection}>
              <Text style={[styles.star]}>*</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={constants.signup.forms.placeHolders.firstName}
                placeholderTextColor={colors.appSilver}
                onChangeText={(text): void => setFirstName(text)}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={[styles.star]}>*</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={constants.signup.forms.placeHolders.lastName}
                placeholderTextColor={colors.appSilver}
                onChangeText={(text): void => setLastName(text)}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={[styles.star]}>*</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={constants.signup.forms.placeHolders.email}
                placeholderTextColor={colors.appSilver}
                onChangeText={(text): void => setEmail(text)}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={{opacity: 0}}>*</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={constants.signup.forms.placeHolders.phone}
                placeholderTextColor={colors.appSilver}
                onChangeText={(text): void => setPhone(text)}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={[styles.star]}>*</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={constants.signup.forms.placeHolders.password}
                secureTextEntry={passwordHidden}
                placeholderTextColor={colors.appSilver}
                onChangeText={(text): void => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={(): void => setPasswordHidden(!passwordHidden)}>
                <Image
                  source={
                    passwordHidden
                      ? require('../../../assets/images/icons/eyeClosed.png')
                      : require('../../../assets/images/icons/eyeOpened.png')
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.inputSection}>
              <Text style={[styles.star]}>*</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={
                  constants.signup.forms.placeHolders.confirmPassword
                }
                secureTextEntry={passwordHidden}
                placeholderTextColor={colors.appSilver}
                onChangeText={(text): void => setConfirmPassword(text)}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={(): void => setPasswordHidden(!passwordHidden)}>
                <Image
                  source={
                    passwordHidden
                      ? require('../../../assets/images/icons/eyeClosed.png')
                      : require('../../../assets/images/icons/eyeOpened.png')
                  }
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.space}>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={(): void => {
                isInputValid()
                  ? navigation.navigate('SignUpUserType', {
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                      phone: phone,
                      password: password,
                    })
                  : alertMandatoryFields();
              }}>
              <Text style={styles.nextText}>
                {' '}
                {constants.signup.forms.next}{' '}
              </Text>
              <Image
                source={require('../../../assets/images/icons/nextArrow.png')}
                style={styles.nextArrow}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInWithGoogleButton}
              onPress={(): void => signInWithGoogle()}>
              <Image
                source={require('../../../assets/images/icons/googleIcon.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.signInWithGoogleText}>
                {' '}
                {constants.signup.forms.signInWithGoogle}{' '}
              </Text>
            </TouchableOpacity>
            <Text style={styles.footer}>{constants.common.goStudy}</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUpCredentials;
