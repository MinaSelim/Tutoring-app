/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import 'react-native-gesture-handler';
import {
  Button,
  useStyleSheet,
  Layout,
  Text,
  Divider,
  RangeCalendar,
  TopNavigation,
  TopNavigationAction,
  Icon,
  ButtonGroup,
  Datepicker,
  Calendar,
} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {StyleSheet} from 'react-native';
import {TextStyleProps} from '@ui-kitten/components/devsupport';
const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;
const FowardIcon = (props) => <Icon {...props} name="arrow-forward-outline" />;
const renderBackAction = (): JSX.Element => (
  <TopNavigationAction icon={BackIcon} />
);
const renderTitle = (): JSX.Element => (
  <TouchableOpacity>
    <Text style={styles.bookTitle}>Booking a Session</Text>
  </TouchableOpacity>
);
const Booking = (): JSX.Element => {
  const [date, setDate] = React.useState(new Date());
  return (
    <View style={styles.container}>
      <View style={{borderBottomColor: '#949494', borderBottomWidth: 0.5}}>
        <TopNavigation
          alignment="center"
          title={renderTitle}
          accessoryLeft={renderBackAction}
        />
      </View>
      <View style={styles.chooseHours}>
        <Text>Choose a session length</Text>
        <ButtonGroup style={styles.buttonGroup}>
          <Button>1 hours</Button>
          <Button>2 hours</Button>
          <Button>3 hours</Button>
        </ButtonGroup>
      </View>
      <View style={styles.calendar}>
        <View style={{height: 40}}>
          <Calendar
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{backgroundColor: '#f2f2f2', width: 350}}
          />
        </View>
      </View>
      <View style={styles.timeSlot}>
        <ButtonGroup style={styles.buttonGroup}>
          <Button>11-12 AM</Button>
          <Button disabled={true}>
            <Text style={{color: 'grey'}}>1-2 PM</Text>
          </Button>
          <Button disabled={true}>
            <Text style={{color: 'grey'}}>1-2 PM</Text>
          </Button>
        </ButtonGroup>
      </View>
      <View style={styles.bookNow}>
        <Button style={styles.button} accessoryRight={FowardIcon}>
          Continue Booking
        </Button>
      </View>
    </View>
  );
};
var styles = StyleSheet.create({
  button: {
    backgroundColor: '#F1AA3E',
    margin: 2,
  },
  buttonGroup: {
    margin: 2,
  },
  bookTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  bookNow: {
    flex: 0.0,
    backgroundColor: 'white',
    padding: 10,
  },
  chooseHours: {
    padding: 5,
    alignItems: 'center',
    flex: 0.13,
    backgroundColor: 'white',
  },
  calendar: {
    alignItems: 'center',
    margin: 10,
    flex: 0.8,
    backgroundColor: 'white',
  },
  timeSlot: {
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: 'white',
  },
});
export default Booking;
