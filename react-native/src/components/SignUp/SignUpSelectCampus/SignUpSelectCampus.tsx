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
import {colors} from '../../../styles/appColors';
import 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';
import IStudent from '../../../model/common/IStudent' 
import StudentAuth from '../../../api/authentication/StudentAuth';

interface IProps {
  navigation: NavigationInjectedProps;
}

interface IState {
  university: string;
}

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

  handleSearch = (text) => {
    this.setState({university: text});

    if (text === '') {
      this.setState({university: 'Find your campus'});
    }
  };

  isUniversitySelected() {
    if (this.state.university === 'Find your campus') {
      return false;
    } else {
      return true;
    }
  }

  alertMandatoryField() {
    Alert.alert('Please select a campus first.');
  }

  finish = async (firstName, lastName, email, phone, password) => {
    if (this.state.university !== 'Find your campus') {
      let studentAuth = new StudentAuth();
      var studentInfo:IStudent = { 
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        campus: this.state.university,
        avatar: "",
        firebase_uid: "",
     } 
     try{
      await studentAuth.registerWithEmailAndPassword({email:email, password:password}, studentInfo);
    }catch(error){
      Alert.alert("Something went wrong signing up as a student.")
    }
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { route } = this.props;
    const { firstName, lastName, email, phone, password } = route.params;
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ImageBackground
          source={require('../../../assets/images/signUpBackground.png')}
          style={styles.backgroundImage}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 10}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backBtn.png')}
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
          <Text style={styles.selectYourCampus}>
            Select your campus
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              height: 200,
              marginBottom: 100,
            }}>
            <Image
              source={require('../../../assets/images/university.png')}
              style={[
                {alignSelf: 'center'},
                this.isUniversitySelected() ? {opacity: 1} : {opacity: 0.25},
              ]}
            />
            <Text style={styles.universityText}>
              {this.state.university}
            </Text>
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
            onPress={() =>
              {this.finish(firstName, lastName, email, phone, password)
                ? this.props.navigation.navigate('') 
                //TODO Redirect to Home page
                : this.alertMandatoryField();
              }}>
            <Text style={{color: colors.appWhite}}> Finish </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}> go.study </Text>
      </View>
    );
  }
}

export default SignUpSelectCampus;