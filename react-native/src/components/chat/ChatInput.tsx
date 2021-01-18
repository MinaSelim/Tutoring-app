/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Button, Icon, Input, Divider} from '@ui-kitten/components';
import chatStyles from './styles/chatStyles';
import chat from '../../pages/chat';
import {Keyboard} from 'react-native';
import firebase from 'firebase';
import GenericChat from '../../api/chatroom/GenericChat';

const PaperPlaneIcon = (props): JSX.Element => (
  <Icon {...props} name="paper-plane" />
);
const chat1 = new GenericChat();
const ChatInput = (): JSX.Element => {
  const [entityText, setEntityText] = useState('');
  const sendMessage = () => {
    if (entityText && entityText.length > 0) {
      chat1.sendMessage(
        'YUZSCMSLtdbmJaXIUs3QnUURm572',
        '3KOm7aBd9VynpYsuHD0u',
        entityText,
      );
    }
  };

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
        onChangeText={(text) => setEntityText(text)}
        value={entityText}
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
