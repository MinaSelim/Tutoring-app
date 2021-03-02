import React, {Component} from 'react';
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
import styles from '../../../components/signUp/signUpCredentials/styles/SignUpCredentialsStyles';
import 'react-native-gesture-handler';
import INavigation from '../../../model/navigation/NavigationInjectedPropsConfigured';
import ISignUpCredentialsPage from '../../../model/signInSignUp/ISignUpCredentialsPage';
import errorMessages from '../../../constants/errors';
import constants from '../../../constants';

interface IState extends ISignUpCredentialsPage {}

// This component corresponds to the first sign up page
class SignUpCredentials extends Component<INavigation, IState> {
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      passwordHidden: true,
    };

    this.isInputValid = this.isInputValid.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.alertMandatoryFields = this.alertMandatoryFields.bind(this);
  }

  handleFirstName = (text): void => {
    this.setState({first_name: text});
  };

  handleLastName = (text): void => {
    this.setState({last_name: text});
  };

  handleEmail = (text): void => {
    this.setState({email: text});
  };

  handlePhone = (text): void => {
    this.setState({phone: text});
  };

  handlePassword = (text): void => {
    this.setState({password: text});
  };

  handleConfirmPassword = (text): void => {
    this.setState({confirmPassword: text});
  };

  changePasswordVisibility = (): void => {
    this.setState((prevState) => ({passwordHidden: !prevState.passwordHidden}));
  };

  // alert the user if some inputs are invalid
  alertMandatoryFields = (): void => {
    if (!this.state.email.includes('@')) {
      Alert.alert(errorMessages.signup.invalidEmail);
    } else if (this.state.password.length < 8) {
      Alert.alert(errorMessages.signup.invalidPassword);
    } else if (this.state.password !== this.state.confirmPassword) {
      Alert.alert(errorMessages.signup.noMatchingPassword);
    } else {
      Alert.alert(errorMessages.signup.missingManadatoryFields);
    }
  };

  // check if all inputs are valid before moving to next page
  isInputValid = (): boolean => {
    if (
      this.state.first_name === '' ||
      this.state.last_name === '' ||
      this.state.email === '' ||
      this.state.password === '' ||
      !this.state.email.includes('@') ||
      this.state.password.length < 8 ||
      this.state.password !== this.state.confirmPassword
    ) {
      return false;
    }

    return true;
  };

  signInWithGoogle = (): void => {
    // TODO: Redirect to Google sign-in
  };

  render(): JSX.Element {
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
              onPress={(): boolean => this.props.navigation.goBack()}>
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
                  onChangeText={this.handleFirstName}
                />
              </View>
              <View style={styles.inputSection}>
                <Text style={[styles.star]}>*</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder={constants.signup.forms.placeHolders.lastName}
                  placeholderTextColor={colors.appSilver}
                  onChangeText={this.handleLastName}
                />
              </View>
              <View style={styles.inputSection}>
                <Text style={[styles.star]}>*</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder={constants.signup.forms.placeHolders.email}
                  placeholderTextColor={colors.appSilver}
                  onChangeText={this.handleEmail}
                />
              </View>
              <View style={styles.inputSection}>
                <Text style={{opacity: 0}}>*</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder={constants.signup.forms.placeHolders.phone}
                  placeholderTextColor={colors.appSilver}
                  onChangeText={this.handlePhone}
                />
              </View>
              <View style={styles.inputSection}>
                <Text style={[styles.star]}>*</Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder={constants.signup.forms.placeHolders.password}
                  secureTextEntry={this.state.passwordHidden}
                  placeholderTextColor={colors.appSilver}
                  onChangeText={this.handlePassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={this.changePasswordVisibility}>
                  <Image
                    source={
                      this.state.passwordHidden
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
                  secureTextEntry={this.state.passwordHidden}
                  placeholderTextColor={colors.appSilver}
                  onChangeText={this.handleConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={this.changePasswordVisibility}>
                  <Image
                    source={
                      this.state.passwordHidden
                        ? require('../../../assets/images/icons/eyeClosed.png')
                        : require('../../../assets/images/icons/eyeOpened.png')
                    }
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
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
                onPress={(): void => {
                  this.isInputValid()
                    ? this.props.navigation.navigate('SignUpUserType', {
                        firstName: this.state.first_name,
                        lastName: this.state.last_name,
                        email: this.state.email,
                        phone: this.state.phone,
                        password: this.state.password,
                      })
                    : this.alertMandatoryFields();
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
                onPress={(): void => this.signInWithGoogle()}>
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
  }
}

export default SignUpCredentials;
