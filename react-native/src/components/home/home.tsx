import React from 'react';
import {
  View,
  Image
} from 'react-native';
import 'react-native-gesture-handler';
import {
  Text,
  Button,
  useStyleSheet,
  Icon
} from '@ui-kitten/components';
import homeStyles from './styles/HomeStyles';
//import {useSelector, useDispatch} from 'react-redux';
import store from '../store';

export const HomeUI = (props) => {
    const styles = useStyleSheet(homeStyles);
    // const email = useSelector(state=>state.email);
    // const dispatch = useDispatch();
    const name = JSON.parse(JSON.stringify(store.getState().SignInReducer.name).replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'));

    const SideMenuIcon = (props) => (
      <Icon {...props} fill= 'black' name='menu-outline' style={homeStyles.tabButton}/>
    );

    const MessageIcon = (props) => (
      <Icon {...props} fill='#A4A4A4' name='message-square-outline'/>
    );

    const UniversityImage = () => (
      <Image
        source={require('../../assets/images/icons/university.png')}
        style={styles.universityImage}
      />
    );

    const SwipeImage = () => (
      <Image
        source={require('../../assets/images/icons/swipeDots2.png')}
        style={styles.swipeDots}
      />
    );
  
    return (

      <View style={styles.background}>

        <View style={styles.upperSection}>
          <Button style={styles.tabButton} onPress={() => props.navigation.navigate("SideBar")} appearance='ghost' accessoryLeft={SideMenuIcon}/>
          <Text style={styles.helloMessage}>Hey {name},</Text>
          </View>
        <View style={styles.middleSection}>
          <Text style={styles.whatAreYouLookinFor}>What are you looking for?</Text>
          <Button style={[styles.button, {top: 25}]} onPress={() => 
          store.dispatch({
              type: "USER_INFO",
              payload: {email: "test"}
               })}>Find a tutor</Button>
          <Button style={[styles.button, {top: 30}]} onPress={()=>props.navigation.navigate("TutorSearch")}>Find a study group</Button>
          <UniversityImage/>
        </View>
        <View style={styles.lowerSection}>
          <Button style={[styles.button, styles.myChats]} onPress={() => props.navigation.navigate("StudyGroupSearch")} accessoryRight={MessageIcon}>My Chats</Button>
          <SwipeImage/>
          <Text style={styles.footer}> go.study </Text>
        </View>
        
      </View>

      
      
    );
  };