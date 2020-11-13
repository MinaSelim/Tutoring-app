import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import styles from './styles/SignUpUserTypeStyles';
import 'react-native-gesture-handler';
import INavigation from '../../../model/navigation/INavigation';
import TutorAuth from '../../../api/authentication/TutorAuth';
import ITutor from '../../../model/common/ITutor';

import ISignUpUserTypePage from '../../../model/signInSignUp/ISignUpUserTypePage';

interface IProps extends INavigation {
  route: any;
}

interface IState extends ISignUpUserTypePage {}

// This component corresponds to the second sign up page
class SignUpUserType extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.handleTutor = this.handleTutor.bind(this);
  }

  // Send the tutor's information to the back-end
  handleTutor = async (
    firstName,
    lastName,
    email,
    phone,
    password,
  ): Promise<boolean> => {
    const tutorAuth = new TutorAuth();
    const tutor: ITutor = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      avatar: '',
      firebase_uid: '',
    };
    try {
      await tutorAuth.registerWithEmailAndPassword({email, password}, tutor);
    } catch (error) {
      Alert.alert('Something went wrong signing up as a tutor.\n' + error);
      return false;
    }
    return true;
  };

  render() {
    const {route} = this.props;
    const {firstName, lastName, email, phone, password} = route.params;
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../../../assets/images/icons/signUpBackground.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          style={{position: 'absolute'}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../../assets/images/icons/backBtn.png')}
            style={styles.goBackButton}
          />
        </TouchableOpacity>
        <View
          style={{
            height: 170,
            marginBottom: 50,
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '50%',
          }}>
          <Text style={styles.iAmText}>I am a</Text>
          <TouchableOpacity
            style={styles.student}
            onPress={() => {
              this.props.navigation.navigate('SignUpSelectCampus', {
                firstName,
                lastName,
                email,
                phone,
                password,
              });
            }}>
            <Text style={styles.buttonText}> Student </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tutor}
            onPress={() => {
              if (
                this.handleTutor(firstName, lastName, email, phone, password)
              ) {
                this.props.navigation.navigate(''); // TODO Redirect to Home page
              }
            }}>
            <Text style={styles.buttonText}> Tutor </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}> go.study </Text>
      </View>
    );
  }
}

export default SignUpUserType;
