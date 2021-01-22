/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Button, Icon, Input, Divider} from '@ui-kitten/components';
import chatStyles from './styles/chatStyles';
import chat from '../../pages/chat';
import {Keyboard} from 'react-native';
import firebase from 'firebase';
import GenericChat from '../../api/chatroom/GenericChat';

const chatAPI: GenericChat = new GenericChat();
//TO DO: get these values with DYNAMO DB User model
const userID: string = 'YUZSCMSLtdbmJaXIUs3QnUURm572';
const chatID: string = '3KOm7aBd9VynpYsuHD0u';

const PaperPlaneIcon = (props): JSX.Element => (
  <Icon {...props} name="paper-plane" />
);
const ChatInput = (props): JSX.Element => {
  const [entityText, setEntityText] = useState('');
  const sendMessage = () => {
    if (entityText && entityText.length > 0) {
      chatAPI.sendMessage(userID, chatID, entityText);
      clearTextInput();
    }
  };

  const clearTextInput = () => {
    setEntityText('');
  };
  const inputBox = useRef<Input>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Divider strength="medium" />

      <Input
        ref={inputBox}
        status="ghost"
        style={chatStyles.input}
        placeholder="Message..."
        multiline
        textStyle={{maxHeight: 64}}
        onChangeText={(text) => setEntityText(text)}
        value={entityText}
        onFocus={props.onFocus}
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
