import {app} from 'firebase';
import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';
import {fonts} from '../../../styles/appFonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    backgroundColor: colors.appWhite,
  },

  title: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  input: {
    flexDirection: 'row',
    height: 40,
    marginTop: 50,
    borderColor: colors.appOrange,
    borderBottomWidth: 0.75,
    width: '80%',
    textAlign: 'left',
    marginLeft: 72,
    fontFamily: fonts.quickSandRegular,
    fontSize: 18,
    color: colors.appBlack,
  },

  resetButton: {
    backgroundColor: colors.appOrange,
    marginTop: 25,
    margin: 5,
    height: 50,
    marginLeft: 72,
    width: '82%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  inputView: {
    marginTop: 90,
    marginBottom: 0,
    width: '85%',
    backgroundColor: colors.appWhite,
  },
  forgotPasswordText: {
    color: colors.appDarkGrey,
    fontSize: 12,
    marginLeft: 115,
    fontFamily: fonts.quickSandBold,
  },
  emailSentText: {
    flexDirection: 'column',
    flex: 0.8,
    color: colors.appDarkGrey,
    fontSize: 17,
    marginLeft: 115,
    fontFamily: fonts.quickSandBold,
    alignContent: 'center',
    textAlign: 'center',
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
  emailSentContainer: {
    flexDirection: 'column',
    margin: 5,
    height: '100%',
    width: '85%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
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
