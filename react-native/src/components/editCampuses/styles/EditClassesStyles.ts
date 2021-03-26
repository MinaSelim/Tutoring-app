import {StyleSheet} from 'react-native';
import {fonts} from '../../../styles/appFonts';
import {colors} from '../../../styles/appColors';

export default StyleSheet.create({
  generalView: {backgroundColor: 'white', flex: 1},
  campusSelectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 18,
    marginTop: 5,
    marginBottom: 15,
    height: 50,
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    marginTop: 5,
    color: 'grey',
    fontFamily: fonts.quickSandSemiBold,
  },
  placeholder: {
    opacity: 0,
    marginRight: '8%',
  },
  universityText: {
    fontSize: 22,
    alignSelf: 'center',
    fontFamily: fonts.quickSandSemiBold,
  },
  arrowIcon: {
    height: 20,
    width: 20,
  },
  button: {
    marginBottom: 17,
    height: 50,
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
  },
  universityImage: {
    tintColor: colors.appOrange,
    height: 78,
    width: 110,
    alignSelf: 'center',
    marginTop: 15,
  },
  searchBar: {
    paddingTop: 10,
    paddingBottom: 15,
    width: '80%',
    alignSelf: 'center',
  },
  yourClasses: {
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
  },
  yourClassesText: {
    color: 'grey',
    fontFamily: fonts.quickSandSemiBold,
    fontSize: 18,
  },
  yourClassesRule: {
    borderBottomColor: 'grey',
    width: '30%',
    borderBottomWidth: 1,
    alignSelf: 'center',
    paddingTop: 5,
  },
  middleSection: {
    marginTop: '20%',
  },
});
