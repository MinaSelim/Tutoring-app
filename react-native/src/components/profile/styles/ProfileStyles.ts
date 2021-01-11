import {StyleSheet} from 'react-native';

export const profileStyles = StyleSheet.create({
  modal: {
    flex: 1,
    width: '98%',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    marginTop: '3%',
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
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#363636',
    fontWeight: 'bold',
  },
  placeholder: {
    opacity: 0,
  },
  closeButton: {
    alignSelf: 'center',
    width: 50,
    height: 40,
  },
  profilePicture: {
    borderColor: 'black',
    borderWidth: 1,
    width: 90,
    height: 90,
    marginLeft: '8%',
  },
  inputBox: {
    marginBottom: 15,
    height: 40,
    fontSize: 16,
    color: '#363636',
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderRadius: 10,
  },
  passwordButton: {
    width: '60%',
    height: 20,
  },
  text: {
    color: '#363636',
    opacity: 0.6,
    marginBottom: 5,
  },
  infoArea: {
    marginLeft: '8%',
    marginRight: '8%',
    marginBottom: 30,
  },
  termsAndConditionsBox: {
    marginLeft: '8%',
  },
  id: {
    color: '#363636',
    opacity: 0.6,
    marginTop: 25,
    marginBottom: 3,
  },
});

export default profileStyles;
