import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import * as Actions from '../../ActionsTypes';
import {dispatch} from 'react-redux';

class SignUp2 extends Component {
  
  state = {
    userType: ''
  }
  handleStudent = () => {
    this.setState({ userType: "student" })
    dispatch({
      type: Actions.SET_USER_TYPE,
      payload: {userType: this.state.userType}
    })
  }
  handleTutor = () => {
    this.setState({ userType: "tutor" })
    dispatch({
      type: Actions.SET_USER_TYPE,
      payload: {userType: this.state.userType}
    })
  }

  render() {

    const { navigation } = this.props;

      return(
        <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center'}}>
            <View style={{height:170, marginBottom: 50, justifyContent: 'space-between', width: '100%'}}>
                <Text style={{fontSize: 18, marginLeft: '12.5%', marginBottom: 10}}>I am a</Text> 
                <TouchableOpacity
                    style = {styles.student}
                    onPress = {
                      () => {this.handleStudent()
                        navigation.navigate('SignUp3')}
                    }>
                    <Text style = {{color: 'white'}}> Student </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.tutor}
                    onPress = {
                        () => {this.handleTutor()
                        navigation.navigate('SignUp3')}
                    }>
                    <Text style = {{color: 'white'}}> Tutor </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.footer}> go.study </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({   
      student:{
        backgroundColor: '#F1AA3E',
        margin: 5,
        height: 50,
        width: '75%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      },
      tutor:{
        backgroundColor: '#F0793A',
        margin: 5,
        height: 50,
        width: '75%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      },
      footer: {
        alignSelf: 'center', 
        color: '#E9EAEE', 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10,
        position: 'absolute',
        bottom: 10
      }
  })

export default SignUp2;