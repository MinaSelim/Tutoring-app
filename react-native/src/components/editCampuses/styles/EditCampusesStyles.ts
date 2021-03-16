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
    marginTop: 5,
    fontFamily: fonts.quickSandSemiBold,
  },
  addButton: {
    alignSelf: 'center',
    width: 50,
    height: 40,
    left: 3,
    top: 5,
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
  list: {
    backgroundColor: 'white',
  },
  noCampusesIcon: {
    alignSelf: 'center',
    opacity: 0.1,
    height: 156,
    width: 220,
    marginTop: 50,
  },
  noCampusesAddACampus: {
    alignSelf: 'center',
    marginTop: 20,
  },
  noCampusesAddButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});
