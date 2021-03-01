import React from 'react';
import {Avatar} from '@ui-kitten/components';
import styles from '../../chatInbox/styles/MyChatStyles';

const ProfilePicture = (): JSX.Element => (
  // TODO replace with actual images
  <Avatar
    style={styles.profilePicture}
    shape="round"
    size="large"
    source={require('../../assets/images/icons/temporaryAvatar.png')}
  />
);

export default ProfilePicture;
