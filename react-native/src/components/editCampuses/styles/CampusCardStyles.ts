import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';
import {fonts} from '../../../styles/appFonts';

export default StyleSheet.create({
  card: {
    alignItems: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#8B9CB3',
    borderRadius: 0,
    width: '80%',
    alignSelf: 'center',
  },
  universityImage: {
    tintColor: colors.appOrange,
    height: 90,
    width: 127,
    alignSelf: 'center',
  },
  universityText: {
    fontSize: 22,
    marginTop: 10,
    alignSelf: 'center',
    fontFamily: fonts.quickSandSemiBold,
  },
  button: {width: 110, height: 40, alignSelf: 'center'},
  studentCampus: {borderTopWidth: 1, marginTop: 20},
});
