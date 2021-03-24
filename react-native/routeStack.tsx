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
import Chat from './src/pages/chat/index';
import EditStudentCampus from './src/components/editCampuses/EditStudentCampus';
import EditTutorCampuses from './src/components/editCampuses/EditTutorCampuses';
import EditClasses from './src/components/editCampuses/EditClasses';
import PasswordReset from './src/pages/passwordReset';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import PaymentOptions from './src/pages/paymentOptions';
import Booking from './src/components/booking/booking';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeNavigation: React.FunctionComponent = () => {
  return (
    <Drawer.Navigator
      drawerContent={({navigation}: any): React.ReactElement => <SideBar navigation={navigation} />}
      initialRouteName="Home"
      drawerType="slide">
      <Drawer.Screen name="Home" component={HomeUI} />
      <Drawer.Screen name="MyChats" component={chatInbox} />
      <Drawer.Screen name="TutorSearch" component={TutorSearch} />
      <Drawer.Screen name="StudyGroupSearch" component={StudyGroupSearch} />
      <Drawer.Screen name="ChatUI" component={ChatUI} />
    </Drawer.Navigator>
  );
};
const StackNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator initialRouteName="EditTutorCampuses" headerMode="none">
      <Stack.Screen name="SignInMenu" component={SignInMenu} />
      <Stack.Screen name="SignUpCredentials" component={SignUpCredentials} />
      <Stack.Screen name="SignUpUserType" component={SignUpUserType} />
      <Stack.Screen name="SignUpSelectCampus" component={SignUpSelectCampus} />
      <Stack.Screen name="HomeDrawer" component={HomeNavigation} />
      <Stack.Screen name="MyChats" component={chatInbox} />
      <Stack.Screen name="TutorSearch" component={TutorSearch} />
      <Stack.Screen name="StudyGroupSearch" component={StudyGroupSearch} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="EditTutorCampuses" component={EditTutorCampuses} />
      <Stack.Screen name="EditStudentCampus" component={EditStudentCampus} />
      <Stack.Screen name="EditClasses" component={EditClasses} />
      <Stack.Screen name="PaymentOptions" component={PaymentOptions} />
      <Stack.Screen name="PasswordReset" component={PasswordReset} />
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
