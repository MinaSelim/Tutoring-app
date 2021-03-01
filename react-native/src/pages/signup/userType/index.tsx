import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import styles from './styles';
import 'react-native-gesture-handler';
import INavigation from '../../../model/navigation/NavigationInjectedPropsConfigured';
import TutorAuth from '../../../api/authentication/TutorAuth';
import ITutor from '../../../model/common/ITutor';
import IAuth from '../../../api/authentication/IAuth';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps extends INavigation {
  route: any;
}

// This component corresponds to the second sign up page
class SignUpUserType extends Component<IProps> {
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
  ): Promise<void> => {
    const tutorAuth = new TutorAuth();
    const tutor: ITutor = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      avatar: '',
      firebase_uid: '',
      tutor_info: {
        campuses: [],
        chatrooms: [],
      },
    };
    try {
      await tutorAuth.registerWithEmailAndPassword({email, password}, tutor);
    } catch (error) {
      Alert.alert(`Something went wrong signing up as a tutor.\n${error}`);
      return;
    }
    const auth: IAuth = new TutorAuth();
    try {
      const user = await auth.signInWithEmailAndPassword({email, password});
      this.props.navigation.navigate('Home');
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  render(): JSX.Element {
    const {route} = this.props;
    const {firstName, lastName, email, phone, password} = route.params;
    return (
      <ImageBackground
        source={require('../../../assets/images/icons/signUpBackground.png')}
        style={styles.backgroundImage}>
        <SafeAreaView style={{flex: 1, alignItems: 'stretch'}}>
          <View style={{flex: 1}}>
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
                height: 170,
                marginBottom: 50,
                justifyContent: 'space-between',
                width: '100%',
                marginTop: '50%',
              }}>
              <Text style={styles.iAmText}>I am a</Text>
              <TouchableOpacity
                style={styles.student}
                onPress={(): void => {
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
                onPress={(): void => {
                  this.handleTutor(firstName, lastName, email, phone, password);
                }}>
                <Text style={styles.buttonText}> Tutor </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.footer}> go.study </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default SignUpUserType;
