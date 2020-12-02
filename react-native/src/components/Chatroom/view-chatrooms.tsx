import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function HomeScreen() {
  const db = firestore();

  function getUserChatrooms(documentSnapshot) {
    return documentSnapshot.get('participants');
  }

  const userChatrooms = db
    .collection('CHATROOMS')
    .where('participants', 'in', 'VogoCGGOuMOELLoq1imCr7cHkmp1')
    .get()
    .then((documentSnapshot) => getUserChatrooms(documentSnapshot))
    .then((chatrooms) => {
      console.log('Users chatrooms: ', chatrooms);
    });

  getUserChatrooms(documentSnapshot);

  return (
    <View style={styles.container}>
      <Text>Create chat room</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dee2eb',
  },
  title: {
    marginTop: 20,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2196F3',
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#aaa',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 5,
    width: 225,
  },
});
