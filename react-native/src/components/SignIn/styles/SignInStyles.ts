import { StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';

export default StyleSheet.create({
    
    background: {
      width: '100%',
      height: '100%',
    },
    container: {
      position: 'absolute',
      bottom: 0,
      alignItems: 'stretch',
      width: '100%',
    },
    title: {
      width: '100%',
      height: '100%',
    },
    welcome: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 18,
      marginLeft: 20,
    },
    icon: {
      width: '60%',
      height: '50%',
      alignSelf: 'center',
    },
    iconBox: {
      backgroundColor: colors.appBeige,
      height: 40,
      width: 32,
      borderRadius: 10,
      justifyContent: 'center',
    },
    signInToContinue: {
      fontSize: 20,
      marginBottom: 28,
      marginLeft: 20,
    },
    input: {
      height: 40,
      borderColor: colors.appOrange,
      borderBottomWidth: 0.75,
      width: '100%',
      marginLeft: 10,
      fontSize: 18,
      color: colors.appBlack,
    },
    eyeButton: {
      right: 35,
      top: 5,
    },
    eyeIcon: {
      position:"relative"
    },
    signInButton: {
      backgroundColor: colors.appOrange,
      margin: 5,
      height: 50,
      width: '85%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    nextArrow: {
      width: 20,
      height: 12,
      marginLeft: 5,
    },
    forgotPasswordButton: {
      margin: 5,
      height: 25,
      width: '85%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgotPasswordText:{
      color: colors.appDarkGrey, 
      fontSize: 12
    },
    createAnAccountButton: {
      backgroundColor: colors.appBeige,
      margin: 5,
      height: 50,
      width: '85%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signInWithGoogleButton: {
      backgroundColor: colors.appLightGrey,
      margin: 5,
      marginBottom: 20,
      height: 50,
      width: '85%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    googleIcon: {
      width: 20,
      height: 22,
      position: 'absolute',
      left: 25,
    },
  })