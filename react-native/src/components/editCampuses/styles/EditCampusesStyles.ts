import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';
import {fonts} from '../../../styles/appFonts';

export default StyleSheet.create({
  generalView: {backgroundColor: 'white', flex: 1},
  campusSelectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 18,
    marginTop: 5,
    marginBottom: 5,
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
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'center',
    color: '#8B9CB3',
  },
  noCampusAddACampusText: {
    color: '#8B9CB3',
  },
  noCampusAddACampusRule: {
    borderBottomColor: '#8B9CB3',
    width: '30%',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  noCampusesAddButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
  modal: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
  },
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  autocomplete: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
});
