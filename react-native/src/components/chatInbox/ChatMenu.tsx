import React, {useState, useEffect, useMemo} from 'react';
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
import { auth } from 'firebase';

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
  const authUser = useAuthUser()[0];

  let [groupList, setGroupList] = useState<IChat[]>([]);
  let [oneToOneList, setOneToOneList] = useState<IChat[]>([]);
  const [currentListOfNamesForAChat, setCurrentListOfNamesForAChat] = useState<chatNames[]>([]);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
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
    // chatID: string,
    // participantIDList: string[],
    chats: IChat[]
  ): void => {
    //let chatTitle: string = '';
    
    // use map() to perform a fetch and handle the response for each url
       for(var i = 0; i <= chats.length; i++ ){
         if(!chats[i]) {
          setIsLoadingChats(false);
          break;
         }
        for(var j = 0; j <= chats[i].participants.length; j++){
          let participantID = chats[i].participants[j];
          let chatID = chats[i].id;
          if(participantID != authUser?.id){
            fetch(`${env.SERVER_LINK}/search/basicUserInfo`, {
             method: 'POST',
             headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
             },
             body: JSON.stringify({id: participantID}),
             credentials: 'include',
           })
             .then(async(response) => await response.json())
             .then((user) => {
               let chatNamePartial: string = user.first_name + ' ' + user.last_name;
               let chatNameObject = currentListOfNamesForAChat.find((chatNameObject) => chatNameObject.chatID == chatID);
               if(chatNameObject) {
                 //If object exists, rebuild chatName and replace object
                 chatNameObject.chatName = chatNameObject.chatName + ' ' + chatNamePartial;
                 let tempChatNameObject: chatNames[] = currentListOfNamesForAChat.filter((chatNameObject) => chatNameObject.chatID !== chatID);
                 tempChatNameObject.push(chatNameObject);
                 console.log('MKC-A: Before setting the listOfNames');
                 setCurrentListOfNamesForAChat(tempChatNameObject);
                 console.log('MKCB-A2: After setting the listOfNames', currentListOfNamesForAChat);
                 // currentListOfNamesForAChat.current = [];
                 // currentListOfNamesForAChat.current = tempChatNameObject;
               }
               else {
                 console.log('MKC-A: Before setting the listOfNames');
                 setCurrentListOfNamesForAChat([...currentListOfNamesForAChat, {chatID: chatID, chatName: chatNamePartial}])
                 console.log('MKCB-A2: After setting the listOfNames', currentListOfNamesForAChat);
               }
               setIsLoadingChats(false);
             })
             .catch((error) => console.log(error))
        
           }
         }
       }  
  };

  const rebuildAllChatsWithNames = (data: Chat[]): IChat[] => {
    let rebuiltChatsWithNames: Chat[] = [];
    data.forEach((chat) => {
      rebuiltChatsWithNames.push(
        new Chat(
          chat.id,
          chat.participants,
          chat.createdAt,
          // currentListOfNamesForAChat.find(
          //   (chatNameObject) => chatNameObject.chatID === chat.id,
          // )?.chatName,
          "Alice The Tutor",
          chat.associatedClass,
          chat.chatType,
          chat.viewedChat,
          chat.latestMessage,
        ),
      );
    });
    console.log('MKC-C: Get rebuilt chats', rebuiltChatsWithNames);
    return rebuiltChatsWithNames;
  };

  const appendChat = async (): Promise<void> => {};

  useEffect(() => {
    let userChatList: string[];
    if (authUser!.hasOwnProperty('student_info')) {
      userChatList = authUser!.student_info.chatrooms;
    } else {
      userChatList = authUser!.tutor_info.chatrooms;
    }

    userChatList = userChatList.filter((e) => e != '');

    console.log('MKC0: user chat list', userChatList);

      new DirectMessageChat()
      .displayUserChatrooms('direct', userChatList)
      .then((data) => {
        console.log('MKC1', data);
        //Recreate every chat with their respective names
        getParticipantNamesList(data),
       
        console.log('MKCB: Get participant names list', currentListOfNamesForAChat);
        let allRebuiltChats: IChat[] = rebuildAllChatsWithNames(data);
        console.log('MKC-D: Finished rebuilding chats', allRebuiltChats);
        return allRebuiltChats;
      })
      .then((rebuiltChats) => setOneToOneList(rebuiltChats))
      .catch((error) => console.log('MKC3:', error));

    new GroupChat()
      .displayUserChatrooms('group', userChatList)
      .then((data) => {
        //Recreate every chat with their respective names
        getParticipantNamesList(data);
        let allRebuiltChats: IChat[] = rebuildAllChatsWithNames(data);
        console.log('MKC1', allRebuiltChats);
        console.log('MKC2', data);

        return allRebuiltChats;
      })
      .then((rebuiltChats) => setGroupList(rebuiltChats))
      .catch((error) => console.log('MKC3:', error));
    console.log('group list', groupList);
    console.log('one to one list', oneToOneList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser!.id]);

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
            isLoadingChats={isLoadingChats}
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
            isLoadingChats={isLoadingChats}
          />
        )}
      />
    </Navigator>
  );
};

export default ChatMenu;
