import {AppRegistry} from 'react-native';
import React from 'react';
import {Component} from 'react';
import SignUp from './src/components/SignUp/SignUp1/SignUp1';
import SignUp2 from './src/components/SignUp/SignUp2/SignUp2';
import SignUp3 from './src/components/SignUp/SignUp3/SignUp3';
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
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUp2" component={SignUp2} />
          <Stack.Screen name="SignUp3" component={SignUp3} />
        </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
  }
}

AppRegistry.registerComponent('GoStudy', () => App);
