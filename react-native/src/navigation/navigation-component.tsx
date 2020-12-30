import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatUI from '../components/ChatUI/ChatUI';

const {Navigator, Screen} = createStackNavigator();

export const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="ChatUI" component={ChatUI} />
  </Navigator>
);

export default HomeNavigator;
