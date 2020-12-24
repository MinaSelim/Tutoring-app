import {Alert} from 'react-native';
import firebase from '../authentication/Fire';
import constants from '../constants';

const {FieldValue} = require('firebase-admin').firestore;

// to do: change function name to give more info
async function getChat(
  currentUserToken: String,
  otherUsersTokens: Array<String>,
): Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> {
  const chatRef = firebase
    .firestore()
    .collection(constants.chatroomCollection)
    .where(
      constants.participantsArray,
      'array-contains',
      currentUserToken ||
        otherUsersTokens.forEach(function (userTokens) {
          userTokens.toString();
        }),
    );
  let data = {};
  const chatrooms = [];

  try {
    const querySnapshot = await chatRef.get();
    querySnapshot.forEach((documentSnapshot) => {
      data = documentSnapshot.data();
      chatrooms[documentSnapshot.id].push(data);
    });
    return chatrooms;
  } catch (err) {
    Alert.alert(`Error getting documents: ${err}`);
  }
  return chatrooms;
}

function generateChat(
  chatRef: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >[],
  currentUserToken: String,
  otherUsersTokens: Array<String>,
  roomName: String,
): void {
  const Users = otherUsersTokens.push(currentUserToken);
  let chatAlreadyCreated = false;
  chatRef.forEach(function (documentRef) {
    if (documentRef.data().get('participants') === 2) {
      chatAlreadyCreated = true;
    }
  });

  if (
    chatRef === undefined ||
    !chatAlreadyCreated ||
    otherUsersTokens.length > 1
  ) {
    firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .add({
        name: roomName,
        participants: Users,
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

function createChatroom(
  currentUserToken: String,
  otherUsersTokens: Array<String>,
  roomName: String,
): void {
  getChat(
    currentUserToken,
    otherUsersTokens,
  ).then(
    (
      res: firebase.firestore.QueryDocumentSnapshot<
        firebase.firestore.DocumentData
      >[],
    ) => generateChat(res, currentUserToken, otherUsersTokens, roomName),
  );
}

function deleteChatroom(
  currentUserToken: string,
  chatParticipantTokens: Array<String>,
  chatroomID: string,
): void {
  const convo = firebase
    .firestore()
    .collection(constants.chatroomCollection)
    .doc(chatroomID);

  if (chatParticipantTokens.length > 1) {
    convo.update({
      participants: FieldValue.arrayRemove(currentUserToken),
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
      chatrooms[documentSnapshot.id].push(documentSnapshot.data());
    });
  });
  return chatrooms;
}

export default {displayUserChats, deleteChatroom, createChatroom};
