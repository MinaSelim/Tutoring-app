import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SignUpCredentials from './src/pages/signup/forms/SignUpCredentials';
import SignUpUserType from './src/pages/signup/userType';
import SignUpSelectCampus from './src/components/signUp/signUpSelectCampus/SignUpSelectCampus';
import SignInMenu from './src/pages/signin/SignInMenu';
import HomeUI from './src/pages/home';
import SideBar from './src/components/common/sideBar';
import MyChats from './src/pages/chatInbox';
import TutorSearch from './src/components/tutorSearch/TutorSearch';
import StudyGroupSearch from './src/components/studyGroupSearch/StudyGroupSearch';
import ChatUI from './src/components/chat/ChatUI';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const DrawerNavigator: React.FunctionComponent = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props): React.ReactElement => <SideBar props={props} />}
      initialRouteName="SignInMenu"
      drawerType="slide">
      <Drawer.Screen name="SignInMenu" component={SignInMenu} />
      <Drawer.Screen name="SignUpCredentials" component={SignUpCredentials} />
      <Drawer.Screen name="SignUpUserType" component={SignUpUserType} />
      <Drawer.Screen name="SignUpSelectCampus" component={SignUpSelectCampus} />
      <Drawer.Screen name="Home" component={HomeUI} />
      <Drawer.Screen name="MyChats" component={MyChats} />
      <Drawer.Screen name="TutorSearch" component={TutorSearch} />
      <Drawer.Screen name="StudyGroupSearch" component={StudyGroupSearch} />
      <Drawer.Screen name="ChatUI" component={ChatUI} />
    </Drawer.Navigator>
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
      <>
        <NavigationContainer theme={Transparent}>
          <DrawerNavigator />
        </NavigationContainer>
      </>
    );
  }
}

export default RouteStack;
