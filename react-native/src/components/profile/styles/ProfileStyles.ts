import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';

export const profileStyles = StyleSheet.create({
  modal: {
    flex: 1,
    width: '98%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    marginTop: '2%',
    borderRadius: 18,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    justifyContent: 'space-between',
  },
  background: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  ProfileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 18,
    height: 50,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#363636',
    fontWeight: 'bold',
  },
  saveButton: {
    alignSelf: 'center',
    height: 35,
    justifyContent: 'center',
    marginLeft: '-5%',
  },
  closeButton: {
    alignSelf: 'center',
    width: 50,
    height: 40,
  },
  profilePicture: {
    borderColor: 'black',
    width: 88,
    height: 88,
    marginLeft: '8%',
  },
  inputBox: {
    marginBottom: 8,
    height: 30,
    fontSize: 16,
    color: '#363636',
    backgroundColor: '#F7F7F7',
    padding: 5,
    paddingTop: -20,
    paddingBottom: -20,
    borderRadius: 10,
  },
  descriptionBox: {
    height: 100,
    fontSize: 16,
    color: '#363636',
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    marginBottom: 8,
  },
  passwordButton: {
    width: '60%',
    height: 27,
    marginBottom: 8,
    backgroundColor: colors.appOrange,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },
  text: {
    color: '#363636',
    opacity: 0.6,
    marginBottom: 3,
  },
  infoArea: {
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: 20,
  },
  termsAndConditionsButton: {
    marginLeft: '8%',
    paddingBottom: '3%',
    marginTop: 2,
  },
  safeArea: {
    flex: 1,
  },
  hiddenDescription: {
    opacity: 0,
    height: 5,
  },
});

export default profileStyles;
