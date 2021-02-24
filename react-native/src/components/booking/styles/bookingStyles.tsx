import {StyleSheet} from 'react-native';

const bookingStyles = StyleSheet.create({
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
export default bookingStyles;
