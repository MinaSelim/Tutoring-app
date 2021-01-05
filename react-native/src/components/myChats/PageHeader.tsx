import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import BackButton from './BackButton';
import styles from './styles/MyChatStyles';

const PageHeader = (props): JSX.Element => {
  return (
    <Layout style={styles.ChatListHeader}>
      <BackButton {...props} />
      <Text style={styles.title}>My Chats</Text>
      <Text style={styles.placeholder}>Placeholder</Text>
    </Layout>
  );
};

export default PageHeader;
