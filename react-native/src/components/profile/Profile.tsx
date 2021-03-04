import 'react-native-gesture-handler';
import {Text, Button, Icon, Avatar} from '@ui-kitten/components';
import {View, TouchableOpacity, Modal, Alert} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import React, {useState} from 'react';
import InfoArea from './InfoArea';
import styles from './styles/ProfileStyles';
import buttonStyles from '../common/sideBar/styles/styles';
import UserUpdate from '../../api/profile/UserUpdate';
import useAuthUser from '../../hooks/authUser';
import IUser from '../../model/common/IUser';
import useUserType from '../../hooks/userType';
import {useTheme} from '@ui-kitten/components';
import constants from '../../constants';
import errors from '../../constants/errors';

const Profile = (): JSX.Element => {
  const theme = useTheme();
  const [actualUser, setAuthUser] = useAuthUser();
  let tempUser: IUser = JSON.parse(JSON.stringify(actualUser));
  const userType = JSON.stringify(useUserType()[0]);
  const [isProfileVisible, setProfileVisibility] = useState(false);
  const PersonIcon = (props): JSX.Element => (
    <Icon {...props} name="person-outline" />
  );
  const CloseButtonIcon = (): JSX.Element => {
    return (
      <Icon
        fill={theme['color-basic-1000']}
        name="close-outline"
        style={styles.closeButton}
      />
    );
  };
  const validChange = (): boolean => {
    if (tempUser!.first_name === '' || tempUser!.last_name === '') {
      Alert.alert(errors.profile.emptyName);
      return false;
    }
    if (tempUser!.first_name.match(/\d/) || tempUser!.last_name.match(/\d/)) {
      Alert.alert(errors.profile.nameContainsNumber);
      return false;
    }
    if (isNaN(tempUser!.phone)) {
      Alert.alert(errors.profile.phoneNonDigits);
      return false;
    }
    return true;
  };
  const updateUser = async (): Promise<void> => {
    if (!validChange()) return;
    try {
      const user = await UserUpdate.updateUserInfo(
        tempUser,
        userType, //TODO replace this by userType in future user model
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
            Alert.alert(errors.profile.userInfo);
          } else {
            setProfileVisibility(true);
          }
        }}
        style={buttonStyles.button}
        appearance="ghost"
        status="control"
        accessoryLeft={PersonIcon}
        size="giant">
        {constants.commonComponents.sidebar.profile}
      </Button>
      <Modal visible={isProfileVisible} transparent={true} animationType="fade">
        <SafeAreaView forceInset={{bottom: 'never'}} style={styles.safeArea}>
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
                <Text style={styles.title}>{constants.profile.profile}</Text>
                <Button
                  appearance="ghost"
                  size="giant"
                  style={styles.saveButton}
                  onPress={(): Promise<void> => updateUser()}>
                  {constants.profile.save}
                </Button>
              </View>
              <TouchableOpacity>
                <Avatar
                  shape="round"
                  size="large"
                  style={styles.profilePicture}
                  source={require('../../assets/icons/annak_sample.png')}
                />
              </TouchableOpacity>
            </View>
            <InfoArea tempUser={tempUser} userType={userType} />
            <TouchableOpacity style={styles.termsAndConditionsButton}>
              {/* TODO Add link for terms and conditions */}
              <Text style={styles.text}>
                {constants.profile.termsAndConditions}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default Profile;
