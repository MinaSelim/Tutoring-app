import React from 'react';
import {TabBar, Tab} from '@ui-kitten/components';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';

interface ITopTabBar extends NavigationInjectedPropsConfigured {}
const TopTabBar = ({navigation, state}): JSX.Element => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index): boolean => navigation.navigate(state.routeNames[index])}>
    <Tab title="One-On-One" />
    <Tab title="Group Chats" />
  </TabBar>
);

export default TopTabBar;
