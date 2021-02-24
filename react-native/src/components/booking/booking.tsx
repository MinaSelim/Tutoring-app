/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'react-native-gesture-handler';
import {
  Button,
  useStyleSheet,
  Text,
  TopNavigation,
  TopNavigationAction,
  Icon,
  ButtonGroup,
  Calendar,
} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import bookingStyles from '../../components/booking/styles/bookingStyles';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;
const FowardIcon = (props) => <Icon {...props} name="arrow-forward-outline" />;
const renderBackAction = (): JSX.Element => (
  <TopNavigationAction icon={BackIcon} />
);
const renderTitle = (): JSX.Element => (
  <TouchableOpacity>
    <Text style={bookingStyles.bookTitle}>Booking a Session</Text>
  </TouchableOpacity>
);
const Booking = (): JSX.Element => {
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
        <Text>Choose a session length</Text>
        <ButtonGroup style={bookingStyles.buttonGroup}>
          <Button>1 hours</Button>
          <Button>2 hours</Button>
          <Button>3 hours</Button>
        </ButtonGroup>
      </View>
      <View style={bookingStyles.calendar}>
        <View style={{height: 40}}>
          <Calendar
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{backgroundColor: '#f2f2f2', width: 350}}
          />
        </View>
      </View>
      <View style={bookingStyles.timeSlot}>
        <ButtonGroup style={bookingStyles.buttonGroup}>
          <Button>11-12 AM</Button>
          <Button disabled={true}>
            <Text appearance="hint">1-2 PM</Text>
          </Button>
          <Button disabled={true}>
            <Text appearance="hint">1-2 PM</Text>
          </Button>
        </ButtonGroup>
      </View>
      <View style={bookingStyles.bookNow}>
        <Button style={bookingStyles.button} accessoryRight={FowardIcon}>
          Continue Booking
        </Button>
      </View>
    </View>
  );
};

export default Booking;
