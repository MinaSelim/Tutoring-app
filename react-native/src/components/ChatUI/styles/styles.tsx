import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tinyIcon: {
    width: 24,
    height: 24,
  },

  profileIcon: {
    width: 50,
    height: 50,
  },

  onlineStatus: {
    width: 10,
    height: 10,
  },

  inputContainer: {
    flex: 0,
    height: 100,
    backgroundColor: 'darkred',
  },

  topLeftContainer: {
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: 'red',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  topCenterContainer: {
    flex: 1,
    width: 100,
    height: 100,
    alignContent: 'center',
    padding: 5,
    marginBottom: 10,
    flexGrow: 2,
    backgroundColor: 'blue',
    justifyContent: 'center',
  },

  topCenterInnerContainer: {
    flex: 1,
    alignContent: 'center',
    flexGrow: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
  },

  topRightContainer: {
    flex: 1,
    width: 100,
    height: 100,
    flexGrow: 1.7,
    backgroundColor: 'purple',
    justifyContent: 'center',
  },

  messageContainer: {
    borderBottomColor: '#BFBFBF',
    borderBottomWidth: 1,
    backgroundColor: 'green',
    height: '25%',
  },

  backButton: {
    margin: 5,
    height: 50,
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  memberName: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  detailText: {
    fontSize: 16,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },

  chatText: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: 'pink',
  },
  bookButton: {
    backgroundColor: '#E86D2C',
    margin: 15,
    height: 35,
    width: '75%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
