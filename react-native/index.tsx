import {AppRegistry} from 'react-native';
import React from 'react';
import {Component} from 'react';
import SignUpCredentials from './src/components/SignUp/SignUpCredentials/SignUpCredentials';
import SignUpUserType from './src/components/SignUp/SignUpUserType/SignUpUserType';
import SignUpSelectCampus from './src/components/SignUp/SignUpSelectCampus/SignUpSelectCampus';
import SignIn from './src/components/SignIn/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import Store from '../react-native/src/components/store';

const Stack = createStackNavigator();

class App extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Provider store={Store}>
        <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUpCredentials" component={SignUpCredentials} />
          <Stack.Screen name="SignUpUserType" component={SignUpUserType} />
          <Stack.Screen name="SignUpSelectCampus" component={SignUpSelectCampus} />
        </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
  }
}

AppRegistry.registerComponent('GoStudy', () => App);
