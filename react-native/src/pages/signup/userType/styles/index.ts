import {StyleSheet} from 'react-native';
import {colors} from '../../../../styles/appColors';
import {fonts} from '../../../../styles/appFonts';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: 'stretch',
  },
  bigView: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
  },
  middleView: {
    height: 170,
    marginBottom: 50,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '50%',
  },
  student: {
    backgroundColor: colors.appOrange,
    margin: 5,
    height: 50,
    width: '75%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tutor: {
    backgroundColor: colors.appDarkerGrey,
    margin: 5,
    height: 50,
    width: '75%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  goBackButton: {
    width: 35,
    height: 25,
    left: 10,
    top: 10,
  },
  iAmText: {
    fontSize: 18,
    marginLeft: '12.5%',
    marginBottom: 10,
    fontFamily: fonts.quickSandRegular,
  },
  space: {
    height: 170,
    marginBottom: 50,
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '50%',
  },
  buttonText: {
    color: colors.appWhite,
    fontFamily: fonts.quickSandBold,
  },
  footer: {
    color: colors.appLightGrey,
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    position: 'absolute',
    bottom: 10,
  },
});
