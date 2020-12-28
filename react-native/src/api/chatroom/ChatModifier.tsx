import {string} from 'prop-types';
import {Alert} from 'react-native';
import firebase from '../authentication/Fire';
import constants from '../constants';

/**
 * Gets the chatroom data related to two specific users
 * @param currentUser The firebase UID of the current logged in user
 * @param otherUser The firebase UID of the user they want to chat with
 */
async function getOneOnOneChat(
  currentUser: String,
  otherUser: String,
): Promise<Object> {
  const chatRef = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser || otherUser);
  let userChatroomData = {};

  try {
    const querySnapshot = await chatRef.get();
    querySnapshot.forEach((documentSnapshot) => {
      userChatroomData = documentSnapshot.data();
    });
    return userChatroomData;
  } catch (err) {
    Alert.alert(`Error getting documents: ${err}`);
  }
  return userChatroomData;
}

/**
 * Create a chatroom within the firestore DB.
 * If a one on one chat already exists between the same two users, do not create a new chatroom
 * @param chatRef Specific chatroom reference
 * @param currentUserToken The firebase UID of the current logged in user
 * @param otherUsersTokens An array of users firebase UID's
 * @param roomName The name of the chatroom
 */
function generateChat(
  chatRef: firebase.firestore.QueryDocumentSnapshot<
    firebase.firestore.DocumentData
  >[],
  currentUserToken: string,
  participantsToken: Array<string>,
  roomName: string,
  associatedClass: string,
): void {
  if (chatRef === undefined || Object.keys(chatRef).length < 1) {
    const viewedChat = {};
    participantsToken.forEach((userID) => {
      viewedChat[userID] = 'false';
    });

    firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .add({
        name: roomName,
        associatedClass,
        participants: participantsToken,
        viewedChat,
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

/**
 * Creates a one on one chatroom between two different users
 * @param currentUserToken The firebase UID of the current logged in user
 * @param participantsToken The firebase UID of another user
 * @param roomName The name of the chatroom
 */
function createOneonOneChatroom(
  currentUserToken: string,
  participantsToken: string,
  roomName: string,
  associatedClass: string,
): void {
  getOneOnOneChat(
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
        associatedClass,
      ),
  );
}

/**
 * Creates a groupchat with multiple users (more than 2)
 * @param currentUserToken The firebase UID of the current logged in user
 * @param participantsToken An array of users firebase UID's
 * @param roomName The name of the chatroom
 */
function createGroupChatroom(
  currentUserToken: string,
  participantsToken: Array<string>,
  roomName: string,
  associatedClass: string,
): void {
  generateChat(
    undefined,
    currentUserToken,
    participantsToken,
    roomName,
    associatedClass,
  );
}

/**
 * Deletes a chatroom based on chatroomID, for the user that is currently logged in
 * @param currentUserToken The firebase UID of the current logged in user
 * @param participantsToken An array of users firebase UID's
 * @param chatroomID The unique chatroom identifier
 */
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

/**
 * Displays the chatroom information that the current logged in user is a participant of
 * @param currentUserToken The firebase UID of the current logged in user
 */
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

  await chatRoomsRef.get().then((snapshot) => {
    snapshot.forEach((documentSnapshot) => {
      chatrooms.push({id: documentSnapshot.id, value: documentSnapshot.data()});
    });
  });
  return chatrooms;
}

function displayOneOnOneChats(
  currentUserToken: string,
  groupChat: boolean,
  // chatroomIds: Array<string>,
): any {
  const oneOnOneChats = [];
  const userChatrooms: firebase.firestore.DocumentData[] = [];
  // let participants = {};
  const chatroomIds = ['3ILGb4uTptDLWxLW14FJ', 'LO9Z2SkqJtVdoj8H1ofR'];
  const chatRoomsRef: firebase.firestore.DocumentData[] = [];
  chatroomIds.forEach(async (element) => {
    const ref: firebase.firestore.DocumentData = firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .doc(element);

    chatRoomsRef.push(ref);
  });

  chatRoomsRef.forEach(async (element) => {
    await element.get().then((snapshot) => {
      userChatrooms.push({
        id: snapshot.id,
        value: snapshot.data(),
      });
      console.log('userchats push: ', userChatrooms);
    });
  });

  console.log('userchats: ', userChatrooms);
  // await chatRoomsRef.get().then((snapshot) => {
  //   snapshot.forEach((documentSnapshot) => {
  //     participants = documentSnapshot.data();
  //     participants = participants['participants'];
  //     if (Object.keys(participants).length === 2 && groupChat === false) {
  //       console.log('ONLY TWO BIATCH!');
  //       oneOnOneChats.push({
  //         id: documentSnapshot.id,
  //         value: documentSnapshot.data(),
  //       });
  //     } else {
  // oneOnOneChats.push({
  //         id: documentSnapshot.id,
  //         value: documentSnapshot.data(),
  //       });
  //     }
  //   });
  // });
  console.log('userchats: ', userChatrooms);
  return userChatrooms;
}

export default {
  displayUserChats,
  deleteChatroom,
  createGroupChatroom,
  createOneonOneChatroom,
  displayOneOnOneChats,
};
