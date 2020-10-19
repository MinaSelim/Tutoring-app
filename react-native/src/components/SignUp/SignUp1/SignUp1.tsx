import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import 'react-native-gesture-handler';
import * as Actions from '../../ActionsTypes';
import {dispatch} from 'react-redux';

class SignUp extends Component {

    constructor(props){
        super(props);

        this.saveInfo.bind(this);
    }

    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
     }
     
     handleFirstName = (text) => {
        this.setState({ firstName: text })
     }
     
     handleLastName = (text) => {
        this.setState({ lastName: text })
     }
     
     handleEmail = (text) => {
        this.setState({ email: text })
     }
     
     handlePhone = (text) => {
        this.setState({ phone: text })
     }
     
     handlePassword = (text) => {
        this.setState({ password: text })
     }
     
     saveInfo() {
        dispatch({
            type: Actions.SET_FIRST_NAME,
            payload: {firstName: this.state.firstName}
        },
        {
            type: Actions.SET_LAST_NAME,
            payload: {lastName: this.state.lastName}
        },
        {
            type: Actions.SET_EMAIL,
            payload: {email: this.state.email}
        },
        {
            type: Actions.SET_PHONE,
            payload: {phone: this.state.phone}
        },
        {
            type: Actions.SET_PASSWORD,
            payload: {password: this.state.password}
        }
        )
    }
    
    signInWithGoogle = () => {
        //TODO: Redirect to Google sign-in
    }

    render() {
        const { navigation } = this.props;
      return(
        <View style={{flex: 1, backgroundColor: '#FFFFFF', alignItems: 'stretch'}}>
            <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 36, fontWeight: 'bold'}}>
                    Sign up
                </Text>
            </View>
            <View style={{flex: 1}}>
                <View style={styles.inputSection}>
                    <Text style={[styles.text]}>
                        First Name <Text style={[styles.star]}>*</Text>
                    </Text>
                    <TextInput style={styles.inputBox} onChangeText = {this.handleFirstName}/>
                </View>
                <View style={styles.inputSection}>
                    <Text style={[styles.text]}>
                        Last Name <Text style={[styles.star]}>*</Text>
                    </Text>
                    <TextInput style={styles.inputBox} onChangeText = {this.handleLastName}/>
                </View>
                <View style={styles.inputSection}>
                    <Text style={[styles.text]}>
                        Email <Text style={[styles.star]}>*</Text>
                    </Text>
                    <TextInput style={styles.inputBox} onChangeText = {this.handleEmail}/>
                </View>
                <View style={styles.inputSection}>
                    <Text style={[styles.text]}>
                        Phone <Text style={[styles.star]}>*</Text>
                    </Text>
                    <TextInput style={styles.inputBox} onChangeText = {this.handlePhone}/>
                </View>
                <View style={styles.inputSection}>
                <Text style={[styles.text]}>
                        Password <Text style={[styles.star]}>*</Text>
                    </Text>
                    <TextInput style={styles.inputBox} onChangeText = {this.handlePassword}/>
                </View>
            </View>
            <View style={{flex: 0.5, marginLeft: '5%', marginRight: '5%', 
            justifyContent: 'space-around', alignItems: 'center'}}>
                <TouchableOpacity
                    style = {styles.nextButton}
                    onPress = {
                        () => {this.saveInfo()
                        navigation.navigate('SignUp2')}
                    }>
                    <Text style = {{color: 'white'}}> Next </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style = {styles.signInWithGoogleButton}
                    onPress = {
                        () => this.signInWithGoogle()
                    }>
                    <Text style = {{color: '#8B9CB3'}}> Sign in with Google </Text>
                </TouchableOpacity>
                <Text style={styles.footer}>go.study</Text> 
            </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({   
    text: {                       
        fontSize: 18,
        color: '#8B9CB3'
    },
    star: {
        color: '#E86D2C'
    },
    inputSection: {
        flex: 1, 
        marginLeft: '5%', 
        marginRight: '5%',
    },
    inputBox: {
        borderColor: '#979797', 
        borderBottomWidth: 1, 
        width: '100%', 
        height: 30
    },
    nextButton: {
        backgroundColor: '#F1AA3E',
        margin: 5,
        height: 50,
        width: '85%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signInWithGoogleButton: {
        backgroundColor: '#F1F3F8',
        margin: 5,
        marginBottom: 10,
        height: 50,
        width: '85%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        alignSelf: 'center', 
        color: '#E9EAEE', 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 10
    }
  })

export default SignUp;