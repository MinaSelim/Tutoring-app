import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import Login from '../../api/authentication/login'
import 'react-native-gesture-handler';

class SignIn extends Component {

    private login: Login;

    constructor(props){
        super(props);
   } 
    
    state = {
      username: '',
      password: '',
      login: ''
   }
   handleUsername = (text) => {
      this.setState({ username: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   signIn = (username, password) => {
      Alert.alert('username: ' + username + ' password: ' + password)
      //TODO: Manage states
      //TODO: Redirect to App
   }
   forgotPassword = () => {
    //TODO: Redirect to forgot password page
    }
    signInWithGoogle = () => {
        //TODO: Redirect to Google Sign In
    }
  
    render() {
    const { navigation } = this.props;
      return (
        <View style={{flex:1}}>
            <Text style = {styles.title}>go.study</Text>

            <View style = {styles.container}>

                <View style={{marginBottom: 40}}>
                    <Text style = {styles.welcome}>Welcome!</Text>

                    <Text style={styles.signInToContinue}>Sign in to continue</Text>

                    <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "username"
                    placeholderTextColor = "#8B9CB3"
                    autoCapitalize = "none"
                    onChangeText = {this.handleUsername}/>

                    <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "password"
                    placeholderTextColor = "#8B9CB3"
                    autoCapitalize = "none"
                    onChangeText = {this.handlePassword}/>
                </View>

                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                    style = {styles.signInButton}
                    onPress = {
                        () => this.signIn(this.state.username, this.state.password)
                    }>
                    <Text style = {{color: 'white'}}> Sign In </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style = {styles.forgotPasswordButton}
                    onPress = {
                        () => this.forgotPassword()
                    }>
                    <Text style = {{color: '#96A7AF', fontSize: 12}}> Forgot password? </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style = {styles.createAnAccountButton}
                    onPress={
                        () => {navigation.navigate('SignUp')}}
                    >
                    <Text style = {{color: '#E86D2C'}}> Create an account </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style = {styles.signInWithGoogleButton}
                    onPress = {
                        () => this.signInWithGoogle()
                    }>
                    <Text style = {{color: '#8B9CB3'}}> Sign in with Google </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      )
   }
}
export default SignIn

const styles = StyleSheet.create({
   container: {
        position: "absolute",
        bottom: 0,
        alignItems: 'stretch',
        width: '100%',
   },
   title: {
        position: "absolute",
        top: 10,
        right: 30,
        fontSize: 30,
        fontWeight: 'bold'
   },
   welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 18,
        marginLeft: 20
   },
   signInToContinue:{
        fontSize:20,
        marginBottom: 28,
        marginLeft: 20
   },
   input: {
        margin: 15,
        height: 40,
        borderColor: '#8B9CB3',
        borderBottomWidth: 1
   },
   signInButton: {
        backgroundColor: '#F0793A',
        margin: 5,
        height: 50,
        width: '85%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
   },
   forgotPasswordButton:{
        margin: 5,
        height: 25,
        width: '85%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
   },
   createAnAccountButton:{
        backgroundColor: '#F2AB40',
        margin: 5,
        height: 50,
        width: '85%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
   },
   signInWithGoogleButton:{
        backgroundColor: '#F1F3F8',
        margin: 5,
        marginBottom: 20,
        height: 50,
        width: '85%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
   }
})