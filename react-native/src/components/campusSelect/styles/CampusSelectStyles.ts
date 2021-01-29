import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';
import {fonts} from '../../../styles/appFonts';

export const campusSelectStyles = StyleSheet.create({
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
  campusSelectHeader: {
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
    marginRight: '8%',
  },
  closeButton: {
    alignSelf: 'center',
    width: 50,
    height: 40,
  },
  inputBox: {
    borderColor: colors.appOrange,
    borderWidth: 2,
    borderRadius: 9,
    width: '100%',
    height: 40,
    alignSelf: 'center',
    fontFamily: fonts.quickSandRegular,
  },
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
  goBackButton: {
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
  listText: {
    fontFamily: fonts.quickSandSemiBold,
    padding: 10,
    marginTop: 2,
  },
  footer: {
    alignSelf: 'center',
    color: colors.appLightGrey,
    fontSize: 18,
    fontWeight: 'bold',
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

export default campusSelectStyles;
