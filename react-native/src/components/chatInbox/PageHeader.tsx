import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import BackButton from '../common/backButton';
import constants from '../../constants';
import styles from './styles/MyChatStyles';

const PageHeader = (props): JSX.Element => {
  return (
    <Layout style={styles.ChatListHeader}>
      <BackButton {...props} />
      <Text style={styles.title}>{constants.chatInbox.pageHeader.myChats}</Text>
      <Text style={styles.placeholder}>
        {constants.chatInbox.pageHeader.placeholder}
      </Text>
    </Layout>
  );
};

export default PageHeader;
