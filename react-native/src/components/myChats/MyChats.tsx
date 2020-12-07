/* eslint-disable */

import React from 'react';
import { StyleSheet } from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TabBar, Tab, Layout, Text, Button, Icon, List, ListItem, Avatar} from '@ui-kitten/components';
import {colors} from '../../styles/appColors';

const {Navigator, Screen} = createMaterialTopTabNavigator();

const MyChats = () => {
    return(
     <Layout style={{flex:1}}>
        <ChatHeader/>
        <ChatMenu/>
        <Text style={styles.footer}> go.study </Text>
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
  <Layout>
    <List
      style={styles.container}
      data={data}
      renderItem={renderItem}
    />
  </Layout>
);

const styles = StyleSheet.create({
  footer: {
    alignSelf: 'center',
    color: colors.appLightGrey,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 5,
  },
  container:{

  }
});

const data = new Array(8).fill({
  title: 'Tutor Name',
  description: 'Tutor Name: Last Message',
});

const renderItem = ({ item, index }) => (
  <ListItem 
    title={`${item.title} ${index + 1}`}
    description={`${item.description} ${index + 1}`}
    accessoryLeft={ProfilePicture}
    accessoryRight={UnreadHint}
  />
);

const ProfilePicture = (props) => (
  //TODO replace with actual images
  <Avatar shape='round' size='large' source={require('../../assets/images/icons/user.png')}/>
);

const UnreadHint = (props) => (
  <Icon {...props} size='tiny' fill="#F1AA3E" name='alert-circle'/>
);

const StudyGroups = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">Study Groups</Text>
  </Layout>
);

export default MyChats;
