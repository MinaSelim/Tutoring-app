import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';

export default StyleSheet.create({
  mainFrame: {
    flex: 1,
  },
  footer: {
    alignSelf: 'center',
    color: colors.appLightGrey,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 1,
  },
});
