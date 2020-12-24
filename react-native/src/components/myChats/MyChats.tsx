import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import ChatHeader from './ChatHeader';
import ChatMenu from './ChatMenu';

const MyChats = (props): JSX.Element => {
  return (
    <Layout style={styles.mainFrame}>
      <ChatHeader
        navigation={props.navigation}
        navigate={props.navigate}
        goBack={props.goBack}
      />
      <ChatMenu />
      <Text style={styles.footer}> go.study </Text>
    </Layout>
  );
};

export default MyChats;
