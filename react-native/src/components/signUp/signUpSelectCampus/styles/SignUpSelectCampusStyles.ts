import {colors} from '../../../../styles/appColors';
import {StyleSheet} from 'react-native';
import {fonts} from '../../../../styles/appFonts';

export default StyleSheet.create({
  inputBox: {
    borderColor: colors.appOrange,
    borderWidth: 2,
    borderRadius: 9,
    width: '90%',
    height: 40,
    alignSelf: 'center',
    fontFamily: fonts.quickSandRegular,
  },
  finishButton: {
    backgroundColor: colors.appOrange,
    margin: 5,
    height: 50,
    width: '75%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  finishText: {
    color: colors.appWhite,
    fontFamily: fonts.quickSandBold,
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
    top: 3,
  },
  selectYourCampus: {
    fontSize: 20,
    fontFamily: fonts.quickSandSemiBold,
    marginLeft: 20,
    marginTop: 70,
  },
  universityText: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: fonts.quickSandRegular,
  },
  footer: {
    alignSelf: 'center',
    color: colors.appLightGrey,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    position: 'absolute',
    bottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
