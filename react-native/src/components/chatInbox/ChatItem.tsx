import React from 'react';
import {Text, ListItem, Layout} from '@ui-kitten/components';
import IChatItem from 'model/chatInbox/IChatItem';
import styles from './styles/ChatItemStyles';
import ProfilePicture from '../common/profilePicture';
import UnreadHint from './UnreadHint';
import useAuthUser from '../../hooks/authUser';

const ChatItem: React.FunctionComponent<IChatItem> = ({
  item,
  navigation,
}: IChatItem): JSX.Element => {
  const user = useAuthUser()[0];
  return (
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
          style={
            item.viewedChat[user!.firebaseID]
              ? styles.lastMessageSeen
              : styles.lastMessageUnseen
          }>
          {item.latestMessage.content}
        </Text>
      </Layout>
      <UnreadHint newMessage={item.viewedChat[user!.firebaseID]} />
    </ListItem>
  );
};

export default ChatItem;
