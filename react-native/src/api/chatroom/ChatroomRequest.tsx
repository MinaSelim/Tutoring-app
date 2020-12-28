import firebase from '../authentication/Fire';
import constants from '../constants';

/**
 * Creates a new message within the firestore DB
 * @param currentUserToken The firebase UID of the current logged in user
 * @param chatroomID The unique chatroom identifier
 * @param message the message to be sent
 */
function sendMessage(currentUserToken, chatroomID, message): void {
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
}

/**
 * Get all of the messages for a specefic chat
 * @param chatroomID The unique chatroom identifier who messages will be displayed
 */
async function getAllMessages(
  chatroomID,
): Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> {
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
  return chatMessages;
}

export default {sendMessage, getAllMessages};
