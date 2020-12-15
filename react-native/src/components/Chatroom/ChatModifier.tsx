import firestore from '@react-native-firebase/firestore';
import {User} from 'firebase';
import React, {useState, Component} from 'react';
import firebase from '../../api/authentication/Fire';

function getChat(currentUser, alternateUser) {
  const chatRef = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', alternateUser);
  let data = {};

  return chatRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        data = documentSnapshot.data();
        console.log(data);
      });
      return data;
    })
    .catch((err) => {
      console.error('Error getting documents', err);
    });
}

function generateChat(chatRef, currentUser, alternateUser, roomName) {
  if (Object.keys(chatRef).length < 1) {
    this.db
      .collection('CHATROOMS')
      .add({
        name: roomName,
        participants: [currentUser, alternateUser],
        latestMessage: {
          content: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
        },
      })
      .then((docRef) => {
        docRef.collection('MESSAGES').add({
          content: `You have joined the room ${roomName}.`,
          createdAt: new Date().getTime(),
          sender: currentUser,
        });
      });
  } else {
    console.log('There is already a chat between the provided users');
  }
}

function createChatroom(currentUser, alternateUser, roomName) {
  const userChatRef = this.getChat(currentUser, alternateUser).then((res) =>
    generateChat(res, currentUser, alternateUser, roomName),
  );
}

function deleteChatroom(alternateUser): void {
  const convo = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', alternateUser);

  convo.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.id, '=>', doc.data());
      doc.ref
        .collection('MESSAGES')
        .get()
        .then(function (Snapshot) {
          Snapshot.forEach(function (element) {
            element.ref.delete();
            console.log('Delete');
          });
          doc.ref.delete();
        });
    });
  });
}

async function displayUserChats(currentUser) {
  const data = [];
  const chatRoomsRef = firebase
    .firestore()
    .collection('CHATROOMS')
    .where('participants', 'array-contains', currentUser);

  const snapshot = await chatRoomsRef.get().then((s) => {
    s.forEach((documentSnapshot) => {
      data.push(documentSnapshot.data());
    });
  });
  console.log(data);
  return data;
}
