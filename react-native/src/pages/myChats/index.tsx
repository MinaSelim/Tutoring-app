import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import styles from '../../components/myChats/styles/MyChatStyles';
import PageHeader from '../../components/myChats/PageHeader';
import ChatMenu from '../../components/myChats/ChatMenu';

const MyChats = (props): JSX.Element => {
  return (
    <Layout style={styles.mainFrame}>
      <PageHeader
        navigation={props.navigation}
        navigate={props.navigate}
        goBack={props.goBack}
      />
      <ChatMenu
        navigation={props.navigation}
        navigate={props.navigate}
        goBack={props.goBack}
      />
      <Text style={styles.footer}> go.study </Text>
    </Layout>
  );
};

export default MyChats;
