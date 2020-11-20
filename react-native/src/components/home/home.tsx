 /* eslint-disable */

 import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  Text,
  Button,
  StyleService,
  useStyleSheet,
  Input,
  IconRegistry,
  Icon,
  ViewPager,
  List,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import homeStyles from './styles/HomeStyles';
import {SideBar} from '../sideBar/sideBar';
import {MyChats} from '../myChats/myChats';

// export const HomeSlider = (props) => {
//   const [selectedIndex, setSelectedIndex] = React.useState(1);
//   return(
//     <ViewPager
//     selectedIndex={selectedIndex}
//     onSelect={index => setSelectedIndex(index)}>
//       <Layout style={homeStyles.sliderTabs}><SideBar/></Layout>
//       <Layout style={homeStyles.sliderTabs}><HomeUI/></Layout>
//       <Layout style={homeStyles.sliderTabs}><MyChats/></Layout>
//     </ViewPager>
//   )
// }

export const HomeUI = (props) => {
    const styles = useStyleSheet(homeStyles);

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
          <Text style={styles.helloMessage}>Hey User,</Text>
          </View>
        <View style={styles.middleSection}>
          <Text style={styles.whatAreYouLookinFor}>What are you looking for?</Text>
          <Button style={[styles.button, {top: 25}]} onPress={() => props.navigation.navigate("FindATutor")}>Find a tutor</Button>
          <Button style={[styles.button, {top: 30}]} onPress={() => props.navigation.navigate("FindAStudyGroup")}>Find a study group</Button>
          <UniversityImage/>
        </View>
        <View style={styles.lowerSection}>
          <Button style={[styles.button, styles.myChats]} onPress={() => props.navigation.navigate("MyChats")} accessoryRight={MessageIcon}>My Chats</Button>
          <SwipeImage/>
          <Text style={styles.footer}> go.study </Text>
        </View>
        
      
      </View>

      
      
    );
  };