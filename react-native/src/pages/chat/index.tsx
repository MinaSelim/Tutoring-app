import React, {useEffect, useState, useRef, useCallback} from 'react';
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

const chatAPI: GenericChat = new GenericChat();
//TO DO: get these values with DYNAMO DB User model
const userID: string = 'YUZSCMSLtdbmJaXIUs3QnUURm572';
const chatID: string = '3KOm7aBd9VynpYsuHD0u';
let initialLoad = true;

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

const Chat = (): JSX.Element => {
  const UPDATE_MESSAGE_COUNT = 1;
  const SCROLL_MESSAGE_AMOUNT = 10;
  const initialLoad = true;
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [offset, setOffset] = useState(new Date().getTime());
  const [recentMessage, setRecentMessage] = useState<IMessage>({
    id: '',
    content: '',
    createdAt: 0,
    sender: '',
  });

  const handleOnEndReached = (): void => {
    let chatLength = chatMessages.length;
    let chatCreatedAt = chatMessages[chatLength - 1].createdAt;
    setOffset(chatCreatedAt);
    console.log('UPDATING THE SCROLL ... ' + offset);
  };

  const GetMessages = useCallback<() => Promise<Message[]>>(async () => {
    // console.log('on end reached');
    // const [
    //   messages,
    //   isLoadingAllMesages = true,
    //   AllMesagesLoadError,
    // ] = useCollectionDataOnce(loadMessages(SCROLL_MESSAGE_AMOUNT, OFFSET), {
    //   idField: 'id',
    // });
    // return messages;
    const tempMessages: Message[] = await chatAPI.loadMessages(
      chatID,
      userID,
      offset,
      SCROLL_MESSAGE_AMOUNT,
    );
    console.log(tempMessages);
    return tempMessages;
    // .then((res) => {
    //   let messages = ChatMessages(res);
    //   chatMessages = [...(chatMessages || []), ...messages];
    //   console.log('chatmessages', chatMessages);
    //   return chatMessages;
    // });
  }, [offset]);

  useEffect(() => {
    let tempMessages;
    GetMessages().then((res) => {
      tempMessages = res;
      setChatMessages([...(chatMessages || []), ...tempMessages]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const [
    newestMessage,
    isLoadingRecentMessage,
    RecentMessageLoadError,
  ] = useCollectionData(loadMessages(UPDATE_MESSAGE_COUNT, 0), {
    idField: 'id',
  });

  if (newestMessage !== undefined && chatMessages[0] !== undefined) {
    const newestMsg: IMessage[] = ChatMessages(newestMessage);
    //a new message has been received but there are no previous messages to load
    if (chatMessages[0].id !== newestMsg[0].id)
      chatMessages.unshift(...newestMsg);
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
          onEndReached={handleOnEndReached}
          ref={flatListRef}
          inverted
        />
      )}
      <ChatInput onFocus={scrollToBottom} onPress={scrollToBottom} />
    </Layout>
  );
};

function ChatMessages(messages): Message[] {
  const currentMessages: Message[] = messages.map(
    (msg: firebase.firestore.DocumentData) =>
      new Message(msg.id, msg.content, msg.sender, msg.createdAt),
  );
  return currentMessages;
}
export default Chat;
