/* eslint-disable import/no-duplicates */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-native/no-inline-styles */
import {AppRegistry} from 'react-native';
import React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import SignUpCredentials from './src/components/signUp/signUpCredentials/SignUpCredentials';
import SignUpUserType from './src/components/signUp/signUpUserType/SignUpUserType';
import SignUpSelectCampus from './src/components/signUp/signUpSelectCampus/SignUpSelectCampus';
import SignIn from './src/components/signIn/SignIn';
import Store from './src/components/store';
import mapping from './mapping.json';
import theme from './custom-theme.json'; // <-- Import app theme

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          customMapping={mapping}
          theme={{...eva.light, ...theme}}>
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
        </ApplicationProvider>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GoStudy', () => App);
