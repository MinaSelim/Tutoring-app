import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatUI from '../pages/chat';

const {Navigator, Screen} = createStackNavigator();

export const HomeNavigator = (): JSX.Element => (
  <Navigator headerMode="none">
    <Screen name="ChatUI" component={ChatUI} />
  </Navigator>
);

export default HomeNavigator;
