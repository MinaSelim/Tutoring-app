import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import ChatHeader from './ChatHeader';
import ChatMenu from './ChatMenu';

const MyChats = (): JSX.Element => {
  return (
    <Layout style={styles.mainFrame}>
      <ChatHeader />
      <ChatMenu />
      <Text style={styles.footer}> go.study </Text>
    </Layout>
  );
};

export default MyChats;
