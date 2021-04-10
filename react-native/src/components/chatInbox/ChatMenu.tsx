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

interface chatNames {
  chatID: string;
  chatName: string;
}
const ChatMenu: React.FC<NavigationInjectedPropsConfigured> = ({
  navigation,
  navigate,
  goBack,
  toggleDrawer,
}): JSX.Element => {
  //Hooks
  const {Navigator, Screen} = createMaterialTopTabNavigator();
  const user = useAuthUser()[0];

  let [groupList, setGroupList] = useState<IChat[]>([]);
  let [oneToOneList, setOneToOneList] = useState<IChat[]>([]);
  let currentListOfNamesForAChat = useRef<chatNames[]>([]);
  //custom chat functions
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
  //Firestore hooks to listen in on new chats
  const [newestChat, ,] = useCollectionData(loadChat(), {idField: 'id'});

  //Local methods

  //Create records of a chatID and its corresponding list of participants
  const getParticipantNamesList = (
    chatID: string,
    participantIDList: string[],
  ): void => {
    //let chatTitle: string = '';

    // use map() to perform a fetch and handle the response for each url
    participantIDList.forEach((participantID) =>
      fetch(`${env.SERVER_LINK}/search/basicUserInfo`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: participantID}),
        credentials: 'include',
      })
        .then(async (response) => await response.json())
        .then((user) => {
          let chatNamePartial: string = user.first_name + ' ' + user.last_name;
          currentListOfNamesForAChat.current.push({
            chatID: chatID,
            chatName: chatNamePartial,
          });
        })
        .catch((error) => console.log(error)),
    );
  };

  // const createChatWithTitle = (chat: Chat, participantIDList: string[]) => {
  //   let allChatsWithTitles: IChat[];
  //   let chatTitle: string;

  //   let chat: IChat = chat;
  //   listOfNames.forEach(async (otherUserID, idx, array) => {
  //       let chatWithTitle: IChat;

  //       //When at last name in the chat, create a chat object
  //       if (idx === array.length - 1) {
  //         chatWithTitle = new Chat(
  //           chat.id,
  //           chat.participants,
  //           chat.createdAt,
  //           chat.roomName,
  //           chatTitle,
  //           chat.chatType,
  //           chat.viewedChat,
  //           chat.latestMessage
  //         );

  //         allChatsWithTitles.push(chatWithTitle);
  //       }
  //     });
  //    };

  // const buildChatName = (chats) => {
  //   chats.map(async (data) => {
  //     //Get other participants
  //     let otherUserIDs: string[] = [];
  //     data.participants.forEach((participant) => {
  //       if (participant !== user!.id) {
  //         otherUserIDs.push(participant);
  //       }
  //     });
  //   });
  // };

  const rebuildAllChatsWithNames = (data: Chat[]): IChat[] => {
    let rebuiltChatsWithNames: Chat[] = [];

    data.forEach((chat) => {
      rebuiltChatsWithNames.push(
        new Chat(
          chat.id,
          chat.participants,
          chat.createdAt,
          currentListOfNamesForAChat.current.find(
            (chatNameObject) => chatNameObject.chatID === chat.id,
          )?.chatName,
          chat.associatedClass,
          chat.chatType,
          chat.viewedChat,
          chat.latestMessage,
        ),
      );
    });

    return rebuiltChatsWithNames;
  };

  const appendChat = async (): Promise<void> => {};

  useEffect(() => {
    let userChatList: string[];
    if (user!.hasOwnProperty('student_info')) {
      userChatList = user!.student_info.chatrooms;
    } else {
      userChatList = user!.tutor_info.chatrooms;
    }

    userChatList = userChatList.filter((e) => e != '');

    console.log('MKC0: user chat list', userChatList);
    new DirectMessageChat()
      .displayUserChatrooms('direct', userChatList)
      .then((data) => {
        console.log('MKC2', data);
        //Recreate every chat with their respective names
        data.forEach((chat) =>
          getParticipantNamesList(chat.id, chat.participants),
        );
        let allRebuiltChats: IChat[] = rebuildAllChatsWithNames(data);
        console.log('MKC1', allRebuiltChats);

        return allRebuiltChats;
      })
      .then((finalRebuiltChats) => {
        //Set the one on one list
        setOneToOneList(finalRebuiltChats);
      })
      .catch((error) => console.log('MKC3:', error));

    new GroupChat()
      .displayUserChatrooms('group', userChatList)
      .then((data) => {
        //Recreate every chat with their respective names
        let allRebuiltChats: IChat[] = rebuildAllChatsWithNames(data);
        console.log('MKC1', allRebuiltChats);
        console.log('MKC2', data);
        return allRebuiltChats;
      })
      .then((finalRebuiltChats) => {
        //Set the group list
        setGroupList(finalRebuiltChats);
      })
      .catch((error) => console.log('MKC3:', error));
    console.log('group list', groupList);
    console.log('one to one list', oneToOneList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user!.id]);

  //Build and Add new chats that contain this user
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
