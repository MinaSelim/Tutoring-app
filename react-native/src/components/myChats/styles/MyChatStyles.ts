/* eslint-disable */

import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';

export default StyleSheet.create({
  mainFrame:{
    flex:1
  },
  footer: {
    alignSelf: 'center',
    color: colors.appLightGrey,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 10,
  },
  listContainer: {
    backgroundColor: 'white',
    height: '100%',
    top: 20,
  },
  unreadHint:{
    height: 14,
    width: 14,
    position: 'absolute',
    right: 15,
    alignSelf: 'center',
  },
  profilePicture:{
    marginLeft: 5   
  },
  backButton:{
    alignSelf: 'center', 
    width: 50, 
    height: 40, 
    left: 3, 
    top: 5  
  }
});
