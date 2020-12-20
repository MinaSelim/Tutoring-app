/* eslint-disable */

import React from 'react';
import {
  Avatar
} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';

const UnreadHint = (props) => (
  <Avatar
    style={[styles.unreadHint, {opacity: props.newMessage ? 1 : 0}]}
    shape="round"
    source={require('../../assets/images/icons/notificationDot.png')}
  />
);

export default UnreadHint;
