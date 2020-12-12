import {StyleSheet} from 'react-native';

export const chatStyles = StyleSheet.create({
  onlineStatus: {
    width: 10,
    height: 10,
    alignSelf: 'center',
  },

  input: {
    flexGrow: 1,
  },

  messageContainer: {
    height: 'auto',
  },

  sendButton: {
    padding: 10,
    alignSelf: 'flex-end',
  },

  container: {
    flex: 1,
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

  chatText: {
    fontSize: 16,
    marginBottom: 10,
    marginRight: 10,
  },
  bookButton: {
    width: 98,
    height: 2,
    borderRadius: 10,
    marginVertical: 5,
  },

  chatTitle: {
    paddingTop: 37,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600'
  },
  chatSubTitle: {
    fontSize: 12,
    textAlign: 'center',
    paddingBottom: 20,
  },

  chatContent: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  attachButton: {
    borderRadius: 24,
    marginHorizontal: 8,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
});
export default chatStyles;
