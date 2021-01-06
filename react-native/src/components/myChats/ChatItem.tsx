import React from 'react';
import {Text, ListItem, Layout} from '@ui-kitten/components';
import IChatItem from 'model/myChats/IChatItem';
import styles from './styles/ChatItemStyles';
import ProfilePicture from './ProfilePicture';
import UnreadHint from './UnreadHint';

const ChatItem: React.FC<IChatItem> = (props): JSX.Element => (
  <ListItem
    style={styles.listItem}
    onPress={(): boolean =>
      props.navigation.navigate('ChatUI', {chatID: props.item.id})
    }>
    <ProfilePicture />
    <Layout style={styles.textSection}>
      <Layout style={styles.header}>
        <Text>{props.item.roomName}</Text>
        <Text style={styles.classNumber}>{props.item.associatedClass}</Text>
      </Layout>
      <Text
        style={[
          styles.lastMessage,
          // replace condition with item.viewedChat[user.firebaseID]
          {color: false ? 'black' : '#A3A3A3'},
        ]}>
        {props.item.latestMessage.content}
      </Text>
    </Layout>
    <UnreadHint
      newMessage={false}
      // replace condition with item.viewedChat[user.firebaseID]
    />
  </ListItem>
);

export default ChatItem;
