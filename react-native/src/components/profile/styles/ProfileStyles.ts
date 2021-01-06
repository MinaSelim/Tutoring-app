import {StyleSheet} from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    width: '95%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 18,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: '2.5%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: 88,
    height: 88,
    marginLeft: '5%',
    marginBottom: 40,
    marginTop: 10,
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
    //fontSize: 18,
    color: '#363636',
    opacity: 0.6,
    marginBottom: 5,
  },
  infoArea: {
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default profileStyles;
