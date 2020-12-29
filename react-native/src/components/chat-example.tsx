// import firestore from '@react-native-firebase/firestore';
import {User} from 'firebase';
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import chatHandler from '../api/chatroom/chatHandler';
import groupChatroom from '../api/chatroom/groupChatroom';
import directChatroom from '../api/chatroom/directChatroom';

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
          onPress={
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            () =>
              groupChatroom.createGroupChatroom(
                this.state.currentUser,
                [
                  this.state.currentUser,
                  this.state.tutorUser,
                  '3A9zPYU126OtCHVYqtETBvh7xQr2',
                ],
                this.state.roomName,
                'MATH202',
              )
          }>
          <Text style={styles.buttonText}>Create chat room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() =>
            groupChatroom.deleteChatroom(
              this.state.currentUser,
              [
                this.state.currentUser,
                this.state.tutorUser,
                '3A9zPYU126OtCHVYqtETBvh7xQr2',
              ],
              '3ILGb4uTptDLWxLW14FJ',
            )
          }>
          <Text style={styles.buttonText}>Delete chat room</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() => {
            console.log(
              'Result final: ',
              directChatroom.displayUserChatrooms(
                this.state.currentUser,
                'group',
                ['oOi8cPpnQ7J9ZrKZU36F'],
              ),
            );
          }}>
          <Text style={styles.buttonText}>Display chat rooms in console</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() =>
            groupChatroom.sendMessage(
              this.state.currentUser,
              'BTD3sJ3N6aw196jNfC2I',
              this.state.Message,
            )
          }>
          <Text style={styles.buttonText}>Send message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() => groupChatroom.getAllMessages('BTD3sJ3N6aw196jNfC2I')}>
          <Text style={styles.buttonText}>Display user messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onPress={() =>
            chatHandler.viewedChat(
              'BTD3sJ3N6aw196jNfC2I',
              this.state.currentUser,
            )
          }>
          <Text style={styles.buttonText}>Current User Views Message</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
