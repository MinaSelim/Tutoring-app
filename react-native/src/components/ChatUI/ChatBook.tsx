import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import chatStyles from './styles/chatStyles';

const ChatBook = (): JSX.Element => {
  return (
    <Button size="small" style={chatStyles.bookButton}>
      {(evaProps): JSX.Element => (
        <Text style={chatStyles.bookButtonText} {...evaProps}>
          Book
        </Text>
      )}
    </Button>
  );
};
export default ChatBook;
