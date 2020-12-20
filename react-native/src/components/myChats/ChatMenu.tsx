import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTabBar from './TopTabBar';
import Tutors from './Tutors';
import StudyGroups from './StudyGroups';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const ChatMenu = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen name="Tutors" component={Tutors} />
    <Screen name="StudyGroups" component={StudyGroups} />
  </Navigator>
);

export default ChatMenu;
