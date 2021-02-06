import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import styles from './styles/SignUpSelectCampusStyles';
import 'react-native-gesture-handler';
import INavigation from '../../../model/navigation/NavigationInjectedPropsConfigured';
import IStudent from '../../../model/common/IStudent';
import StudentAuth from '../../../api/authentication/StudentAuth';
import ISignUpSelectCampusPage from '../../../model/signInSignUp/ISignUpSelectCampusPage';
import campuses from './campuses';
import IAuth from '../../../api/authentication/IAuth';
import useAuthUser from '../../../hooks/authUser';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ISignUpSelectCampus extends INavigation {
  route: any;
}

// This component corresponds to the third sign up page
const SignUpSelectCampus: React.FunctionComponent<ISignUpSelectCampus> = ({
  route,
  navigation,
}: ISignUpSelectCampus) => {
  const [universitySelection, setUniversitySelection] = useState(
    'Find your campus',
  );
  const setAuthUser = useAuthUser()[1];
  const {firstName, lastName, email, phone, password} = route.params;

  const handleSearch = (text): void => {
    setUniversitySelection(text);
    if (text === '') {
      setUniversitySelection('Find your campus');
    }
  };

  const isUniversitySelected = (): boolean => {
    if (universitySelection === 'Find your campus') {
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
    if (universitySelection !== 'Find your campus') {
      const studentAuth = new StudentAuth();
      const studentInfo: IStudent = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        campus: universitySelection,
        avatar: '',
        firebase_uid: '',
      };
      try {
        await studentAuth.registerWithEmailAndPassword(
          {email, password},
          studentInfo,
        );
      } catch (error) {
        Alert.alert(`Something went wrong signing up as a student.\n${error}`);
        return;
      }
      const auth: IAuth = new StudentAuth();
      try {
        const user = await auth.signInWithEmailAndPassword({email, password});
        setAuthUser(user);
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert(`${error}`);
        return;
      }
      return;
    }
    Alert.alert('Please select a campus first.');
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
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              marginLeft: 25,
              marginRight: 25,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.selectYourCampus}>Select your campus</Text>
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
                    placeholder: 'Search your campus...',
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
                <Text style={styles.finishText}> Finish </Text>
              </TouchableOpacity>
              <Text style={styles.footer}> go.study </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignUpSelectCampus;
