import firestore from '@react-native-firebase/firestore';
import {User} from 'firebase';
import React, {useState, Component} from 'react';
import firebase from '../../api/authentication/Fire';

function sendMessage(currentUser, alternateUser, message) {
  const convo = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', alternateUser);

  if (message.length > 0) {
    console.log(message);
    convo.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.collection('MESSAGES').add({
          content: message,
          createdAt: new Date().getTime(),
          sender: currentUser,
        });
      });
    });
  }
}

async function displayChat(currentUser, alternateUser) {
  const data = [];
  const docPromises: Promise<
    firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  >[] = [];

  const convo = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', alternateUser);

  const snapshots = await convo.get();
  snapshots.forEach(function (document) {
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
  // eslint-disable-next-line no-console
  console.debug(data);
  return data;
}
