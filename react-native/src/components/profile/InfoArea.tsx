import 'react-native-gesture-handler';
import React from 'react';
import {Text} from '@ui-kitten/components';
import styles from './styles/ProfileStyles';
import {TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import useAuthUser from '../../hooks/authUser';

const InfoArea = ({tempUser}): JSX.Element => {
  return (
    <ScrollView contentContainerStyle={styles.infoArea}>
      <Text style={styles.text}>First name</Text>
      <TextInput
        placeholder={useAuthUser()[0]!.first_name}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.first_name = nextValue;
        }}
      />
      <Text style={styles.text}>Last name</Text>
      <TextInput
        placeholder={useAuthUser()[0]!.last_name}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.last_name = nextValue;
        }}
      />
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        placeholder={useAuthUser()[0]!.phone}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.phone = nextValue;
        }}
      />
      <Text style={styles.text}>Password</Text>
      <TouchableOpacity
        style={styles.passwordButton}
        onPress={(): void => Alert.alert('Currently unavailable')}>
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
      <Text>{useAuthUser()[0]!.firebase_uid}</Text>
    </ScrollView>
  );
};

export default InfoArea;
