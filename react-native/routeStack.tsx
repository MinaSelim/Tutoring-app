import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SignUpCredentials from './src/components/signUp/signUpCredentials/SignUpCredentials';
import SignUpUserType from './src/components/signUp/signUpUserType/SignUpUserType';
import SignUpSelectCampus from './src/components/signUp/signUpSelectCampus/SignUpSelectCampus';
import SignIn from './src/components/signIn/SignIn';
import HomeUI from './src/components/home/Home';
import SideBar from './src/components/sideBar/SideBar';
import MyChats from './src/components/myChats/MyChats';
import TutorSearch from './src/components/tutorSearch/TutorSearch';
import StudyGroupSearch from './src/components/studyGroupSearch/StudyGroupSearch';

const Stack = createStackNavigator();

class RouteStack extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen
            name="SignUpCredentials"
            component={SignUpCredentials}
          />
          <Stack.Screen name="SignUpUserType" component={SignUpUserType} />
          <Stack.Screen
            name="SignUpSelectCampus"
            component={SignUpSelectCampus}
          />
          <Stack.Screen name="Home" component={HomeUI} />
          <Stack.Screen name="SideBar" component={SideBar} />
          <Stack.Screen name="MyChats" component={MyChats} />
          <Stack.Screen name="TutorSearch" component={TutorSearch} />
          <Stack.Screen name="StudyGroupSearch" component={StudyGroupSearch} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RouteStack;
