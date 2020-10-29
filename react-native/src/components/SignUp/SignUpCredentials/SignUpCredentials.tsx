import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {colors} from '../../../styles/appColors';
import styles from './styles/SignUpCredentialsStyles'
import 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';
import {signUpInfo} from '../SignUpInfo'
import ISignUpCredentials from '../../../model/ISignUpCredentials'


interface IProps {
  navigation: NavigationInjectedProps;
}

interface IState extends ISignUpCredentials {
  confirmPassword: string;
  passwordHidden: boolean;
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
      confirmPassword: '',
      passwordHidden: true,
    };

    this.saveInfo = this.saveInfo.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
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

  handleConfirmPassword = (text) => {
    this.setState({confirmPassword: text});
  };

  changePasswordVisibility = () => {
    this.setState({passwordHidden: !this.state.passwordHidden})
  };

  alertMandatoryFields() {
    if(!this.state.email.includes("@")){
      Alert.alert('Make sure email is valid.');
    } else if(this.state.password.length < 8){
      Alert.alert('Password must be at least 8 characters.');
    }else if(this.state.password !== this.state.confirmPassword){
      Alert.alert('Password does not match password confirmation.');
    }else{
      Alert.alert('Fields with * are mandatory.');
    }
  }

  saveInfo() {
    if (
      (this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.email === '' ||
      this.state.password === '') ||
      !this.state.email.includes("@") ||
      this.state.password.length < 8 ||
      this.state.password !== this.state.confirmPassword
    ) {
      return false;
    }
  
  signUpInfo.first_name = this.state.firstName
  signUpInfo.last_name = this.state.lastName
  signUpInfo.email = this.state.email
  signUpInfo.password = this.state.password
  signUpInfo.phone = this.state.phone
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
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          style={{position: 'absolute'}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backBtn.png')}
            style={styles.goBackButton}
          />
        </TouchableOpacity>
        <View
          style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.signUpText}>Sign up</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="First Name"
              placeholderTextColor={colors.appSilver}
              onChangeText={this.handleFirstName}
            />
          </View>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Last Name"
              placeholderTextColor={colors.appSilver}
              onChangeText={this.handleLastName}
            />
          </View>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Email"
              placeholderTextColor={colors.appSilver}
              onChangeText={this.handleEmail}
            />
          </View>
          <View style={styles.inputSection}>
          <Text style={{opacity: 0}}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Phone"
              placeholderTextColor={colors.appSilver}
              onChangeText={this.handlePhone}
            />
          </View>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Password"
              secureTextEntry={this.state.passwordHidden}
              placeholderTextColor={colors.appSilver}
              onChangeText={this.handlePassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={this.changePasswordVisibility}>
              <Image
              source={this.state.passwordHidden?require('../../../assets/images/eyeClosed.png'):require('../../../assets/images/eyeOpened.png')}
              style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputSection}>
            <Text style={[styles.star]}>*</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Confirm Password"
              secureTextEntry={this.state.passwordHidden}
              placeholderTextColor={colors.appSilver}
              onChangeText={this.handleConfirmPassword}
            />
            <TouchableOpacity style={styles.eyeButton} onPress={this.changePasswordVisibility}>
              <Image
              source={this.state.passwordHidden?require('../../../assets/images/eyeClosed.png'):require('../../../assets/images/eyeOpened.png')}
              style={styles.eyeIcon}
              />
            </TouchableOpacity>
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
                ? this.props.navigation.navigate('SignUpUserType')
                : this.alertMandatoryFields();
            }}>
            <Text style={{color: colors.appWhite}}> Next </Text>
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
            <Text style={{color: colors.appSilver}}> Sign in with Google </Text>
          </TouchableOpacity>
          <Text style={styles.footer}>go.study</Text>
        </View>
      </View>
    );
  }
}

export default SignUp;
