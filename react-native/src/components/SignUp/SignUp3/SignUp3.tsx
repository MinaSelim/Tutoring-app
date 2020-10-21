import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground, Image, Alert} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationInjectedProps} from 'react-navigation';

interface IProps {
  university: string,
  navigation: NavigationInjectedProps
}

interface IState {
  university: string
}

class SignUp3 extends Component<IProps, IState> {

  constructor(props){
    super(props);

    this.state = {
      university: 'Find your campus'
      }
  
    this.handleAddUniversity = this.handleAddUniversity.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.isUniversitySelected = this.isUniversitySelected.bind(this);
    this.finish = this.finish.bind(this);
  }

  handleAddUniversity(){
      //send info to node.js
  }

  handleSearch = (text) => {
    this.setState({ university: text })

    if(text==='')
      this.setState({ university: 'Find your campus' })
  }

  isUniversitySelected(){
    if(this.state.university==='Find your campus')
      return false;
    else
      return true;
  }

  alertMandatoryField(){
    Alert.alert("Please select a campus first.");
  }

  finish = () => {
    if(this.isUniversitySelected){
      this.handleAddUniversity();
      return true;
    }
    else
      return false;
  }

  render() {
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ImageBackground source={require('../../../assets/images/signUpBackground.png')} style={{width: '100%', height: '100%', position: 'absolute'}}/>
          <TouchableOpacity style={{position: 'absolute', top: 10}} onPress = {() => this.props.navigation.goBack()}>
              <Image source={require('../../../assets/images/backBtn.png')} style={{width:40, height:30, left: 10, top: 3}} />
          </TouchableOpacity>
          <View style={{flex:1, marginBottom: 50, marginLeft: 25, marginRight: 25, justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20, marginLeft: 20, marginTop: 70}}>Select your campus</Text> 
              <View style={{justifyContent:'space-between', height: 200, marginBottom: 100}}>
                <Image source={require('../../../assets/images/university.png')} style={[{alignSelf: 'center'}, this.isUniversitySelected() ?
                  { opacity: 1 } : { opacity: 0.25 }]}/> 
                  <Text style={{alignSelf:'center', fontSize: 22}}>{this.state.university}</Text>
                  <View>
                    <TextInput
                    placeholder="Add University..."
                    style={styles.inputBox}
                    onChangeText = {this.handleSearch}
                    onSubmitEditing = {this.handleAddUniversity}
                    />
                  </View>
              </View>
              <TouchableOpacity
                style = {styles.finishButton}
                onPress = {
                    () => this.finish() ? this.props.navigation.navigate('') : this.alertMandatoryField()
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
    borderColor: '#F0793A', 
    borderWidth: 2, 
    borderRadius: 9,
    width: '90%', 
    height: 40,
    alignSelf: 'center',
  },
  finishButton: {
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
  },
  image:{
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  icon: {
    width:20,
    height: 20,
  }
  })

export default SignUp3;