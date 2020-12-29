/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTabBar from './TopTabBar';
import ChatTab from './ChatTab';
import MockupStudyGroupChatsData from './mockData/MockUpStudyGroupChatsData';
import MockupOneOnOneChatsData from './mockData/MockupOneOnOneChatsData';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const ChatMenu = (): JSX.Element => (
  <Navigator tabBar={(props): JSX.Element => <TopTabBar {...props} />}>
    <Screen
      name="One-on-one"
      children={() => <ChatTab source={MockupOneOnOneChatsData} />}
    />
    <Screen
      name="Group chats"
      children={() => <ChatTab source={MockupStudyGroupChatsData} />}
    />
  </Navigator>
);

export default ChatMenu;
