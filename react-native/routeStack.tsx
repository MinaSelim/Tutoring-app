import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SignUpCredentials from './src/pages/signup/forms';
import SignUpUserType from './src/pages/signup/userType';
import SignUpSelectCampus from './src/pages/signup/selectCampus/index';
import SignInMenu from './src/pages/signin/SignInMenu';
import HomeUI from './src/pages/home';
import SideBar from './src/components/common/sideBar';
import chatInbox from './src/pages/chatInbox';
import TutorSearch from './src/components/tutorSearch/TutorSearch';
import StudyGroupSearch from './src/components/studyGroupSearch/StudyGroupSearch';
import ChatUI from './src/components/chat/ChatUI';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeNavigation: React.FunctionComponent = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props): React.ReactElement => <SideBar props={props} />}
      initialRouteName="Home"
      drawerType="slide">
      <Drawer.Screen name="Home" component={HomeUI} />
    </Drawer.Navigator>
  );
};
const StackNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="SignInMenu">
      <Stack.Screen name="SignInMenu" component={SignInMenu} />
      <Stack.Screen name="SignUpCredentials" component={SignUpCredentials} />
      <Stack.Screen name="SignUpUserType" component={SignUpUserType} />
      <Stack.Screen name="SignUpSelectCampus" component={SignUpSelectCampus} />
      <Stack.Screen name="Home" component={HomeNavigation} />
      <Stack.Screen name="MyChats" component={chatInbox} />
      <Stack.Screen name="TutorSearch" component={TutorSearch} />
      <Stack.Screen name="StudyGroupSearch" component={StudyGroupSearch} />
      <Stack.Screen name="ChatUI" component={ChatUI} />
    </Stack.Navigator>
  );
};

//custom transparent theme used for the Navigation Container Screens
const Transparent = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgb(0, 0, 0,0)',
  },
};
class RouteStack extends Component {
  render(): React.ReactNode {
    return (
      <NavigationContainer theme={Transparent}>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}

export default RouteStack;
