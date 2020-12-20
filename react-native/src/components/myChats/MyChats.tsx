/* eslint-disable */

import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import styles from '../myChats/styles/MyChatStyles';
import ChatHeader from '../myChats/ChatHeader';
import ChatMenu from '../myChats/MyChats';

const MyChats = () => {
    return(
     <Layout style={styles.mainFrame}>
        <ChatHeader/>
        <ChatMenu/>
        <Text style={styles.footer}> go.study </Text>
     </Layout>
    );
};

export default MyChats;
