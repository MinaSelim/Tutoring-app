import React, {Component} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import SignUpCredentials from './src/components/signUp/signUpCredentials/SignUpCredentials';
import SignUpUserType from './src/components/signUp/signUpUserType/SignUpUserType';
import SignUpSelectCampus from './src/components/signUp/signUpSelectCampus/SignUpSelectCampus';
import SignInMenu from './src/components/signIn/SignInMenu';
import HomeUI from './src/components/home/Home';
import SideBar from './src/components/sideBar/SideBar';
import MyChats from './src/pages/myChats';
import TutorSearch from './src/components/tutorSearch/TutorSearch';
import StudyGroupSearch from './src/components/studyGroupSearch/StudyGroupSearch';
import ChatUI from './src/components/ChatUI/ChatUI';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
function DrawerNavigator(): JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={SideBar}
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
}

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
