import 'react-native-gesture-handler';
import React from 'react';
import {Text} from '@ui-kitten/components';
import styles from './styles/ProfileStyles';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  View,
} from 'react-native';
import IUser from '../../model/common/IUser';

interface IInfoArea {
  tempUser: IUser;
  userType: string;
}

const InfoArea: React.FunctionComponent<IInfoArea> = ({
  tempUser,
  userType,
}): JSX.Element => {
  return (
    <ScrollView contentContainerStyle={styles.infoArea}>
      <Text style={styles.text}>First name</Text>
      <TextInput
        defaultValue={tempUser!.first_name}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.first_name = nextValue;
        }}
      />

      <Text style={styles.text}>Last name</Text>
      <TextInput
        defaultValue={tempUser!.last_name}
        style={styles.inputBox}
        onChangeText={(nextValue): void => {
          tempUser!.last_name = nextValue;
        }}
      />
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        defaultValue={tempUser!.phone}
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
      <View
        style={userType.includes('student') ? styles.hiddenDescription : null}>
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
      </View>
      <Text style={styles.text}>ID</Text>
      <Text>{tempUser!.firebase_uid}</Text>
    </ScrollView>
  );
};

export default InfoArea;
