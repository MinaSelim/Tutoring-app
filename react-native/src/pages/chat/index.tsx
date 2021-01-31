import React, {useEffect, useState, useRef, useCallback} from 'react';
import firebase from '../../api/authentication/Fire';
import {FlatList, View} from 'react-native';
import 'react-native-gesture-handler';
import {useStyleSheet, Layout, Text, Divider} from '@ui-kitten/components';
import {chatStyles} from '../../components/ChatUI/styles/chatStyles';
import MessageRow from '../../components/ChatUI/MessageRow';
import IMessage from '../../model/IMessage';
import ChatHeader from '../../components/ChatUI/ChatHeader';
import ChatInput from '../../components/ChatUI/ChatInput';
import GenericChat from '../../api/chatroom/GenericChat';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Message from '../../api/chatroom/components/Message';
import moment from 'moment';
// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.

const chatAPI: GenericChat = new GenericChat();
//TO DO: get these values with DYNAMO DB User model
const userID: string = 'YUZSCMSLtdbmJaXIUs3QnUURm572';
const chatID: string = '3KOm7aBd9VynpYsuHD0u';
let currentDay = '';
let newDay = false;
let initialLoad = true;
let isFirstMessage = false;

const Chat = (): JSX.Element => {
  const UPDATE_MESSAGE_COUNT = 1;
  const SCROLL_MESSAGE_AMOUNT = 10;
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [offset, setOffset] = useState(new Date().getTime());
  const styles = useStyleSheet(chatStyles);
  const flatListRef = useRef<null | FlatList<IMessage>>(null);

  useEffect(() => {
    let tempMessages;
    GetMessages().then((res) => {
      tempMessages = res;
      initialLoad = false;
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

  const handleOnEndReached = (): void => {
    let chatLength = chatMessages.length;
    if (chatLength > 24) {
      let chatCreatedAt = chatMessages[chatLength - 1].createdAt;
      setOffset(chatCreatedAt);
      console.log('UPDATING THE SCROLL ... ' + offset);
    }
  };

  const GetMessages = useCallback<() => Promise<Message[]>>(async () => {
    const tempMessages: Message[] = await chatAPI.loadMessages(
      chatID,
      userID,
      offset,
      SCROLL_MESSAGE_AMOUNT,
    );
    console.log(tempMessages);
    return tempMessages;
  }, [offset]);

  function appendMessage(): void {
    console.log('newest msg', newestMessage);
    console.log('chat msg[0]', chatMessages[0]);
    if (chatMessages[0] === undefined && newestMessage !== undefined) {
      const newestMsg: IMessage[] = ChatMessages(newestMessage);
      chatMessages.unshift(...newestMsg);
    } else if (newestMessage !== undefined && chatMessages[0] !== undefined) {
      const newestMsg: IMessage[] = ChatMessages(newestMessage);
      //execute if a new message has been received
      if (chatMessages[0].id !== newestMsg[0].id) {
        chatMessages.unshift(...newestMsg);
      }
    }
  }

  const renderWelcome = (): JSX.Element => {
    return (
      <Text appearance="hint" style={chatStyles.welcomeMessage}>
        This is the start of your direct message history with Jessie Allen.
      </Text>
    );
  };

  const renderMessage = ({item, index}): JSX.Element => {
    const ROWDATE = moment.unix(item.createdAt / 1000).format('MMM Do');
    if (index === 0) {
      currentDay = ROWDATE;
      newDay = false;
    } else if (ROWDATE !== currentDay) {
      currentDay = ROWDATE;
      newDay = true;
    } else {
      newDay = false;
    }
    isFirstMessage = false;
    if (index === chatMessages.length - 1) isFirstMessage = true;

    return (
      <View>
        {isFirstMessage && (
          <>
            <Text style={chatStyles.date}>
              {moment.unix(item.createdAt / 1000).format('MMM Do')}
            </Text>
            <Divider />
          </>
        )}
        <MessageRow key={item.id} message={item} newDay={newDay} />
      </View>
    );
  };

  function scrollToBottom(): void {
    console.log('scroll to bottom is called');
    flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
  }

  appendMessage();

  return (
    <Layout style={styles.container}>
      {!initialLoad && (
        <>
          <ChatHeader />

          <FlatList<any>
            keyExtractor={(item): string => item}
            renderItem={renderMessage}
            data={chatMessages}
            onEndReachedThreshold={0.5}
            onEndReached={handleOnEndReached}
            ref={flatListRef}
            inverted
            ListFooterComponent={renderWelcome}
          />

          <ChatInput onFocus={scrollToBottom} />
        </>
      )}
    </Layout>
  );
};

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

function ChatMessages(messages): Message[] {
  const currentMessages: Message[] = messages.map(
    (msg: firebase.firestore.DocumentData) =>
      new Message(msg.id, msg.content, msg.sender, msg.createdAt),
  );
  return currentMessages;
}

export default Chat;
