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
import {studentSignUpInfo} from '../StudentSignUpInfo'

interface IProps {
  navigation: NavigationInjectedProps;
}

interface IState {
  university: string;
}

class SignUp3 extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      university: 'Find your campus',
    };

    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.isUniversitySelected = this.isUniversitySelected.bind(this);
    this.finish = this.finish.bind(this);
  }

  handleRegistration() {
    //TODO send student info to backend
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

  finish = () => {
    if (this.state.university !== 'Find your campus') {
      studentSignUpInfo.campus = this.state.university;
      this.handleRegistration();
      return true;
    } else {
      return false;
    }
  };

  render() {
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
                onSubmitEditing={this.handleRegistration}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() =>
              {this.finish()
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

export default SignUp3;
