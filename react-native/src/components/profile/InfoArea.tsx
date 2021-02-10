import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text} from '@ui-kitten/components';
import styles from './styles/ProfileStyles';
import {TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import useAuthUser from '../../hooks/authUser';
import IUser from '../../model/common/IUser';

const InfoArea = ({tempUser}): JSX.Element => {
  //TODO get user data

  return (
    <ScrollView contentContainerStyle={styles.infoArea}>
      <Text style={styles.text}>First name</Text>
      <TextInput
        placeholder={tempUser!.first_name}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.first_name = nextValue;
        }}
      />
      <Text style={styles.text}>Last name</Text>
      <TextInput
        placeholder={tempUser!.last_name}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.last_name = nextValue;
        }}
      />
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        placeholder={tempUser!.phone}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.phone = nextValue;
        }}
      />
      <Text style={styles.text}>Password</Text>
      <TouchableOpacity style={styles.passwordButton}>
        <Text style={styles.buttonText}>change password</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Description</Text>
      <TextInput
        placeholder="Description not yet available..."
        multiline={true}
        textAlignVertical="top"
        maxLength={500}
        scrollEnabled={true}
        style={styles.descriptionBox}
        //TODO add event when description added to user model
      />
      <Text style={styles.text}>ID</Text>
      <Text>{tempUser!.firebase_uid}</Text>
    </ScrollView>
  );
};

export default InfoArea;
