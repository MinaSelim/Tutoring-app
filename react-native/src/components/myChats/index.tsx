import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import ChatListHeader from './ChatListHeader';
import ChatMenu from './ChatMenu';

const MyChats = (props): JSX.Element => {
  return (
    <Layout style={styles.mainFrame}>
      <ChatListHeader
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
