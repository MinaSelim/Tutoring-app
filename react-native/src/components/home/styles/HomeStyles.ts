/* eslint-disable */

import {StyleSheet} from 'react-native';
import {colors} from '../../../styles/appColors';

export default StyleSheet.create({
    
    background:{
        flex:1,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    upperSection:{
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'center',
        width:'100%',
        top:0
    },
    tabButton: {
        alignSelf:'flex-start',
        width: 50,
        height: 40,
        left: 5,
        top: 5,
    },
    helloMessage: {
        top: 30,
        fontSize: 30,
        fontWeight: 'bold',
        width: '75%',
        alignSelf: 'center',
    },
    middleSection:{
        justifyContent: 'center', 
        alignItems: 'center',
        bottom: 18     
    },
    whatAreYouLookinFor:{
        top: 0,
        alignSelf: 'center',
        color: '#A3A3A3'
    },
    button: {
        margin: 5,
        height: 50,
        width: '80%',
        borderRadius: 10,
    },
    universityImage:{
        alignSelf: 'center', 
        opacity: 0.10,
        width: '40%',
        height: '33%',
        top: 44
    },
    lowerSection:{
        position: "absolute",
        bottom: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width:'100%'
    },
    myChats:{
        backgroundColor: '#E5E5E5',
        borderColor: '#E5E5E5',
        bottom: 30
    },
    myChatsIcon:{
        height: '100%',
        width: '10%'
    },
    footer: {
        alignSelf: 'center',
        color: colors.appLightGrey,
        fontSize: 18,
        fontWeight: 'bold',
        bottom: 10
      }
});