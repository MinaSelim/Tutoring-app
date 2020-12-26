import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SignUpCredentials from '../pages/signUp/signUpCredentials/SignUpCredentials';
import SignUpUserType from '../pages/signUp/signUpUserType/SignUpUserType';
import SignUpSelectCampus from '../pages/signUp/signUpSelectCampus/SignUpSelectCampus';
import SignIn from '../pages/signIn/SignIn';
import HomeUI from '../pages/home/Home';
import SideBar from '../components/sideBar/SideBar';
import MyChats from '../components/myChats/MyChats';
import TutorSearch from '../pages/tutorSearch/TutorSearch';
import StudyGroupSearch from '../pages/studyGroupSearch/StudyGroupSearch';

const Stack = createStackNavigator();

class RouteStack extends Component {
  render(): JSX.Element {
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
