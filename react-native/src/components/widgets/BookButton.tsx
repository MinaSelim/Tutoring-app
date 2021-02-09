import React from 'react';
import {Button, Text} from '@ui-kitten/components';
import chatStyles from '../ChatUI/styles/chatStyles';
import ITutor from 'model/common/ITutor';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

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
          Book
        </Text>
      )}
    </Button>
  );
};
export default BookButton;
