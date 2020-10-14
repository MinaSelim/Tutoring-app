import {AppRegistry, View, Text} from 'react-native';
import React, {Component} from 'react';
import SignUp from './src/components/SignUp/SignUp';
import SignUp2 from './src/components/SignUp/SignUp2';
import SignUp3 from './src/components/SignUp/SignUp3';
import SignIn from './src/components/SignIn/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

class App extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUp2" component={SignUp2} />
        <Stack.Screen name="SignUp3" component={SignUp3} />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
AppRegistry.registerComponent('GoStudy', () => App);
