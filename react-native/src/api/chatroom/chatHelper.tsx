import {Alert} from 'react-native';
import firebase from '../authentication/Fire';
import constants from './chatConstants';

export default class chatHelper {
  /**
   * Gets the chatroom data related to two specific users
   * @param currentUser The firebase UID of the current logged in user
   * @param otherUser The firebase UID of the user they want to chat with
   */
  public static getOneOnOneChat = async (
    currentUser: String,
    otherUser: String,
  ): Promise<firebase.firestore.DocumentData> => {
    const chatRef: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .where(
        constants.participantsArray,
        'array-contains',
        currentUser || otherUser,
      );
    let userChatroomData: firebase.firestore.DocumentData = null;

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
  };

  /**
   * Create a chatroom within the firestore DB.
   * If a one on one chat already exists between the same two users, do not create a new chatroom
   * @param chatRef Specific chatroom reference
   * @param currentUserToken The firebase UID of the current logged in user
   * @param otherUsersTokens An array of users firebase UID's
   * @param roomName The name of the chatroom
   * @param chatType Either group or null, defines the type of chatroom type
   */
  public static generateChat = (
    chatRef: firebase.firestore.QueryDocumentSnapshot<
      firebase.firestore.DocumentData
    >[],
    currentUserToken: string,
    participantsToken: Array<string>,
    roomName: string,
    associatedClass: string,
    chatType: string,
  ): void => {
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
          createdAt: new Date().getTime(),
          associatedClass,
          participants: participantsToken,
          viewedChat,
          chatType,
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
  };
}
