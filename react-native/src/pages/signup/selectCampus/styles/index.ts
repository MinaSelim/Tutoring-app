import {StyleSheet} from 'react-native';
import {colors} from '../../../../styles/appColors';
import {fonts} from '../../../../styles/appFonts';

export default StyleSheet.create({
  finishButton: {
    backgroundColor: colors.appOrange,
    margin: 5,
    marginBottom: 20,
    marginTop: 30,
    height: 50,
    width: '95%',
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
  goBackButtonImage: {
    width: 35,
    height: 25,
    left: 10,
    top: 3,
  },
  selectYourCampus: {
    fontSize: 20,
    fontFamily: fonts.quickSandSemiBold,
    marginLeft: 20,
    marginTop: 50,
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
  },
  space: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between',
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
  middleArea: {
    justifyContent: 'space-between',
    height: 200,
    marginBottom: 100,
  },
  biggerMiddleArea: {
    flex: 1,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between',
  },
  goBackButton: {
    position: 'absolute',
    top: 10,
  },
  safeView: {
    flex: 1,
    alignItems: 'stretch',
  },
  generalView: {
    flex: 1,
    justifyContent: 'center',
  },
  campusImageSelected: {
    alignSelf: 'center',
    tintColor: colors.appOrange,
  },
  campusImageNotSelected: {
    alignSelf: 'center',
    tintColor: '#D8D8D8',
  },
});
