/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef, useCallback} from 'react';
import firebase from '../../api/authentication/Fire';
import {FlatList, View} from 'react-native';
import 'react-native-gesture-handler';
import {useStyleSheet, Layout, Text, Divider} from '@ui-kitten/components';
import {chatStyles} from '../../components/chat/styles/chatStyles';
import MessageRow from '../../components/chat/MessageRow';
import IMessage from '../../model/IMessage';
import ChatHeader from '../../components/chat/ChatHeader';
import ChatInput from '../../components/chat/ChatInput';
import GenericChat from '../../api/chatroom/GenericChat';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import Message from '../../api/chatroom/components/Message';
import moment from 'moment';
import useAuthUser from '../../hooks/authUser';
import env from '../../../env';
// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.

const chatAPI: GenericChat = new GenericChat();
let newDay = false;
let initialLoad = true;

const Chat = ({route, navigation}): JSX.Element => {
  const UPDATE_MESSAGE_COUNT = 1;
  const SCROLL_MESSAGE_AMOUNT = 25;
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [offset, setOffset] = useState(new Date().getTime());
  const styles = useStyleSheet(chatStyles);
  const flatListRef = useRef<null | FlatList<IMessage>>(null);
  const {chatID} = route.params;
  const user = useAuthUser()[0];
  const userID: string = user!.firebase_uid;
  const [isUserNameLoaded, setIsUserNameLoaded] = useState(false);
  const [otherUser, setOtherName] = useState('');

  useEffect(() => {
    let tempMessages;
    GetMessages().then((res) => {
      tempMessages = res;
      initialLoad = false;
      setChatMessages([...(chatMessages || []), ...tempMessages]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

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

  const ChatMessages = (messages): Message[] => {
    const currentMessages: Message[] = messages.map((msg) => {
      let name = '';
      if (msg.sender === user!.firebase_uid) {
        name = user!.first_name + ' ' + user!.last_name;
      } else {
        name = otherUser;
      }
      return new Message(msg.id, msg.content, name, msg.createdAt);
    });
    return currentMessages;
  };

  const [
    newestMessage,
    isLoadingRecentMessage,
    RecentMessageLoadError,
  ] = useCollectionData(loadMessages(UPDATE_MESSAGE_COUNT, 0), {
    idField: 'id',
  });

  const handleOnEndReached = (): void => {
    let chatLength = chatMessages.length;
    if (chatLength >= SCROLL_MESSAGE_AMOUNT) {
      let chatCreatedAt = chatMessages[chatLength - 1].createdAt;
      setOffset(chatCreatedAt);
    }
  };
  const GetMessages = useCallback<() => Promise<Message[]>>(async () => {
    const tempMessages: Message[] = await chatAPI.loadMessages(
      chatID,
      userID,
      offset,
      SCROLL_MESSAGE_AMOUNT,
    );
    return await ChatMessages(tempMessages);
  }, [offset]);

  const appendMessage = (): void => {
    if (newestMessage !== undefined && chatMessages[0] !== undefined) {
      const newestMsg: IMessage[] = ChatMessages(newestMessage);
      //execute if a new message has been received
      if (chatMessages[0].id !== newestMsg[0].id) {
        chatMessages.unshift(...newestMsg);
      }
    }
  };

  const renderWelcome = (): JSX.Element => {
    return (
      <Text appearance="hint" style={chatStyles.welcomeMessage}>
        This is the start of your direct message history.
      </Text>
    );
  };

  const renderMessage = ({item, index}): JSX.Element => {
    const ROWDATE = moment.unix(item.createdAt / 1000).format('YYYY-MM-DD');
    if (index === chatMessages.length - 1) {
      newDay = true;
    } else if (
      moment(ROWDATE).isAfter(
        moment
          .unix(chatMessages[index + 1].createdAt / 1000)
          .format('YYYY-MM-DD'),
      )
    ) {
      newDay = true;
    } else {
      newDay = false;
    }
    return (
      <View>
        {newDay && (
          <>
            <Text style={chatStyles.date}>
              {moment.unix(item.createdAt / 1000).format('MMM Do')}
            </Text>
            <Divider />
          </>
        )}
        <MessageRow key={item.id} message={item} />
      </View>
    );
  };

  const scrollToBottom = (): void => {
    flatListRef?.current?.scrollToOffset({animated: true, offset: 0});
  };
  useEffect(() => {
    (async (): Promise<void> => {
      let otherUserString: string = '';
      await firebase
        .firestore()
        .collection('CHATROOMS')
        .doc(chatID)
        .get()
        .then((doc) => {
          const chatParticipants = doc.get('participants');
          chatParticipants.forEach(function (participant) {
            if (participant !== userID) {
              otherUserString = participant;
            }
          });
        });
      const queryData = await fetch(`${env.SERVER_LINK}/search/basicUserInfo`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: otherUserString}),
        credentials: 'include',
      });
      await queryData.json().then((jsonResponse) => {
        const otherUserName =
          jsonResponse.first_name + ' ' + jsonResponse.last_name;
        setIsUserNameLoaded(true);
        setOtherName(otherUserName);
      });
    })();
  }, []);

  appendMessage();
  return (
    <Layout style={styles.container}>
      {!initialLoad && isUserNameLoaded && (
        <>
          <ChatHeader otherUser={otherUser} navigation={navigation} />

          <FlatList<any>
            keyExtractor={(item): string => item.id.toString()}
            renderItem={renderMessage}
            data={chatMessages}
            onEndReachedThreshold={0.5}
            onEndReached={handleOnEndReached}
            ref={flatListRef}
            inverted
            ListFooterComponent={renderWelcome}
          />

          <ChatInput onFocus={scrollToBottom} chatID={chatID} userID={userID} />
        </>
      )}
    </Layout>
  );
};

export default Chat;
