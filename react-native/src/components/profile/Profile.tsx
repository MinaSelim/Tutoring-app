import 'react-native-gesture-handler';
import {Text, Button, Icon, Avatar} from '@ui-kitten/components';
import {View, TouchableOpacity, Modal, SafeAreaView} from 'react-native';
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
    <View>
      <Button onPress={(): void => setProfileVisibility(true)}>
        TOGGLE MODAL
      </Button>

      <Modal visible={isProfileVisible} transparent={true} animationType="fade">
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
        <View style={styles.modal}>
          <View>
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
          </View>

          <InfoArea />

          <View style={styles.termsAndConditionsBox}>
            <TouchableOpacity>
              {/* TODO Add link for terms and conditions */}
              <Text style={styles.text}>Terms & Conditions</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
