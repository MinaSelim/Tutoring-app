/* eslint-disable */

import React from 'react';
import { StyleSheet, View } from 'react-native';
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
      data={mockupTutorData}
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
    bottom: 10,
  },
  container:{
    backgroundColor: 'white',
    height: '100%',
    top:20,
  }
});

const mockupTutorData = [
  {
    name: 'Mark',
    lastMessage: 'You: this homework is really...',
    classNumber: 'BIOL 206',
    newMessage: false
  },
  {
    name: 'Andrew',  
    lastMessage: 'Andrew: Wow, that awesome!...',
    classNumber: 'PHYS 287',
    newMessage: true
  },
  {
    name: 'Laurie',  
    lastMessage: 'You: I have a question...',
    classNumber: 'MATH 209',
    newMessage: false
  },
  {
    name: 'Anna K.',  
    lastMessage: 'Anna: last comment...',
    classNumber: 'ARTH 209',
    newMessage: true
  },
  {
    name: 'Tommy',  
    lastMessage: 'You: I have a question...',
    classNumber: 'GEOG 289',
    newMessage: false
  },
  {
    name: 'Mary',  
    lastMessage: 'Mary: good question, the...',
    classNumber: 'ENGL 209',
    newMessage: false
  }
];

const mockupStudyGroupData = [
  {
    name: 'midterm-study-group',
    lastMessage: 'Brandon: this homework is really...',
    classNumber: 'BIOL 206',
    newMessage: false
  },
  {
    name: 'astronomy-quiz-review',  
    lastMessage: 'Wow, that\'s awesome...',
    classNumber: 'PHYS 287',
    newMessage: true
  },
  {
    name: 'final-crash-course',  
    lastMessage: 'Steve: I have a question...',
    classNumber: 'MATH 209',
    newMessage: false
  },
  {
    name: 'chatroom-name',  
    lastMessage: 'Joey: last comment...',
    classNumber: 'ARTH 209',
    newMessage: true
  },
  {
    name: 'big-review',  
    lastMessage: 'Steve: I have a question...',
    classNumber: 'GEOG 289',
    newMessage: false
  },
  {
    name: 'chatroom-name',  
    lastMessage: 'Name: last comment...',
    classNumber: 'ENGL 209',
    newMessage: false
  }
];

const renderItem = ({item}) => (
  <ListItem 
  style={{flexDirection:'row', width:'100%'}}
  >
    <ProfilePicture/>
    <View style={{left:10}}>
      <View style={{flexDirection:'row'}}>
        <Text>{item.name}</Text>
        <Text style={{color:'#A3A3A3', left:8, fontSize:14, alignSelf:'center'}}>{item.classNumber}</Text>
      </View>
      <Text style={{fontSize:14, color:item.newMessage?'black':'#A3A3A3'}}>{item.lastMessage}</Text>
    </View>
    <UnreadHint newMessage={item.newMessage}/>
  </ListItem>
);

const ProfilePicture = (): JSX.Element  => (
  //TODO replace with actual images
  <Avatar style={{marginLeft:5}} shape='round' size='large' source={require('../../assets/images/icons/temporaryAvatar.png')}/>
);

const UnreadHint = (props) => (
  <Avatar style={{height:14, width:14, position: 'absolute', right:15, alignSelf:'center', opacity:props.newMessage?1:0}} shape='round' source={require('../../assets/images/icons/notificationDot.png')}/>
);

const StudyGroups = () => (
  <Layout>
    <List
      style={styles.container}
      data={mockupStudyGroupData}
      renderItem={renderItem}
    />
  </Layout>
);

export default MyChats;
