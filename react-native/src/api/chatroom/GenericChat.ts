import constants from './chatConstants';
import firebase from '../authentication/Fire';
import Chatroom from './components/Chat';
import Message from './components/Message';
import chatHelper from './chatHelper';

interface chatMessages {
  id: string;
  value: firebase.firestore.DocumentData;
}
export default class GenericChat {
  /**
   * Displays the chatroom information that the current logged in user is a participant of
   * @param chatType is the type of chatrooms that is being requested
   * @param chatroomIds is the group of rooms that the active user is a part ofS
   */
  public displayUserChatrooms = async (
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
        if (
          snapshot.data() !== undefined &&
          chatType === snapshot.data().chatType
        ) {
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
        chatRef.value.roomName,
        chatRef.value.associatedClass,
        chatRef.value.chatType,
        chatRef.value.viewedChat,
        chatRef.value.latestMessage,
      );
      chatrooms.push(chatroom);
    });
    chatrooms.sort(function (x, y) {
      return +y.latestMessage.createdAt - +x.latestMessage.createdAt;
    });
    return chatrooms;
  };

  /**
   * Deletes a chatroom based on chatroomID, for the user that is currently logged in
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsToken An array of users firebase UID's
   * @param chatroomID The unique chatroom identifier
   */
  public deleteChatroom = (
    currentUserToken: string,
    participantsToken: Array<string>,
    chatroomID: string,
  ): void => {
    const convo: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firebase
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
  public sendMessage = (
    currentUserToken: string,
    chatroomID: string,
    message: string,
  ): void => {
    if (message && message !== '') {
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
            sender: currentUserToken,
            createdAt: new Date().getTime().toString(),
          },
        });
    }
  };

  /**
   * Get all of the messages for a specefic chat
   * @param chatroomID The unique chatroom identifier who messages will be displayed
   * @param currentUserToken The firebase UID of the current logged in user
   */
  public getAllMessages = async (
    chatroomID: string,
    currentUserToken: string,
  ): Promise<Message[]> => {
    const chatMessages: Array<chatMessages> = [];
    // eslint-disable-next-line new-cap
    const chatroomHelper = new chatHelper();
    chatroomHelper.viewedChat(chatroomID, currentUserToken);
    const convo: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .doc(chatroomID)
      .collection(constants.messageCollection)
      .orderBy('createdAt', 'desc');
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
   * Load specific messages based on the below parameters.
   * Mainly used on initial load of chatroom and when loading older messages.
   * @param chatroomID The unique chatroom identifier who messages will be displayed
   * @param currentUserToken The firebase UID of the current logged in user
   * @param offset the last message ID displayed in the chatroom
   * @param messageAmount How many messages we want to return from the query
   */
  public loadMessages = async (
    chatroomID: string,
    currentUserToken: string,
    offset: number,
    messageAmount: number,
  ): Promise<Message[]> => {
    const chatMessages: Array<chatMessages> = [];
    // eslint-disable-next-line new-cap
    const chatroomHelper = new chatHelper();
    chatroomHelper.viewedChat(chatroomID, currentUserToken);
    const convo: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .doc(chatroomID)
      .collection(constants.messageCollection)
      .orderBy('createdAt', 'desc')
      .startAfter(offset)
      .limit(messageAmount);
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
}
