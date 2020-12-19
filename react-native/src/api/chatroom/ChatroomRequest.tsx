import firebase from '../authentication/Fire';

function sendMessage(currentUser, alternateUser, message) {
  const convo = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser || alternateUser);

  if (message.length > 0) {
    convo.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.collection('MESSAGES').add({
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

async function displayChat(currentUser, alternateUser) {
  const data = [];
  const docPromises: Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  >[] = [];

  const convo = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser || alternateUser);

  const snapshots = await convo.get();
  snapshots.forEach((document) => {
    const prom = document.ref.collection('MESSAGES').get();
    docPromises.push(prom);
  });

  const docsResolvedPromises = await Promise.all(docPromises);
  for (let i = 0; i < docsResolvedPromises.length; i += 1) {
    const docs = docsResolvedPromises[i];
    docs.forEach((doc) => {
      data.push(doc.data());
    });
  }
  return data;
}

export default {sendMessage, displayChat};
