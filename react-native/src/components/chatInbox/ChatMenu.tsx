import React, {useState, useEffect, useRef} from 'react';
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
import env from '../../../env';

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
  const chatListWithTitles = useRef<IChat[]>(new Array());

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

  const ChatGenerator = async (chat): Promise<void> => {
    chatListWithTitles.current = new Array();
    chat.map((data) => {
      //Get other participants
      let otherUserIDs: string[] = [];
      let chatTitle: string = '';
      data.participants.forEach((participant) => {
        if (participant !== userID) {
          otherUserIDs.push(participant);
        }
      });

      let chatWithTitle: Chat;
      //Get user name for each ID and wrap into a promise
      otherUserIDs.forEach(async (otherUserID, idx, array) => {
        const queryData = await fetch(
          `${env.SERVER_LINK}/search/basicUserInfo`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: otherUserID}),
            credentials: 'include',
          },
        );

        //Make a title using everyone's first, last names
        await queryData.json().then((jsonResponse) => {
          chatTitle =
            chatTitle + jsonResponse.first_name + ' ' + jsonResponse.last_name;
        });

        if (idx === array.length - 1) {
          chatWithTitle = new Chat(
            data.id,
            data.participants,
            data.createdAt,
            data.roomName,
            chatTitle,
            data.chatType,
            data.viewChat,
            data.latestMessage,
          );

          chatListWithTitles.current = [
            ...chatListWithTitles.current,
            chatWithTitle,
          ];
        }
      });
    });
    console.log('chatRef', chatListWithTitles.current);
    //const chatMap = chatListWithTitles.current;
    //console.log('chatMap', chatMap);
  };

  const [newestChat, ,] = useCollectionData(loadChat(), {idField: 'id'});

  const appendChat = async (): Promise<void> => {
    if (
      newestChat !== undefined &&
      oneToOneList !== undefined &&
      groupList !== undefined
    ) {
      let newestChatroom: Chat[];
      await ChatGenerator(newestChat).then(() => {
        newestChatroom = chatListWithTitles.current;
        let userPresence: boolean = false;
        //execute if a new message has been received
        console.log('newestChat', newestChat);
        console.log('newestChatroom', newestChatroom);
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
      });
    }
  };

  useEffect(() => {
    if (user!.hasOwnProperty('student_info')) {
      new RequestUserChatrooms()
        .getStudentChatrooms(userID)
        .then((userChatList) => {
          new DirectMessageChat()
            .displayUserChatrooms('direct', userChatList)
            .then(async (data) => {
              await ChatGenerator(data).then((result) =>
                setOneToOneList(chatListWithTitles.current),
              );
            });
          new GroupChat()
            .displayUserChatrooms('group', userChatList)
            .then(async (data) => {
              await ChatGenerator(data).then((result) =>
                setGroupList(chatListWithTitles.current),
              );
            });
        });
    } else {
      new RequestUserChatrooms()
        .getTutorChatrooms(userID)
        .then((userChatList) => {
          new DirectMessageChat()
            .displayUserChatrooms('direct', userChatList)
            .then(async (data) => {
              await ChatGenerator(data).then((result) =>
                setOneToOneList(chatListWithTitles.current),
              );
            });
          new GroupChat()
            .displayUserChatrooms('group', userChatList)
            .then(async (data) => {
              await ChatGenerator(data).then(() =>
                setGroupList(chatListWithTitles.current),
              );
            });
        });
    }
    return (): void => {
      setOneToOneList([]);
      setGroupList([]);
    };
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

export default ChatMenu;
