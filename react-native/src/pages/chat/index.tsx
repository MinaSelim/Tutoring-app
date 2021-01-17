import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import 'react-native-gesture-handler';
import {useStyleSheet, Layout} from '@ui-kitten/components';
import {chatStyles} from '../../components/ChatUI/styles/chatStyles';
import MessageRow from '../../components/ChatUI/MessageRow';
import IMessage from '../../model/IMessage';
import DATA from '../../components/ChatUI/DATA';
import ChatHeader from '../../components/ChatUI/ChatHeader';
import ChatInput from '../../components/ChatUI/ChatInput';
import GenericChat from '../../api/chatroom/GenericChat';
// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.

const chat = new GenericChat();
chat
  .getAllMessages('3KOm7aBd9VynpYsuHD0u', 'YUZSCMSLtdbmJaXIUs3QnUURm572')
  .then((res) => {
    console.log(res);
  });

const Chat = (): JSX.Element => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const messages = chat.getAllMessages(
      '3KOm7aBd9VynpYsuHD0u',
      'YUZSCMSLtdbmJaXIUs3QnUURm572',
    );
    setMessage(messages);
  }, []);

  const styles = useStyleSheet(chatStyles);

  const renderMessage = ({item}): JSX.Element => (
    <MessageRow key={item.id} {...item} />
  );

  return (
    <Layout style={styles.container}>
      <ChatHeader />
      <FlatList<IMessage>
        keyExtractor={(item): string => item.id}
        renderItem={renderMessage}
        data={messages}
        inverted
      />

      <ChatInput />
    </Layout>
  );
};
export default Chat;
