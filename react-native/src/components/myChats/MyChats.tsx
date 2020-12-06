/* eslint-disable */

import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TabBar, Tab, Layout, Text, Button, Icon} from '@ui-kitten/components';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const MyChats = () => {
    return(
     <Layout style={{flex:1}}>
        <ChatHeader/>
        <ChatMenu/>
     </Layout>
    );
};

const ChatHeader = () => (
  <Layout style={{flexDirection: 'row', justifyContent:'space-between'}}>
    <Button
          appearance="ghost"
          accessoryLeft={BackButton}
        />
    <Text style={{alignSelf:'center', top: 5, fontSize: 20, fontWeight: 'bold'}}>My Chats</Text>
    <Text style={{alignSelf:'center', right: 30, top: 5}}>(Button)</Text>
  </Layout>
);

const BackButton = () => {
  return <Icon fill="black" name="arrow-back-outline" style={{alignSelf:'center',
    width: 50,
    height: 40,
    left: 3,
    top: 5,
}}/>;
};

const ChatMenu = () => (
  <Navigator tabBar={(props) => <TopTabBar {...props} />}>
    <Screen name="Tutors" component={Tutors} />
    <Screen name="StudyGroups" component={StudyGroups} />
  </Navigator>
);

const TopTabBar = ({navigation, state}) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <Tab title="Tutors" />
    <Tab title="Study Groups" />
  </TabBar>
);

const Tutors = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">Tutors</Text>
  </Layout>
);

const StudyGroups = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">Study Groups</Text>
  </Layout>
);

export default MyChats;
