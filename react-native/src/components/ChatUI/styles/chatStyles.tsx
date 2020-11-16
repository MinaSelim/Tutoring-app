import {StyleSheet} from 'react-native';

export const chatStyles = StyleSheet.create({
  tinyIcon: {
    width: 30,
    height: 24,
  },

  tinySendIcon: {
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
    alignSelf: 'center',
  },

  inputContainer: {
    height: 'auto',
    flexDirection: 'row',
  },

  input: {
    flexGrow: 1,
  },

  topLeftContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  topCenterContainer: {
    flex: 1,
    alignContent: 'center',
    padding: 5,
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
    flexGrow: 1.7,
    justifyContent: 'center',
  },

  messageContainer: {
    borderBottomColor: '#BFBFBF',
    borderBottomWidth: 1,
    height: 'auto',
  },

  backButton: {
    margin: 5,
    height: 50,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    alignSelf: 'center',
  },

  sendButton: {
    padding: 10,
    justifyContent: 'center',
  },

  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    backgroundColor: 'skyblue',
    textAlign: 'center',
    marginLeft: 5,
  },

  memberName: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },

  date: {
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  detailText: {
    fontSize: 12,
    backgroundColor: 'skyblue',
    textAlign: 'center',
  },

  chatText: {
    fontSize: 16,
    marginBottom: 10,
    marginRight: 10,
  },
  bookButton: {
    width: 98,
    borderRadius: 15,
  },
});
