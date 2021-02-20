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
import useUserType from '../../hooks/userType';

const Profile = (): JSX.Element => {
  const [actualUser, setAuthUser] = useAuthUser();
  let tempUser: IUser | ((user: IUser | null) => void) | null = JSON.parse(
    JSON.stringify(actualUser),
  );
  const userType = useUserType()[0];
  const [isProfileVisible, setProfileVisibility] = useState(false);
  const PersonIcon = (props): JSX.Element => (
    <Icon {...props} name="person-outline" />
  );
  const CloseButtonIcon = (): JSX.Element => {
    return (
      <Icon fill="#363636" name="close-outline" style={styles.closeButton} />
    );
  };
  const validChange = (): boolean => {
    if (tempUser!.first_name === '' || tempUser!.last_name === '') {
      Alert.alert(
        'Your name cannot be empty. \nPlease retry with a valid change.',
      );
      return false;
    }
    if (isNaN(tempUser!.phone)) {
      Alert.alert(
        'Your phone number must only contain digits. \nPlease retry with a valid change.',
      );
      return false;
    }
    return true;
  };
  const updateUser = async (): Promise<void> => {
    if (!validChange()) return;
    try {
      const user = await UserUpdate.updateUserInfo(
        tempUser,
        JSON.stringify(userType), //TODO replace this by userType in future user model
      );
      setAuthUser(user);
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
          } else {
            setProfileVisibility(true);
          }
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
                onPress={(): void => {
                  setProfileVisibility(false);
                }}
              />
              <Text style={styles.title}>Profile</Text>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={(): void => {
                  updateUser();
                }}>
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
