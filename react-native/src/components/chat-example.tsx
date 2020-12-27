/* eslint-disable prettier/prettier */
// import firestore from '@react-native-firebase/firestore';
import {User} from 'firebase';
import React, {useState, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import chatModifier from '../api/chatroom/ChatModifier';
import chatroomRequest from '../api/chatroom/ChatroomRequest';

import styles from '../styles/stylesChat';
import firebase from '../api/authentication/Fire';

interface Message {
  content: string;
  sender: string;
  timestamp: Date;
}

interface Chats {
  roomName?: string;
  dateCreated?: Date;
  participants: User[];
  creator: User;
  admin?: User;
  Messages: Message[];
}

export default class ChatConfiguration extends Component<any, any> {
  db = firebase.firestore();

  constructor(props) {
    super(props);

    this.state = {
      roomName: 'test',
      Message: null,
      currentUser: 'YUZSCMSLtdbmJaXIUs3QnUURm572',
      tutorUser: 'aZNnhAGTFlSYtC2mRrpNB4C6jLg2',
      // testing user1: aZNnhAGTFlSYtC2mRrpNB4C6jLg2
      // testing user2: VogoCGGOuMOELLoq1imCr7cHkmp1
    };

    this.setRoomName = this.setRoomName.bind(this);
    this.setMessage = this.setMessage.bind(this);
  }

  setRoomName = (text): void => {
    this.setState({roomName: text});
  };

  setMessage = (text): void => {
    this.setState({Message: text});
  };

  render(): JSX.Element {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Thread Name"
          onChangeText={this.setRoomName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Type your mesage"
          onChangeText={this.setMessage}
        />
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() =>
            chatModifier.createOneonOneChatroom(
              this.state.currentUser,
              this.state.tutorUser,
              this.state.roomName,
            )
          // eslint-disable-next-line react/jsx-curly-newline
          }>
          <Text style={styles.buttonText}>Create chat room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() => chatModifier.deleteChatroom(this.state.currentUser,[this.state.currentUser,this.state.tutorUser], 
            'rfh6NKFQchLsY5Br8yZ1'
            )}>
          <Text style={styles.buttonText}>Delete chat room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() => chatModifier.displayUserChats(this.state.currentUser)}>
          <Text style={styles.buttonText}>Display chat rooms in console</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() =>
            chatroomRequest.sendMessage(
              this.state.currentUser,
              'rfh6NKFQchLsY5Br8yZ1',
              this.state.Message,
            )}>
          <Text style={styles.buttonText}>Send message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() =>
            chatroomRequest.getAllMessages(
              'rfh6NKFQchLsY5Br8yZ1'
              // eslint-disable-next-line prettier/prettier
            )}>
          <Text style={styles.buttonText}>Display user messages</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
