import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';

export default StyleSheet.create({
  mainFrame: {
    flex: 1,
  },
  footer: {
    alignSelf: 'center',
    color: colors.appLightGrey,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 1,
  },
  listContainer: {
    backgroundColor: 'white',
    height: '100%',
  },
  unreadHint: {
    height: 14,
    width: 14,
    position: 'absolute',
    right: 15,
    alignSelf: 'center',
  },
  profilePicture: {
    marginLeft: 5,
  },
  backButton: {
    alignSelf: 'center',
    width: 50,
    height: 40,
    left: 3,
    top: 5,
  },
  ChatListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    alignSelf: 'center',
    top: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    opacity: 0,
  },
});
