import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import BackButton from './BackButton';
import styles from './styles/MyChatStyles';

const ChatHeader = (): JSX.Element => (
  <Layout style={styles.ChatHeader}>
    <Button appearance="ghost" accessoryLeft={BackButton} />
    <Text style={styles.title}>My Chats</Text>
    <Text style={styles.placeholder}>Placeholder</Text>
  </Layout>
);

export default ChatHeader;
