import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Button, Icon, Layout, Input, Divider} from '@ui-kitten/components';
import chatStyles from './styles/chatStyles';

const PaperPlaneIcon = (props): JSX.Element => (
  <Icon {...props} name="paper-plane" />
);
const sendMessage = (): void => {};

const ChatInput = (): JSX.Element => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
    </KeyboardAvoidingView>
  );
};
export default ChatInput;
