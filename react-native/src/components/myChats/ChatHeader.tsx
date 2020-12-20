/* eslint-disable */

import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import BackButton from './BackButton';

const ChatHeader = () => (
  <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <Button appearance="ghost" accessoryLeft={BackButton} />
    <Text
      style={{alignSelf: 'center', top: 5, fontSize: 20, fontWeight: 'bold'}}>
      My Chats
    </Text>
    <Text style={{alignSelf: 'center', right: 30, top: 5}}>(Button)</Text>
  </Layout>
);

export default ChatHeader;
