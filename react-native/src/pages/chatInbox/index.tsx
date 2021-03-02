import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTabBar from '../../components/chatInbox/TopTabBar';
import ChatTab from '../../components/chatInbox/ChatTab';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';
import IChat from 'model/chatInbox/IChat';

const {Navigator, Screen} = createMaterialTopTabNavigator();

interface IChatMenu extends NavigationInjectedPropsConfigured {
  oneOnOnesource: IChat[];
  groupChatsource: IChat[];
}

const ChatMenu: React.FC<IChatMenu> = ({
  oneOnOnesource,
  groupChatsource,
  navigation,
  navigate,
  goBack,
  toggleDrawer,
}: IChatMenu): JSX.Element => (
  <Navigator tabBar={(props): JSX.Element => <TopTabBar {...props} />}>
    <Screen
      name="One-on-one"
      children={(): JSX.Element => (
        <ChatTab
          navigation={navigation}
          navigate={navigate}
          goBack={goBack}
          toggleDrawer={toggleDrawer}
          source={oneOnOnesource}
        />
      )}
    />
    <Screen
      name="Group chats"
      children={(): JSX.Element => (
        <ChatTab
          navigation={navigation}
          navigate={navigate}
          goBack={goBack}
          toggleDrawer={toggleDrawer}
          source={groupChatsource}
        />
      )}
    />
  </Navigator>
);

export default ChatMenu;
