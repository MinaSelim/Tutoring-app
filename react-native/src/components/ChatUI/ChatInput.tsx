import React from 'react';
import {Button, Icon, Layout, Input, Divider} from '@ui-kitten/components';
import chatStyles from './styles/chatStyles';

const PaperPlaneIcon = (props) => <Icon {...props} name="paper-plane" />;
const sendMessage = (): void => {};

const ChatInput = () => {
  return (
    <Layout>
      <Divider strength="medium" />
      <Input
        status="ghost"
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
