import React from 'react';
import {Button, Icon, Layout, Input} from '@ui-kitten/components';
import chatStyles from './styles/chatStyles';

const PaperPlaneIcon = (props) => <Icon {...props} name="paper-plane" />;
const sendMessage = (): void => {};

const ChatInput = () => {
  return (
    <Layout>
      <Input
        style={chatStyles.input}
        placeholder="Message..."
        multiline
        textStyle={{maxHeight: 64}}
      />
      <Button
        appearance="ghost"
        style={chatStyles.sendButton}
        accessoryRight={PaperPlaneIcon}
        onPress={sendMessage}
      />
    </Layout>
  );
};
export default ChatInput;
