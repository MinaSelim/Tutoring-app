import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import styles from './styles/SignUpSelectCampusStyles';
import 'react-native-gesture-handler';
import INavigation from '../../../model/navigation/INavigation';
import IStudent from '../../../model/common2/IStudent';
import StudentAuth from '../../../api/authentication/StudentAuth';
import ISignUpSelectCampusPage from '../../../model/signInSignUp/ISignUpSelectCampusPage';

interface IProps extends INavigation {}

interface IState extends ISignUpSelectCampusPage {}

//This component corresponds to the third sign up page
class SignUpSelectCampus extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      university: 'Find your campus',
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.isUniversitySelected = this.isUniversitySelected.bind(this);
    this.finish = this.finish.bind(this);
  }

  handleSearch = (text): void => {
    this.setState({university: text});

    if (text === '') {
      this.setState({university: 'Find your campus'});
    }
  };

  isUniversitySelected = (): boolean => {
    if (this.state.university === 'Find your campus') {
      return false;
    } else {
      return true;
    }
  };

  //Send the student's information to the back-end
  finish = async (
    firstName,
    lastName,
    email,
    phone,
    password,
  ): Promise<boolean> => {
    if (this.state.university !== 'Find your campus') {
      let studentAuth = new StudentAuth();
      var studentInfo: IStudent = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        campus: this.state.university,
        avatar: '',
        firebase_uid: '',
      };
      try {
        await studentAuth.registerWithEmailAndPassword(
          {email: email, password: password},
          studentInfo,
        );
      } catch (error) {
        Alert.alert('Something went wrong signing up as a student.');
        return false;
      }
      return true;
    } else {
      Alert.alert('Please select a campus first.');
      return false;
    }
  };

  render() {
    const {route} = this.props;
    const {firstName, lastName, email, phone, password} = route.params;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ImageBackground
          source={require('../../../assets/images/icons/signUpBackground.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 10}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../../assets/images/icons/backBtn.png')}
            style={styles.goBackButton}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            marginBottom: 50,
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
                this.isUniversitySelected() ? {opacity: 1} : {opacity: 0.25},
              ]}
            />
            <Text style={styles.universityText}>{this.state.university}</Text>
            <View>
              <TextInput
                placeholder="Add University..."
                style={styles.inputBox}
                onChangeText={this.handleSearch}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => {
              this.finish(firstName, lastName, email, phone, password)
                ? this.props.navigation.navigate('') //TODO Redirect to Home page
                : true;
            }}>
            <Text style={styles.finishText}> Finish </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}> go.study </Text>
      </View>
    );
  }
}

export default SignUpSelectCampus;
