import firebase from '../authentication/Fire';
import constants from '../constants';

function sendMessage(currentUser, alternateUser, message): void {
  const convo = firebase
    .firestore()
    .collection(constants.chatroomCollection)
    .where('participants', 'array-contains', currentUser || alternateUser);

  if (message.length > 0) {
    convo.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.collection(constants.messageCollection).add({
          content: message,
          createdAt: new Date().getTime(),
          sender: currentUser,
        });
      });
    });
  }

  convo.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.update({
        latestMessage: {
          content: message,
          createdAt: new Date().getTime(),
        },
      });
    });
  });
}

async function getAllMessages(
  currentUser,
  alternateUser,
): Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> {
  const chatMessages = [];
  const docPromises: Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  >[] = [];

  const convo = firebase
    .firestore()
    .collection(constants.chatroomCollection)
    .where('participants', 'array-contains', currentUser || alternateUser);

  const snapshots = await convo.get();
  snapshots.forEach((document) => {
    const prom = document.ref.collection(constants.messageCollection).get();
    docPromises.push(prom);
  });

  const docsResolvedPromises = await Promise.all(docPromises);
  for (let i = 0; i < docsResolvedPromises.length; i += 1) {
    const docs = docsResolvedPromises[i];
    docs.forEach((doc) => {
      chatMessages.push(doc.data());
    });
  }
  return chatMessages;
}

export default {sendMessage, getAllMessages};
