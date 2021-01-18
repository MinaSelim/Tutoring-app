import 'react-native-gesture-handler';
import React from 'react';
import {Text} from '@ui-kitten/components';
import styles from './styles/ProfileStyles';
import {TextInput, TouchableOpacity, ScrollView} from 'react-native';

const InfoArea = (): JSX.Element => {
  //TODO get user data

  const [firstName, setFirstName] = React.useState('Alex');
  const [lastName, setLastName] = React.useState('Rodrigez');
  const [email, setEmail] = React.useState('test@gmail.com');

  return (
    <ScrollView contentContainerStyle={styles.infoArea}>
      <Text style={styles.text}>First name</Text>
      <TextInput
        placeholder={firstName}
        value={firstName}
        style={styles.inputBox}
        onChangeText={(nextValue): void => setFirstName(nextValue)}
      />
      <Text style={styles.text}>Last name</Text>
      <TextInput
        placeholder={lastName}
        style={styles.inputBox}
        value={lastName}
        onChangeText={(nextValue): void => setLastName(nextValue)}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        placeholder={email}
        style={styles.inputBox}
        value={email}
        onChangeText={(nextValue): void => setEmail(nextValue)}
      />
      <Text style={styles.text}>Password</Text>
      <TouchableOpacity style={styles.passwordButton}>
        <Text style={styles.passwordButtonText}>change password</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Description</Text>
      <TextInput
        placeholder="Describe yourself..."
        multiline={true}
        textAlignVertical="top"
        maxLength={500}
        scrollEnabled={true}
        style={styles.descriptionBox}
        //onEndEditing
      />
      <Text style={styles.text}>ID</Text>
      {/* TODO put real id */}
      <Text>123456789</Text>
    </ScrollView>
  );
};

export default InfoArea;