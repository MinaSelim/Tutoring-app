import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatUI} from '../components/ChatUI/ChatUI';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="ChatUI" component={ChatUI} />
  </Navigator>
);

export const AppNavigator = () => <HomeNavigator />;
