import {Alert} from 'react-native';
import firebase from '../authentication/Fire';

async function getChat(
  currentUser: String,
  alternateUser: String,
): Promise<Object> {
  const chatRef = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser || alternateUser);
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
  chatRef: firebase.firestore.Query<firebase.firestore.DocumentData>,
  currentUser: String,
  alternateUser: String,
  roomName: String,
): void {
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

function createChatroom(
  currentUser: String,
  alternateUser: String,
  roomName: String,
): void {
  getChat(
    currentUser,
    alternateUser,
  ).then((res: firebase.firestore.Query<firebase.firestore.DocumentData>) =>
    generateChat(res, currentUser, alternateUser, roomName),
  );
}

function deleteChatroom(currentUser: any, alternateUser: any): void {
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

async function displayUserChats(
  currentUser: String,
): Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> {
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
