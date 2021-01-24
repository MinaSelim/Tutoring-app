import React, {useEffect, useState, useRef, useMemo} from 'react';
import firebase from '../../api/authentication/Fire';
import {FlatList, PushNotificationIOS} from 'react-native';
import 'react-native-gesture-handler';
import {useStyleSheet, Layout, Input} from '@ui-kitten/components';
import {chatStyles} from '../../components/ChatUI/styles/chatStyles';
import MessageRow from '../../components/ChatUI/MessageRow';
import IMessage from '../../model/IMessage';
import DATA from '../../components/ChatUI/DATA';
import ChatHeader from '../../components/ChatUI/ChatHeader';
import ChatInput from '../../components/ChatUI/ChatInput';
import GenericChat from '../../api/chatroom/GenericChat';
import {
  useCollectionData,
  useCollectionDataOnce,
} from 'react-firebase-hooks/firestore';
import Message from '../../api/chatroom/components/Message';
// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.

//const chatAPI: GenericChat = new GenericChat();
//TO DO: get these values with DYNAMO DB User model
// /const userID: string = 'YUZSCMSLtdbmJaXIUs3QnUURm572';
const chatID: string = '3KOm7aBd9VynpYsuHD0u';
let chatMessages: Message[];

const loadMessages = (
  messageAmount,
  offset,
): firebase.firestore.Query<firebase.firestore.DocumentData> => {
  return firebase
    .firestore()
    .collection('CHATROOMS')
    .doc(chatID)
    .collection('MESSAGES')
    .orderBy('createdAt', 'desc')
    .startAt([offset])
    .limit(messageAmount);
};

const handleOnEndReached = (amount: number): void => {
  console.log('UPDATING THE SCROLL ...');
};

const Chat = (): JSX.Element => {
  const UPDATE_MESSAGE_COUNT = 1;
  const SCROLL_MESSAGE_AMOUNT = 25;
  const OFFSET = 0;

  const [recentMessage, setRecentMessage] = useState<IMessage>({
    id: '',
    content: '',
    createdAt: 0,
    sender: '',
  });

  const [
    messages,
    isLoadingAllMesages = true,
    AllMesagesLoadError,
  ] = useCollectionDataOnce(loadMessages(SCROLL_MESSAGE_AMOUNT, OFFSET), {
    idField: 'id',
  });

  const [
    newestMessage,
    isLoadingRecentMessage,
    RecentMessageLoadError,
  ] = useCollectionData(loadMessages(UPDATE_MESSAGE_COUNT, 0), {
    idField: 'id',
  });

  if (messages !== undefined && newestMessage !== undefined) {
    const loadedMesssages: IMessage[] = ChatMessages(messages);
    const newestMsg: IMessage[] = ChatMessages(newestMessage);
    if (loadedMesssages[0].id === newestMsg[0].id) {
      chatMessages = [...(chatMessages || []), ...loadedMesssages];
    } else {
      chatMessages = [
        ...newestMsg,
        ...(chatMessages || []),
        ...loadedMesssages,
      ];
    }
  }

  const renderMessage = ({item}): JSX.Element => (
    <MessageRow key={item.id} {...item} />
  );

  const styles = useStyleSheet(chatStyles);
  //TODO: Make it scroll when opening input boxloadMessages(SCROLL_MESSAGE_AMOUNT, offset)
  const flatListRef = useRef<null | FlatList<IMessage>>(null);

  function scrollToBottom(): void {
    console.log('scroll to bottom is called');
    flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
  }
  return (
    <Layout style={styles.container}>
      <ChatHeader />
      {!false && (
        <FlatList<IMessage>
          keyExtractor={(item): string => item.id}
          renderItem={renderMessage}
          data={chatMessages}
          onEndReachedThreshold={0.5}
          onEndReached={null}
          ref={flatListRef}
          inverted
        />
      )}
      <ChatInput onFocus={scrollToBottom} onPress={scrollToBottom} />
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
