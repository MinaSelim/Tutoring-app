import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {User} from 'firebase';
import firebase from '../../api/authentication/Fire';

interface Message {
  content: string;
  sender: string;
  timestamp: Date;
}

interface Chats {
  roomName?: string;
  dateCreated?: Date;
  participants: User[];
  creator: User;
  admin?: User;
  Messages: Message[];
}

const defaultProps: Chats = {
  roomName: '',
  dateCreated: null,
  participants: null,
  creator: null,
  admin: null,
  Messages: null,
};

export default function CreateChatRoom() {
  const [roomName, setRoomName] = useState('');
  const currentUser = 'VogoCGGOuMOELLoq1imCr7cHkmp1';
  const tutorUser = 'AYZSCMSLtdbmJaXIUs3QnUURm572';

  // firebase.auth().currentUser;

  // function for current users chat sessions (based on their fire_uid)
  function getMessages(currentUser) {}

  function handleButtonPress() {
    firebase
      .firestore()
      .collection('CHATROOMS')
      .add({
        name: roomName,
        participants: {
          0: currentUser,
          1: tutorUser,
        },
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
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Thread Name"
        onChangeText={(roomName) => setRoomName(roomName)}
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Create chat room</Text>
      </TouchableOpacity>
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
