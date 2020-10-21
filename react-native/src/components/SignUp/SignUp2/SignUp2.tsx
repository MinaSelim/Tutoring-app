import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
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
          style={{width: '100%', height: '100%', position: 'absolute'}}
        />
        <TouchableOpacity
          style={{position: 'absolute'}}
          onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../../../assets/images/backBtn.png')}
            style={{width: 40, height: 30, left: 10, top: 10}}
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
          <Text style={{fontSize: 18, marginLeft: '12.5%', marginBottom: 10}}>
            I am a
          </Text>
          <TouchableOpacity
            style={styles.student}
            onPress={() => {
              this.handleStudent();
              this.props.navigation.navigate('SignUp3');
            }}>
            <Text style={{color: 'white'}}> Student </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tutor}
            onPress={() => {
              this.handleTutor();
              this.props.navigation.navigate('SignUp3');
            }}>
            <Text style={{color: 'white'}}> Tutor </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footer}> go.study </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  student: {
    backgroundColor: '#E86D2C',
    margin: 5,
    height: 50,
    width: '75%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tutor: {
    backgroundColor: '#5F5F5F',
    margin: 5,
    height: 50,
    width: '75%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  footer: {
    alignSelf: 'center',
    color: '#E9EAEE',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    position: 'absolute',
    bottom: 10,
  },
});

export default SignUp2;
