import React from 'react';
import {Component} from 'react';
import SignUpCredentials from './src/components/signUp/signUpCredentials/SignUpCredentials';
import SignUpUserType from './src/components/signUp/signUpUserType/SignUpUserType';
import SignUpSelectCampus from './src/components/signUp/signUpSelectCampus/SignUpSelectCampus';
import SignIn from './src/components/signIn/SignIn';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Store from '../react-native/src/components/store';
import {AppRegistry, View} from 'react-native';
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-native/no-inline-styles */
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        
        
      <Provider store={Store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Welcome to UI Kitten</Text>
        </Layout>
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
