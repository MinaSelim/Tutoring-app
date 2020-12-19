import {Alert} from 'react-native';
import firebase from '../authentication/Fire';

function getChat(currentUser, alternateUser) {
  const chatRef = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser || alternateUser);
  let data = {};

  return chatRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        data = documentSnapshot.data();
      });
      return data;
    })
    .catch((err) => {
      Alert.alert(`Error getting documents: ${err}`);
    });
}

function generateChat(
  chatRef: firebase.firestore.Query<firebase.firestore.DocumentData>,
  currentUser,
  alternateUser,
  roomName,
) {
  if (chatRef === undefined || Object.keys(chatRef).length < 1) {
    firebase
      .firestore()
      .collection('CHATROOMS')
      .add({
        name: roomName,
        participants: [currentUser, alternateUser],
        latestMessage: {
          content: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
        },
      })
      .then((docRef) => {
        docRef.collection('MESSAGES').add({
          content: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
          sender: currentUser,
        });
      });
  } else {
    Alert.alert('There is already a chat between the provided users');
  }
}

function createChatroom(currentUser, alternateUser, roomName) {
  getChat(
    currentUser,
    alternateUser,
  ).then((res: firebase.firestore.Query<firebase.firestore.DocumentData>) =>
    generateChat(res, currentUser, alternateUser, roomName),
  );
}

function deleteChatroom(currentUser, alternateUser): void {
  const convo = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser || alternateUser);

  convo.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref
        .collection('MESSAGES')
        .get()
        .then((Snapshot) => {
          Snapshot.forEach((element) => {
            element.ref.delete();
          });
          doc.ref.delete();
        });
    });
  });
}

async function displayUserChats(currentUser) {
  const data = [];
  const chatRoomsRef = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser);

  await chatRoomsRef.get().then((s) => {
    s.forEach((documentSnapshot) => {
      data.push(documentSnapshot.data());
    });
  });
  return data;
}

export default {displayUserChats, deleteChatroom, createChatroom};
