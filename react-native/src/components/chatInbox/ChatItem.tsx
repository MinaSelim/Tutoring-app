import React from 'react';
import {Text, ListItem, Layout} from '@ui-kitten/components';
import IChatItem from 'model/chatInbox/IChatItem';
import styles from './styles/ChatItemStyles';
import ProfilePicture from '../common/profilePicture';
import UnreadHint from './UnreadHint';

const ChatItem: React.FunctionComponent<IChatItem> = ({
  item,
  navigation,
}: IChatItem): JSX.Element => (
  <ListItem
    style={styles.listItem}
    onPress={(): boolean => navigation.navigate('ChatUI', {chatID: item.id})}>
    <ProfilePicture />
    <Layout style={styles.textSection}>
      <Layout style={styles.header}>
        <Text>{item.roomName}</Text>
        <Text style={styles.classNumber}>{item.associatedClass}</Text>
      </Layout>
      <Text
        style={[
          styles.lastMessage,
          // replace condition with item.viewedChat[user.firebaseID]
          {color: false ? 'black' : '#A3A3A3'},
        ]}>
        {item.latestMessage.content}
      </Text>
    </Layout>
    <UnreadHint
      newMessage={false}
      // replace condition with item.viewedChat[user.firebaseID]
    />
  </ListItem>
);

export default ChatItem;
