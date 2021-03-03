import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles';
import 'react-native-gesture-handler';
import INavigation from '../../../model/navigation/NavigationInjectedPropsConfigured';
import IStudent from '../../../model/common/IStudent';
import StudentAuth from '../../../api/authentication/StudentAuth';
import campuses from '../../../pages/signup/selectCampus/campuses';
import IAuth from '../../../api/authentication/IAuth';
import useAuthUser from '../../../hooks/authUser';
import {SafeAreaView} from 'react-native-safe-area-context';
import constants from '../../../constants';
import errors from '../../../constants/errors';

interface ISignUpSelectCampus extends INavigation {
  route: any;
}

// This component corresponds to the third sign up page
const SignUpSelectCampus: React.FunctionComponent<ISignUpSelectCampus> = ({
  route,
  navigation,
}: ISignUpSelectCampus) => {
  const [universitySelection, setUniversitySelection] = useState(
    constants.signup.selectCampus.findYourCampus,
  );
  const setAuthUser = useAuthUser()[1];
  const {firstName, lastName, email, phone, password} = route.params;

  const isUniversitySelected = (): boolean => {
    if (universitySelection === constants.signup.selectCampus.findYourCampus) {
      return false;
    }
    return true;
  };

  // Send the student's information to the back-end
  const finish = async (
    firstName,
    lastName,
    email,
    phone,
    password,
  ): Promise<void> => {
    if (universitySelection !== constants.signup.selectCampus.findYourCampus) {
      const studentAuth = new StudentAuth();
      const studentInfo: IStudent = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        student_info: {
          campus: universitySelection,
          chatrooms: [],
        },
        avatar: '',
        firebase_uid: '',
      };
      try {
        await studentAuth.registerWithEmailAndPassword(
          {email, password},
          studentInfo,
        );
      } catch (error) {
        Alert.alert(`${error.signup.genericSignUp}\n${error}`);
        return;
      }
      const auth: IAuth = new StudentAuth();
      try {
        const user = await auth.signInWithEmailAndPassword({email, password});
        setAuthUser(user);
        navigation.navigate('Home');
      } catch (err) {
        Alert.alert(`${errors.signup.genericSignUp}\n${err}`);
        return;
      }
      return;
    }
    Alert.alert(errors.signup.selectCampus);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/icons/signUpBackground.png')}
      style={styles.backgroundImage}>
      <SafeAreaView style={{flex: 1, alignItems: 'stretch'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity
            style={{position: 'absolute', top: 10}}
            onPress={(): boolean => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/icons/backBtn.png')}
              style={styles.goBackButton}
            />
          </TouchableOpacity>
          <View style={styles.space}>
            <Text style={styles.selectYourCampus}>
              {' '}
              {constants.signup.selectCampus.selectYourCampus}
            </Text>
            <View
              style={{
                justifyContent: 'space-between',
                height: 200,
                marginBottom: 100,
              }}>
              <Image
                source={require('../../../assets/images/icons/university.png')}
                style={[
                  {alignSelf: 'center'},
                  isUniversitySelected() ? {opacity: 1} : {opacity: 0.25},
                ]}
              />
              <Text style={styles.universityText}>{universitySelection}</Text>
              <View>
                <SearchableDropdown
                  onItemSelect={(item): void => {
                    let campus = JSON.stringify(item.name);
                    campus = JSON.parse(
                      campus.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'),
                    );
                    setUniversitySelection(campus);
                  }}
                  containerStyle={{padding: 5}}
                  itemStyle={styles.listText}
                  itemTextStyle={{color: '#222'}}
                  itemsContainerStyle={{maxHeight: 150}}
                  items={campuses}
                  resetValue={false}
                  textInputProps={{
                    placeholder:
                      constants.signup.selectCampus.placeHolders.searchCampus,
                    underlineColorAndroid: 'transparent',
                    style: styles.inputBox,
                  }}
                  listProps={{
                    nestedScrollEnabled: true,
                  }}
                />
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.finishButton}
                onPress={(): void => {
                  finish(firstName, lastName, email, phone, password);
                }}>
                <Text style={styles.finishText}>
                  {constants.signup.selectCampus.finish}
                </Text>
              </TouchableOpacity>
              <Text style={styles.footer}> {constants.common.goStudy}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUpSelectCampus;
