/* eslint-disable */

import React from 'react';
import {TabBar, Tab} from '@ui-kitten/components';

const TopTabBar = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <Tab title="Tutors" />
    <Tab title="Study Groups" />
  </TabBar>
);

export default TopTabBar;
