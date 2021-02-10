import 'react-native-gesture-handler';
import {Text, Button, Icon, Avatar} from '@ui-kitten/components';
import {View, TouchableOpacity, Modal, Alert} from 'react-native';
import React, {useState} from 'react';
import InfoArea from './InfoArea';
import styles from './styles/ProfileStyles';
import buttonStyles from '../sideBar/styles/styles';
import UserUpdate from '../../api/profile/UserUpdate';
import useAuthUser from '../../hooks/authUser';
import IUser from '../../model/common/IUser';

const Profile = (): JSX.Element => {
  let tempUser:
    | IUser
    | ((user: IUser | null) => void)
    | null = useAuthUser()[0];
  const [isProfileVisible, setProfileVisibility] = useState(false);
  const PersonIcon = (props): JSX.Element => (
    <Icon {...props} name="person-outline" />
  );
  const CloseButtonIcon = (): JSX.Element => {
    return (
      <Icon fill="#363636" name="close-outline" style={styles.closeButton} />
    );
  };
  const updateUser = async (): Promise<void> => {
    try {
      const user = await UserUpdate.updateUserInfo(tempUser);
      console.log('response ' + JSON.stringify(user));
      setProfileVisibility(false);
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };
  return (
    <View>
      <Button
        onPress={(): void => {
          if (tempUser == null) {
            Alert.alert(
              'There was an problem accessing your user information.',
            );
          } else setProfileVisibility(true);
        }}
        style={buttonStyles.button}
        appearance="ghost"
        status="control"
        accessoryLeft={PersonIcon}
        size="giant">
        Profile
      </Button>
      <Modal visible={isProfileVisible} transparent={true} animationType="fade">
        <View style={styles.background} />
        <View style={styles.modal}>
          <View>
            <View style={styles.ProfileHeader}>
              <Button
                appearance="ghost"
                accessoryLeft={CloseButtonIcon}
                onPress={(): void => setProfileVisibility(false)}
              />
              <Text style={styles.title}>Profile</Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={(): Promise<void> => updateUser()}>
                <Text style={styles.title}>Save</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Avatar
                shape="round"
                size="large"
                style={styles.profilePicture}
                source={require('../../assets/images/icons/user.png')}
              />
            </TouchableOpacity>
          </View>
          <InfoArea tempUser={tempUser} />
          <TouchableOpacity style={styles.termsAndConditionsButton}>
            {/* TODO Add link for terms and conditions */}
            <Text style={styles.text}>Terms & Conditions</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
