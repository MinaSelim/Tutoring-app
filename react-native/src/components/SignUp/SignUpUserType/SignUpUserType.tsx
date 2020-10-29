import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import {colors} from '../../../styles/appColors';
import styles from './styles/SignUpUserTypeStyles';
import 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';

interface IProps {
  userType: string;
  navigation: NavigationInjectedProps;
}

interface IState {
  userType: string;
}

class SignUp2 extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      userType: '',
    };

    this.handleStudent = this.handleStudent.bind(this);
    this.handleTutor = this.handleTutor.bind(this);
  }

  handleStudent = () => {
    this.setState({userType: 'Student'});
    //Send info to node.js
  };

  handleTutor = () => {
    this.setState({userType: 'Tutor'});
    //Send info to node.js
  };

  render() {
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
              this.handleStudent();
              this.props.navigation.navigate('SignUpSelectCampus');
            }}>
            <Text style={{color: colors.appWhite}}> Student </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tutor}
            onPress={() => {
              this.handleTutor();
              this.props.navigation.navigate('SignUpSelectCampus');
            }}>
            <Text style={{color: colors.appWhite}}> Tutor </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}> go.study </Text>
      </View>
    );
  }
}

export default SignUp2;
