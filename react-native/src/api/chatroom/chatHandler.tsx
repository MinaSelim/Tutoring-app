import constants from './chatConstants';
import firebase from '../authentication/Fire';
import Chatroom from './components/Chat';
import Message from './components/Message';

export default class chatHandler {
  /**
   * Displays the chatroom information that the current logged in user is a participant of
   * @param currentUserToken The firebase UID of the current logged in user
   * @param chatType is the type of chatrooms that is being requested
   * @param chatroomIds is the group of rooms that the active user is a part ofS
   */
  public static displayUserChatrooms = async (
    currentUserToken: string,
    chatType: string,
    chatroomIds: Array<string>,
  ): Promise<Chatroom[]> => {
    const userChatrooms: firebase.firestore.DocumentData[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const element of chatroomIds) {
      const ref: firebase.firestore.DocumentData = firebase
        .firestore()
        .collection(constants.chatroomCollection)
        .doc(element);

      // eslint-disable-next-line no-await-in-loop
      await ref.get().then((snapshot) => {
        if (chatType === snapshot.data().chatType) {
          userChatrooms.push({
            id: snapshot.id,
            value: snapshot.data(),
          });
        }
      });
    }
    const chatrooms: Chatroom[] = [];
    userChatrooms.forEach((chatRef) => {
      const chatroom = new Chatroom(
        chatRef.id,
        chatRef.value.participants,
        chatRef.value.createdAt,
        chatRef.value.name,
        chatRef.value.associatedClass,
        chatRef.value.chatType,
        chatRef.value.viewedChat,
        chatRef.value.latestMessage,
      );
      chatrooms.push(chatroom);
    });
    return chatrooms;
  };

  /**
   * Deletes a chatroom based on chatroomID, for the user that is currently logged in
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsToken An array of users firebase UID's
   * @param chatroomID The unique chatroom identifier
   */
  public static deleteChatroom = (
    currentUserToken: string,
    participantsToken: Array<string>,
    chatroomID: string,
  ): void => {
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
  };

  /**
   * Creates a new message within the firestore DB
   * @param currentUserToken The firebase UID of the current logged in user
   * @param chatroomID The unique chatroom identifier
   * @param message the message to be sent
   */
  public static sendMessage = (
    currentUserToken: string,
    chatroomID: string,
    message: string,
  ): void => {
    if (message !== undefined || message !== null) {
      firebase
        .firestore()
        .collection(constants.chatroomCollection)
        .doc(chatroomID)
        .collection(constants.messageCollection)
        .add({
          content: message,
          createdAt: new Date().getTime(),
          sender: currentUserToken,
        });

      firebase
        .firestore()
        .collection(constants.chatroomCollection)
        .doc(chatroomID)
        .update({
          latestMessage: {
            content: message,
            createdAt: new Date().getTime(),
          },
        });
    }
  };

  /**
   * Get all of the messages for a specefic chat
   * @param chatroomID The unique chatroom identifier who messages will be displayed
   */
  public static getAllMessages = async (
    chatroomID: string,
  ): Promise<Message[]> => {
    const chatMessages = [];
    const convo = firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .doc(chatroomID)
      .collection(constants.messageCollection);

    await convo.get().then((messageRef) => {
      messageRef.forEach((documentSnapshot) => {
        chatMessages.push({
          id: documentSnapshot.id,
          value: documentSnapshot.data(),
        });
      });
    });
    const messages: Message[] = [];
    chatMessages.forEach((messageRef) => {
      const message = new Message(
        messageRef.id,
        messageRef.value.content,
        messageRef.value.sender,
        messageRef.value.createdAt,
      );
      messages.push(message);
    });
    return messages;
  };

  /**
   * Changes the current user's viewed message status to true
   * @param chatroomID The unique chatroom identifier
   * @param currentUserToken The firebase UID of the current logged in user
   */
  public static viewedChat = (
    chatroomID: string,
    currentUserToken: string,
  ): void => {
    firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .doc(chatroomID)
      .update({[`viewedChat.${currentUserToken}`]: 'true'});
  };
}
