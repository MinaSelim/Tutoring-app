import React from 'react';
import {TabBar, Tab} from '@ui-kitten/components';

const TopTabBar = ({navigation, state}): JSX.Element => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index): boolean => navigation.navigate(state.routeNames[index])}>
    <Tab title="Tutors" />
    <Tab title="Study Groups" />
  </TabBar>
);

export default TopTabBar;
