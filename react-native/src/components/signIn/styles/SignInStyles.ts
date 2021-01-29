import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';
import {fonts} from '../../../styles/appFonts';

export default StyleSheet.create({
  component: {
    flex: 1,
    justifyContent: 'space-between',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    alignSelf: 'flex-end',
    height: 75,
    width: 200,
    marginTop: 10,
    marginRight: 10,
  },
  container: {
    alignItems: 'stretch',
    width: '100%',
  },
  title: {
    width: '100%',
    height: '100%',
  },
  welcome: {
    fontSize: 30,
    marginBottom: 18,
    marginLeft: 20,
    fontFamily: fonts.quickSandBold,
    marginTop: '15%',
  },
  icon: {
    width: '60%',
    height: '50%',
    alignSelf: 'center',
  },
  iconBox: {
    backgroundColor: colors.appBeige,
    height: 40,
    width: 32,
    borderRadius: 10,
    justifyContent: 'center',
  },
  signInToContinue: {
    fontSize: 20,
    fontFamily: fonts.quickSandRegular,
    marginBottom: 28,
    marginLeft: 20,
  },
  signInUserType: {
    fontSize: 20,
    fontFamily: fonts.quickSandRegular,
    marginBottom: 28,
  },
  inputView: {
    marginBottom: 40,
    width: '85%',
  },
  input: {
    height: 40,
    borderColor: colors.appOrange,
    borderBottomWidth: 0.75,
    width: '100%',
    marginLeft: 10,
    fontFamily: fonts.quickSandRegular,
    fontSize: 18,
    color: colors.appBlack,
  },
  userInputView: {flexDirection: 'row', margin: 15, marginLeft: 30},
  eyeButton: {
    right: 35,
    top: 5,
  },
  eyeIcon: {
    position: 'relative',
  },
  signInButton: {
    backgroundColor: colors.appOrange,
    margin: 5,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signInText: {
    fontSize: 14,
    color: colors.appWhite,
    fontFamily: fonts.quickSandBold,
  },
  nextArrow: {
    width: 20,
    height: 12,
    marginLeft: 5,
  },
  forgotPasswordButton: {
    margin: 5,
    height: 25,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    color: colors.appDarkGrey,
    fontSize: 12,
    fontFamily: fonts.quickSandBold,
  },
  createAnAccountButton: {
    backgroundColor: colors.appBeige,
    margin: 5,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccountText: {
    fontSize: 14,
    color: colors.appOrange,
    fontFamily: fonts.quickSandBold,
  },
  signInWithGoogleButton: {
    backgroundColor: colors.appLightGrey,
    margin: 5,
    marginBottom: 20,
    height: 50,
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signInWithGoogleText: {
    fontSize: 14,
    color: colors.appSilver,
    fontFamily: fonts.quickSandBold,
  },
  googleIcon: {
    width: 20,
    height: 22,
    position: 'absolute',
    left: 25,
  },
  safeArea: {
    flex: 1,
  },
  topTab: {
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
  },
  signInAsAView: {
    flexDirection: 'row',
  },
  signInButtonView: {
    alignItems: 'center',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  signInContent: {
    backgroundColor: 'rgba(52, 52, 52, 1.0)',
  },
});
