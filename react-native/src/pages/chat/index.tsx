import React from 'react';
import {FlatList} from 'react-native';
import 'react-native-gesture-handler';
import {useStyleSheet, Layout} from '@ui-kitten/components';
import {chatStyles} from './styles';
import MessageRow from '../../components/chat/MessageRow';
import IMessage from '../../model/IMessage';
import DATA from './DATA';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatInput from '../../components/chat/ChatInput';

// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.

const ChatUI = (): JSX.Element => {
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
        data={DATA}
        inverted
      />

      <ChatInput />
    </Layout>
  );
};
export default ChatUI;
