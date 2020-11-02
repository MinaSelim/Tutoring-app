import {colors} from '../../../../styles/appColors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  text: {
    fontSize: 18,
    color: colors.appSilver,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  goBackButton: {
    width: 40,
    height: 30,
    left: 10,
    top: 10,
  },
  signUpText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  star: {
    color: colors.appOrange,
    fontWeight: 'bold',
  },
  inputSection: {
    flex: 1,
    marginLeft: '5%',
    marginRight: '5%',
    flexDirection: 'row',
  },
  inputBox: {
    borderColor: '#979797',
    borderBottomWidth: 1,
    width: '100%',
    height: 40,
    fontSize: 18,
    color: colors.appBlack,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
  eyeIcon: {
    position: 'relative',
  },
  nextButton: {
    backgroundColor: '#F0793A',
    margin: 5,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nextArrow: {
    width: 20,
    height: 12,
    marginLeft: 5,
  },
  signInWithGoogleButton: {
    backgroundColor: '#F1F3F8',
    margin: 5,
    marginBottom: 10,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    width: 20,
    height: 22,
    position: 'absolute',
    left: 25,
  },
  footer: {
    alignSelf: 'center',
    color: '#E9EAEE',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
