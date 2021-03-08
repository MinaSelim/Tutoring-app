import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import chatStyles from '../chat/styles/chatStyles';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import constants from '../../constants';

interface IChatBook {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const BookButton = ({navigation}): JSX.Element => {
  return (
    <Button
      size="small"
      style={chatStyles.bookButton}
      onPress={(): boolean => navigation.navigate('Booking')}>
      {(evaProps): JSX.Element => (
        <Text style={chatStyles.bookButtonText} {...evaProps}>
          {constants.chat.chatHeader.Book}
        </Text>
      )}
    </Button>
  );
};
export default BookButton;
