import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';
import {fonts} from '../../../styles/appFonts';

export default StyleSheet.create({
  generalView: {backgroundColor: 'white', flex: 1},
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
  selectYourCampus: {
    fontSize: 16,
    fontFamily: fonts.quickSandSemiBold,
    marginTop: 7,
    marginBottom: 10,
    alignSelf: 'center',
  },
  placeholder: {
    opacity: 0,
    marginRight: '8%',
  },
});
