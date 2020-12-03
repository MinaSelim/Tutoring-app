import React from 'react';
import {View, FlatList} from 'react-native';
import 'react-native-gesture-handler';
import {
  useStyleSheet
} from '@ui-kitten/components';
import {chatStyles} from './styles/chatStyles';

import MessageRow from './MessageRow';
import IMessage from '../../model/IMessage';
import {DATA} from './DATA';
import Header from './Header';
import ChatInput from './ChatInput';


// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.

export const ChatUI = () => {
  const styles = useStyleSheet(chatStyles);

  const renderMessage = ({item}) => <MessageRow key={item.key} {...item} />;

  return (
    <View style={styles.container}>
      <Header />

      <FlatList<IMessage>
        keyExtractor={(item) => item.key}
        renderItem={renderMessage}
        data={DATA}
        inverted
      />

      <ChatInput />
    </View>
  );
};
