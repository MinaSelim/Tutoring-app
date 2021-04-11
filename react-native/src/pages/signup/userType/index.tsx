import React from 'react';
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
import useAuthUser from '../../../hooks/authUser';
import constant from '../../../constants';

interface ISignUpUserType extends INavigation {
  route: any;
}

// This component corresponds to the second sign up page
const SignUpUserType: React.FunctionComponent<ISignUpUserType> = ({
  route,
  navigation,
}: ISignUpUserType) => {
  const setAuthUser = useAuthUser()[1];
  const {firstName, lastName, email, phone, password} = route.params;
  // Send the tutor's information to the back-end
  const handleTutor = async (): Promise<void> => {
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
      setAuthUser(user);
      navigation.navigate('HomeDrawer');
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/icons/signUpBackground.png')}
      style={styles.backgroundImage}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.bigView}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={(): boolean => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/icons/backBtn.png')}
              style={styles.goBackButton}
            />
          </TouchableOpacity>
          <View style={styles.space}>
            <Text style={styles.iAmText}>
              {constant.signup.userType.identity}
            </Text>
            <TouchableOpacity
              style={styles.student}
              onPress={(): void => {
                navigation.navigate('SignUpSelectCampus', {
                  firstName,
                  lastName,
                  email,
                  phone,
                  password,
                });
              }}>
              <Text style={styles.buttonText}>
                {constant.signup.userType.student}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tutor}
              onPress={(): void => {
                handleTutor();
              }}>
              <Text style={styles.buttonText}>
                {constant.signup.userType.tutor}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footer}>{constant.common.BookingApp}</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUpUserType;
