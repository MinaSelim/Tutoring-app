/* eslint-disable */

import React from 'react';
import { View } from 'react-native';
import {Text, ListItem} from '@ui-kitten/components';
import styles from './styles/ChatItemStyles';
import ProfilePicture from './ProfilePicture';
import UnreadHint from './UnreadHint';

const ChatItem = ({item}) => (
  <ListItem style={styles.listItem}>
    <ProfilePicture />
    <View style={styles.textSection}>
      <View style={styles.header}>
        <Text>{item.name}</Text>
        <Text
          style={styles.classNumber}>
          {item.classNumber}
        </Text>
      </View>
      <Text
        style={[styles.classNumber, {color: item.newMessage ? 'black' : '#A3A3A3'}]}>
        {item.lastMessage}
      </Text>
    </View>
    <UnreadHint newMessage={item.newMessage} />
  </ListItem>
);

export default ChatItem;
