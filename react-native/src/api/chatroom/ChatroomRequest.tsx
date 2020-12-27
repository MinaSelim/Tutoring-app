import firebase from '../authentication/Fire';
import constants from '../constants';

function sendMessage(currentUser, chatroomID, message): void {
  if (message !== undefined || message !== null) {
    firebase
      .firestore()
      .collection(constants.chatroomCollection)
      .doc(chatroomID)
      .collection(constants.messageCollection)
      .add({
        content: message,
        createdAt: new Date().getTime(),
        sender: currentUser,
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
