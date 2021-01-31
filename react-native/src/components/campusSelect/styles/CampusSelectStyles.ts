import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';
import {fonts} from '../../../styles/appFonts';

export const campusSelectStyles = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: '2%',
    marginLeft: '2%',
    justifyContent: 'space-between',
  },
  modalImage: {
    borderRadius: 18,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    alignSelf: 'flex-end',
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
    fontSize: 22,
    fontFamily: fonts.quickSandSemiBold,
  },
  closeButton: {
    alignSelf: 'center',
    width: 50,
    height: 40,
  },
  selectYourCampus: {
    fontSize: 16,
    fontFamily: fonts.quickSandSemiBold,
    marginLeft: 25,
    marginTop: 10,
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
  saveButton: {
    backgroundColor: colors.appOrange,
    height: 50,
    width: '95%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cancelButton: {
    opacity: 0,
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
  cancelText: {
    color: colors.appDarkGrey,
    fontFamily: fonts.quickSandBold,
  },
  universityText: {
    alignSelf: 'center',
    fontSize: 22,
    margin: 5,
    fontFamily: fonts.quickSandRegular,
  },
  listText: {
    fontFamily: fonts.quickSandSemiBold,
    padding: 10,
    marginTop: 2,
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
  placeholder: {
    opacity: 0,
    marginRight: '8%',
  },
  middleArea: {
    marginLeft: 25,
    marginRight: 25,
  },
  bottomArea: {marginBottom: 40, marginLeft: 25, marginRight: 25},
});

export default campusSelectStyles;
