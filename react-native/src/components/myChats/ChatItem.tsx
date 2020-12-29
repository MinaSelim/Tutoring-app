import React from 'react';
import {Text, ListItem, Layout} from '@ui-kitten/components';
import styles from './styles/ChatItemStyles';
import ProfilePicture from './ProfilePicture';
import UnreadHint from './UnreadHint';

const ChatItem = ({item}): JSX.Element => (
  <ListItem style={styles.listItem}>
    <ProfilePicture />
    <Layout style={styles.textSection}>
      <Layout style={styles.header}>
        <Text>{item.name}</Text>
        <Text style={styles.classNumber}>{item.classNumber}</Text>
      </Layout>
      <Text
        style={[
          styles.lastMessage,
          {color: item.newMessage ? 'black' : '#A3A3A3'},
        ]}>
        {item.lastMessage}
      </Text>
    </Layout>
    <UnreadHint newMessage={item.newMessage} />
  </ListItem>
);

export default ChatItem;
