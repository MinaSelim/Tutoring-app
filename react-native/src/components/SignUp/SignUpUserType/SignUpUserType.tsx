import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import {colors} from '../../../styles/appColors';
import styles from './styles/SignUpUserTypeStyles';
import 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';
import ITutorSignUpInfo from '../../../model/ITutor'

interface IProps {
  navigation: NavigationInjectedProps;
}

interface IState {
  userType: string;
}

class SignUpUserType extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      userType: '',
    };

    this.handleTutor = this.handleTutor.bind(this);
  }

  handleTutor = (firstName, lastName, email, phone, password) => {
    var tutorInfo:ITutorSignUpInfo = { 
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      avatar: "",
      firebase_uid: "",
   } 
    //TODO Deal with password
    //TODO send above tutor info to backend
  };

  render() {
    const { route } = this.props;
    const { firstName, lastName, email, phone, password } = route.params;
    return (
      <View style={{flex: 1}}>
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
          style={{
            height: 170,
            marginBottom: 50,
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '50%',
          }}>
          <Text style={styles.iAmText}>
            I am a
          </Text>
          <TouchableOpacity
            style={styles.student}
            onPress={() => {
              this.props.navigation.navigate('SignUpSelectCampus', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password
              });
            }}>
            <Text style={{color: colors.appWhite}}> Student </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tutor}
            onPress={() => {
              this.handleTutor(firstName, lastName, email, phone, password);
              this.props.navigation.navigate('');
              //TODO Redirect to Home page
            }}>
            <Text style={{color: colors.appWhite}}> Tutor </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}> go.study </Text>
      </View>
    );
  }
}

export default SignUpUserType;
