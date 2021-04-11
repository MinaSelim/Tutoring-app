import {Alert} from 'react-native';
import firebase from '../authentication/Fire';
import constants from './chatConstants';
import RequestUserChatrooms from './requests/RequestUserChatrooms';

export default class chatHelper {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  /**
   * Gets the chatroom data related to two specific users
   * @param currentUser The firebase UID of the current logged in user
   * @param otherUser The firebase UID of the user they want to chat with
   */
  public getOneOnOneChat = async (
    currentUser: string,
    otherUser: string,
  ): Promise<firebase.firestore.DocumentData> => {
    let userChatroomData: firebase.firestore.DocumentData = {};
    await firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .where(constants.participantsArray, 'array-contains', currentUser)
      .get()
      .then((docs) => {
        docs.forEach((documentSnapshot) => {
          documentSnapshot.data().participants.forEach((participant) => {
            if (participant === otherUser) {
              userChatroomData = documentSnapshot.data();
            }
          });
        });
      });
    return userChatroomData;
  };
  /*If a one on one chat already exists between the same two users, do not create a new chatroom
   * @param chatRef Specific chatroom reference
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsTokens An array of users firebase UID's for a given chat room
   * @param roomName The name of the chatroom
   * @param chatType Either group or null, defines the type of chatroom type
   */
  public generateChat = (
    chatRef: firebase.firestore.DocumentData,
    currentUserToken: string,
    participantsTokens: Array<string>,
    roomName: string,
    associatedClass: string,
    chatType: string,
  ): number => {
    if (Object.keys(chatRef).length === 0) {
      const viewedChat: Object = {};
      const viewedMsg: boolean = true;
      const notViewedMsg: boolean = false;
      participantsTokens.forEach((userId) => {
        if (userId === currentUserToken) {
          viewedChat[userId] = viewedMsg;
        } else {
          viewedChat[userId] = notViewedMsg;
        }
      });

      firebase
        .firestore()
        .collection(constants.chatroomCollection)
        .add({
          name: roomName,
          createdAt: new Date().getTime(),
          associatedClass,
          participants: participantsTokens,
          viewedChat,
          chatType,
          latestMessage: {
            content: `You have joined the room ${roomName}.`,
            sender: currentUserToken,
            createdAt: new Date().getTime().toString(),
          },
        })
        .then((docRef) => {
          // docRef.collection(constants.messageCollection).add({
          //   content: `You have joined the room ${roomName}.`,
          //   createdAt: new Date().getTime(),
          //   sender: currentUserToken,
          // });
          const chatID = docRef.id;
          const addChatrooms = new RequestUserChatrooms();
          addChatrooms.addStudentChatroom(currentUserToken, chatID);
          addChatrooms.addTutorChatroom(participantsTokens[1], chatID);
        });
      return constants.successfulResult;
    }
    Alert.alert('There is already a chat between the provided users');
    return constants.errorCodeChatAlreadyCreated;
  };

  /**
   * Changes the current user's viewed message status to true
   * @param chatroomID The unique chatroom identifier
   * @param currentUserToken The firebase UID of the current logged in user
   */
  public viewedChat = (chatroomID: string, currentUserToken: string): void => {
    const viewedMsg: boolean = true;
    firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .doc(chatroomID)
      .update({[`viewedChat.${currentUserToken}`]: viewedMsg});
  };

  public getChat = async (
    currentUserToken: string,
    otherParticipantToken: string,
    roomName: string,
    associatedClass: string,
    chatType: string,
  ): Promise<string> => {
    let userChatroomId: string = '';
    await firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .where(constants.participantsArray, 'array-contains', currentUserToken)
      .get()
      .then((docs) => {
        docs.forEach((documentSnapshot) => {
          documentSnapshot.data().participants.forEach((participant) => {
            if (participant === otherParticipantToken) {
              userChatroomId = documentSnapshot.id;
            }
          });
        });
      });

    if (userChatroomId === '') {
      this.generateChat(
        {},
        currentUserToken,
        [currentUserToken, otherParticipantToken],
        roomName,
        associatedClass,
        chatType,
      );
      let newUserChatroomId: Promise<string> = this.getChat(
        currentUserToken,
        otherParticipantToken,
        roomName,
        associatedClass,
        chatType,
      );
      return newUserChatroomId;
    }
    return userChatroomId;
  };
}
