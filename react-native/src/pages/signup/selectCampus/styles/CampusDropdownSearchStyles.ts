import {StyleSheet} from 'react-native';
import {colors} from '../../../../styles/appColors';
import {fonts} from '../../../../styles/appFonts';

export const CampusDropdownSearchStyles = StyleSheet.create({
  containerStyle: {
    padding: 5,
  },
  itemTextStyle: {
    color: '#222',
  },
  itemsContainerStyle: {
    maxHeight: 200,
  },
  dropdownView: {
    height: 250,
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
  listText: {
    fontFamily: fonts.quickSandSemiBold,
    padding: 10,
    marginTop: 2,
  },
});

export default CampusDropdownSearchStyles;
