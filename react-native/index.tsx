import {AppRegistry, View, Text} from 'react-native';
import React from 'react';
import {Component} from 'react';
import SignUpCredentials from './src/components/signUp/signUpCredentials/SignUpCredentials';
import SignUpUserType from './src/components/signUp/signUpUserType/SignUpUserType';
import SignUpSelectCampus from './src/components/signUp/signUpSelectCampus/SignUpSelectCampus';
import SignIn from './src/components/signIn/SignIn';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Store from '../react-native/src/components/store';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
AppRegistry.registerComponent('GoStudy', () => App);
