import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import BackButton from './BackButton';
import styles from './styles/MyChatStyles';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';

const ChatHeader: React.FC<NavigationInjectedPropsConfigured> = (props) => {
  return (
    <Layout style={styles.ChatHeader}>
      <Button
        appearance="ghost"
        onPress={(): boolean => props.navigation.goBack()}
        accessoryLeft={BackButton}
      />
      <Text style={styles.title}>My Chats</Text>
      <Text style={styles.placeholder}>Placeholder</Text>
    </Layout>
  );
};

export default ChatHeader;
