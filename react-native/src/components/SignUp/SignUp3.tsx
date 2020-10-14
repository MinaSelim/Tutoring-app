import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground} from 'react-native';
import 'react-native-gesture-handler';

class SignUp3 extends Component {

  state = {
    search: '',
    university: ''
  }
  handleSearch = (text) => {
    this.setState({ search: text })
  }
  handleUniversity = () => {
    this.state.university = this.state.search;
  }
  finish = () => {
    //Go to Home page
  }

  render() {
    const { navigation } = this.props;
      return(
        <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center'}}>
          <View style={{flex:0.8, marginBottom: 50, marginLeft: 25, marginRight: 25, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20, marginLeft: 20}}>Find your campus</Text> 
              <View>
                  <Text style={{alignSelf:'center'}}>{this.state.university}</Text>
                  <View>
                    <TextInput
                    placeholder="Add University..."
                    style={styles.inputBox}
                    onChangeText = {this.handleSearch}
                    onSubmitEditing = {this.handleUniversity}
                    />
                  </View>
              </View>
              <TouchableOpacity
                style = {styles.finishButton}
                onPress = {
                    () => this.finish()
                }>
                <Text style = {{color: 'white'}}> Finish </Text>
              </TouchableOpacity>
          </View>
          <Text style={styles.footer}> go.study </Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({   
  inputBox: {
    borderColor: '#F2AC41', 
    borderWidth: 2, 
    borderRadius: 9,
    width: '90%', 
    height: 30,
    alignSelf: 'center'
  },
  finishButton: {
    backgroundColor: '#F1AA3E',
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
  },
  image:{
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
  })

export default SignUp3;