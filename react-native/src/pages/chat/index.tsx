import React, {useEffect, useState, useRef} from 'react';
import firebase from '../../api/authentication/Fire';
import {FlatList, PushNotificationIOS} from 'react-native';
import 'react-native-gesture-handler';
import {useStyleSheet, Layout} from '@ui-kitten/components';
import {chatStyles} from '../../components/ChatUI/styles/chatStyles';
import MessageRow from '../../components/ChatUI/MessageRow';
import IMessage from '../../model/IMessage';
import DATA from '../../components/ChatUI/DATA';
import ChatHeader from '../../components/ChatUI/ChatHeader';
import ChatInput from '../../components/ChatUI/ChatInput';
import GenericChat from '../../api/chatroom/GenericChat';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Message from '../../api/chatroom/components/Message';
// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.

//const chatAPI: GenericChat = new GenericChat();
//TO DO: get these values with DYNAMO DB User model
// /const userID: string = 'YUZSCMSLtdbmJaXIUs3QnUURm572';
const chatID: string = '3KOm7aBd9VynpYsuHD0u';
let newMsgs: Message[];

const Chat = (): JSX.Element => {
  const convo: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase
    .firestore()
    .collection('CHATROOMS')
    .doc(chatID)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc');

  const [messages] = useCollectionData(convo, {
    idField: 'id',
  });

  if (messages !== undefined) {
    newMsgs = ChatMessages(messages);
  }

  console.log(messages);
  const renderMessage = ({item}): JSX.Element => (
    <MessageRow key={item.id} {...item} />
  );

  const styles = useStyleSheet(chatStyles);
  return (
    <Layout style={styles.container}>
      <ChatHeader />
      <FlatList<IMessage>
        keyExtractor={(item): string => item.id}
        renderItem={renderMessage}
        data={newMsgs}
        inverted
      />
      <ChatInput />
    </Layout>
  );
};

function ChatMessages(messages): Message[] {
  //console.log('chatMsg', messages);
  const currentMessages: Message[] = messages.map(
    (msg: firebase.firestore.DocumentData) =>
      new Message(msg.id, msg.content, msg.sender, msg.createdAt),
  );
  return currentMessages;
}
export default Chat;
