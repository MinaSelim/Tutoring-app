import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import BackButton from '../common/backButton';
import constants from '../../constants';
import styles from './styles/MyChatStyles';

const PageHeader = (props): JSX.Element => {
  return (
    <Layout style={styles.ChatListHeader}>
      <BackButton
        navigate={props.navigate}
        toggleDrawer={props.toggleDrawer}
        goBack={props.navigation.goBack}
        navigation={props.navigation}
      />
      <Text style={styles.title}>{constants.chatInbox.pageHeader.myChats}</Text>
      <Text style={styles.placeholder}>
        {constants.chatInbox.pageHeader.placeholder}
      </Text>
    </Layout>
  );
};

export default PageHeader;
