import {Alert} from 'react-native';
import firebase from '../authentication/Fire';
import constants from '../constants';

// to do: change function name to give more info
async function getChat(
  currentUser: String,
  otherUser: String,
): Promise<Object> {
  const chatRef = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser || otherUser);
  let data = {};

  try {
    const querySnapshot = await chatRef.get();
    querySnapshot.forEach((documentSnapshot) => {
      data = documentSnapshot.data();
    });
    return data;
  } catch (err) {
    Alert.alert(`Error getting documents: ${err}`);
  }
  return data;
}

function generateChat(
  chatRef: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >[],
  currentUserToken: string,
  otherUsersTokens: Array<String>,
  roomName: string,
): void {
  if (chatRef === undefined || Object.keys(chatRef).length < 1) {
    firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .add({
        name: roomName,
        participants: otherUsersTokens,
        latestMessage: {
          content: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
        },
      })
      .then((docRef) => {
        docRef.collection(constants.messageCollection).add({
          content: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
          sender: currentUserToken,
        });
      });
  } else {
    Alert.alert('There is already a chat between the provided users');
  }
}

function createOneonOneChatroom(
  currentUserToken: string,
  participantsToken: string,
  roomName: string,
): void {
  getChat(
    currentUserToken,
    participantsToken,
  ).then(
    (
      res: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
      >[],
    ) =>
      generateChat(
        res,
        currentUserToken,
        [currentUserToken, participantsToken],
        roomName,
      ),
  );
}

function createGroupChatroom(
  currentUserToken: string,
  participantsToken: Array<String>,
  roomName: string,
): void {
  generateChat(undefined, currentUserToken, participantsToken, roomName);
}

function deleteChatroom(
  currentUserToken: string,
  participantsToken: Array<string>,
  chatroomID: string,
): void {
  const convo = firebase
    .firestore()
    .collection(constants.chatroomCollection)
    .doc(chatroomID);

  if (participantsToken.length > 1) {
    for (let i = 0; i < participantsToken.length; i += 1) {
      if (participantsToken[i] === currentUserToken) {
        participantsToken.splice(i, 1);
      }
    }
    convo.update({
      participants: participantsToken,
    });
  } else {
    convo.delete();
  }
}

async function displayUserChats(
  currentUserToken: string,
): Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> {
  const chatrooms = [];
  const chatRoomsRef = firebase
    .firestore()
    .collection(constants.chatroomCollection)
    .where(constants.participantsArray, 'array-contains', currentUserToken);

  await chatRoomsRef.get().then((s) => {
    s.forEach((documentSnapshot) => {
      chatrooms.push({id: documentSnapshot.id, value: documentSnapshot.data()});
    });
  });
  console.log(chatrooms);
  return chatrooms;
}

export default {
  displayUserChats,
  deleteChatroom,
  createGroupChatroom,
  createOneonOneChatroom,
};
