import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTabBar from './TopTabBar';
import ChatTab from './ChatTab';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const ChatMenu: React.FC<NavigationInjectedPropsConfigured> = (
  props,
): JSX.Element => (
  <Navigator tabBar={(props): JSX.Element => <TopTabBar {...props} />}>
    <Screen
      name="One-on-one"
      children={(): JSX.Element => (
        <ChatTab
          navigation={props.navigation}
          navigate={props.navigate}
          goBack={props.goBack}
          source={MockupOneOnOneChatsData}
        />
      )}
    />
    <Screen
      name="Group chats"
      children={(): JSX.Element => (
        <ChatTab
          navigation={props.navigation}
          navigate={props.navigate}
          goBack={props.goBack}
          source={MockupStudyGroupChatsData}
        />
      )}
    />
  </Navigator>
);

export default ChatMenu;
