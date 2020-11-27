import React from 'react';
import {Image} from 'react-native';
import styles from './styles/HomeStyles';

export const MessageIcon = () => {
  return (
    <Image
      source={require('../../assets/images/icons/myChats.png')}
      style={styles.myChatsIcon}
    />
  );
};

export default MessageIcon;
