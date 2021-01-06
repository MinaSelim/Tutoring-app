import 'react-native-gesture-handler';
import {Text, Button, Modal, Icon, Avatar} from '@ui-kitten/components';
import {View} from 'react-native';
import React, {useState} from 'react';
import InfoArea from './InfoArea';
import styles from './styles/ProfileStyles';

const Profile = (): JSX.Element => {
  const [isProfileVisible, setProfileVisibility] = useState(false);

  const CloseButtonIcon = (): JSX.Element => {
    return (
      <Icon fill="#363636" name="close-outline" style={styles.closeButton} />
    );
  };

  return (
    <View style={styles.container}>
      <Button onPress={(): void => setProfileVisibility(true)}>
        TOGGLE MODAL
      </Button>

      <Modal
        visible={isProfileVisible}
        backdropStyle={styles.backdrop}
        style={styles.modal}
        onBackdropPress={(): void => setProfileVisibility(false)}>
        <View style={styles.ProfileHeader}>
          <Button
            appearance="ghost"
            accessoryLeft={CloseButtonIcon}
            onPress={(): void => setProfileVisibility(false)}
          />
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.placeholder}>Placeholder</Text>
        </View>
        <Avatar
          shape="round"
          size="large"
          style={styles.profilePicture}
          source={require('../../assets/images/icons/user.png')}
        />
        <InfoArea />
      </Modal>
    </View>
  );
};

export default Profile;
