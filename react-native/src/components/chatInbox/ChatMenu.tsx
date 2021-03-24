import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTabBar from './TopTabBar';
import ChatTab from './ChatTab';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';
import IChat from '../../api/chatroom/components/IChat';
import Chat from '../../api/chatroom/components/Chat';
import GroupChat from '../../api/chatroom/GroupChat';
import DirectMessageChat from '../../api/chatroom/DirectMessageChat';
import firebase from '../../api/authentication/Fire';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import useAuthUser from '../../hooks/authUser';
import RequestUserChatrooms from '../../api/chatroom/requests/RequestUserChatrooms';

const ChatMenu: React.FC<NavigationInjectedPropsConfigured> = ({
  navigation,
  navigate,
  goBack,
  toggleDrawer,
}): JSX.Element => {
  const user = useAuthUser()[0];
  const userID: string = user!.firebase_uid;
  const {Navigator, Screen} = createMaterialTopTabNavigator();
  let [groupList, setGroupList] = useState<IChat[]>();
  let [oneToOneList, setOneToOneList] = useState<IChat[]>();

  const loadChat = (): firebase.firestore.Query<
    firebase.firestore.DocumentData
  > => {
    const lastChatroom = firebase
      .firestore()
      .collection('CHATROOMS')
      .orderBy('createdAt', 'desc')
      .limit(1);
    return lastChatroom;
  };

  const [
    newestChat,
    isLoadingRecentChat,
    RecentChatLoadError,
  ] = useCollectionData(loadChat(), {idField: 'id'});

  const appendChat = (): void => {
    if (
      newestChat !== undefined &&
      oneToOneList !== undefined &&
      groupList !== undefined
    ) {
      const newestChatroom: Chat[] = ChatGenerator(newestChat);
      let userPresence: boolean = false;
      //execute if a new message has been received
      if (newestChatroom[0].participants !== undefined) {
        for (let i = 0; i < newestChatroom[0].participants.length - 1; i++) {
          if (newestChatroom[0].participants[i] === userID) {
            userPresence = true;
          }
        }
      }
      if (newestChatroom[0].chatType === 'direct' && userPresence) {
        if (oneToOneList.length === 0) {
          setOneToOneList([newestChatroom[0]]);
          if (user!.hasOwnProperty('student_info'))
            user!.student_info.chatrooms.push(newestChatroom[0].id);
          else user!.tutor_info.chatrooms.push(newestChatroom[0].id);
        } else if (oneToOneList[0].id !== newestChatroom[0].id) {
          setOneToOneList([newestChatroom[0], ...oneToOneList]);
          if (user!.hasOwnProperty('student_info'))
            user!.student_info.chatrooms.push(newestChatroom[0].id);
          else user!.tutor_info.chatrooms.push(newestChatroom[0].id);
        }
      } else if (newestChatroom[0].chatType === 'group' && userPresence) {
        if (groupList.length === 0) {
          setGroupList([newestChatroom[0]]);
          if (user!.hasOwnProperty('student_info'))
            user!.student_info.chatrooms.push(newestChatroom[0].id);
          else user!.tutor_info.chatrooms.push(newestChatroom[0].id);
        } else if (oneToOneList[0].id !== newestChatroom[0].id) {
          setGroupList([newestChatroom[0], ...groupList]);
          if (user!.hasOwnProperty('student_info'))
            user!.student_info.chatrooms.push(newestChatroom[0].id);
          else user!.tutor_info.chatrooms.push(newestChatroom[0].id);
        }
      }
    }
  };

  useEffect(() => {
    if (user!.hasOwnProperty('student_info')) {
      new RequestUserChatrooms()
        .getStudentChatrooms(userID)
        .then((userChatList) => {
          new DirectMessageChat()
            .displayUserChatrooms('direct', userChatList)
            .then((data) => {
              setOneToOneList(data);
            });
          new GroupChat()
            .displayUserChatrooms('group', userChatList)
            .then((data) => {
              setGroupList(data);
            });
        });
    } else {
      new RequestUserChatrooms()
        .getTutorChatrooms(userID)
        .then((userChatList) => {
          new DirectMessageChat()
            .displayUserChatrooms('direct', userChatList)
            .then((data) => {
              setOneToOneList(data);
            });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  appendChat();

  return (
    <Navigator tabBar={(props): JSX.Element => <TopTabBar {...props} />}>
      <Screen
        name="One-on-one"
        children={(): JSX.Element => (
          <ChatTab
            navigation={navigation}
            navigate={navigate}
            goBack={goBack}
            toggleDrawer={toggleDrawer}
            source={oneToOneList}
          />
        )}
      />
      <Screen
        name="Group chats"
        children={(): JSX.Element => (
          <ChatTab
            navigation={navigation}
            navigate={navigate}
            goBack={goBack}
            toggleDrawer={toggleDrawer}
            source={groupList}
          />
        )}
      />
    </Navigator>
  );
};

function ChatGenerator(chat): Chat[] {
  const currentChat: Chat[] = chat.map(
    (data: firebase.firestore.DocumentData) =>
      new Chat(
        data.id,
        data.participants,
        data.createdAt,
        data.roomName,
        data.associatedClass,
        data.chatType,
        data.viewChat,
        data.latestMessage,
      ),
  );
  return currentChat;
}

export default ChatMenu;
