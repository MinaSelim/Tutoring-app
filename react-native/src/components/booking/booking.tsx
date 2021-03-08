/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'react-native-gesture-handler';
import {
  Button,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  ButtonGroup,
  useStyleSheet,
  Calendar,
} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from '../../components/booking/styles/bookingStyles';
import booking from '../../constants/booking';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;
const FowardIcon = (props) => <Icon {...props} name="arrow-forward-outline" />;
const renderBackAction = (): JSX.Element => (
  <TopNavigationAction icon={BackIcon} />
);

const Booking = (): JSX.Element => {
  const bookingStyles = useStyleSheet(styles);
  const renderTitle = (): JSX.Element => (
    <TouchableOpacity>
      <Text style={bookingStyles.bookTitle}>{booking.description.title}</Text>
    </TouchableOpacity>
  );
  const [date, setDate] = React.useState(new Date());
  return (
    <View style={bookingStyles.container}>
      <View style={{borderBottomColor: '#949494', borderBottomWidth: 0.5}}>
        <TopNavigation
          alignment="center"
          title={renderTitle}
          accessoryLeft={renderBackAction}
        />
      </View>
      <View style={bookingStyles.chooseHours}>
        <Text>{booking.description.chooseSessionDuration}</Text>
        <ButtonGroup style={bookingStyles.buttonGroup}>
          <Button>{booking.button.sessionDur1}</Button>
          <Button>{booking.button.sessionDur2}</Button>
          <Button>{booking.button.sessionDur3}</Button>
        </ButtonGroup>
      </View>
      <View style={bookingStyles.calendarContainer}>
        <View style={{height: 40}}>
          <Calendar date={date} onSelect={(nextDate) => setDate(nextDate)} />
        </View>
      </View>
      <View style={bookingStyles.timeSlot}>
        <ButtonGroup style={bookingStyles.buttonGroup}>
          <Button>{booking.button.timeslot1}</Button>
          <Button disabled={true}>
            <Text appearance="hint">{booking.button.timeslot2}</Text>
          </Button>
          <Button disabled={true}>
            <Text appearance="hint">{booking.button.timeslot3}</Text>
          </Button>
        </ButtonGroup>
      </View>
      <View style={bookingStyles.bookNow}>
        <Button style={bookingStyles.button} accessoryRight={FowardIcon}>
          {booking.button.continue}
        </Button>
      </View>
    </View>
  );
};

export default Booking;
