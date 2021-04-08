import React from 'react';
import {Avatar} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';

const UnreadHint = (props): JSX.Element => (
  <Avatar
    style={[
      styles.unreadHint,
      props.newMessage ? styles.hintShown : styles.hintHidden,
    ]}
    shape="round"
    source={require('../../assets/images/icons/notificationDot.png')}
  />
);

export default UnreadHint;
