import React from 'react';
import {View, Image} from 'react-native';
import 'react-native-gesture-handler';
import {Text, Button, useStyleSheet, Icon} from '@ui-kitten/components';
import homeStyles from './styles/HomeStyles';
import store from '../store';

export const HomeUI = (props) => {
  const styles = useStyleSheet(homeStyles);
  // const email = useSelector(state=>state.email);
  // const dispatch = useDispatch();
  const name = JSON.parse(
    JSON.stringify(store.getState().SignInReducer.firstName).replace(
      /(\{|,)\s*(.+?)\s*:/g,
      '$1 "$2":',
    ),
  );

  const SideMenuIcon = (props) => (
    <Icon
      {...props}
      fill="black"
      name="menu-outline"
      style={homeStyles.tabButton}
    />
  );

  const MessageIcon = (props) => (
    <Icon {...props} fill="#383d39" name="message-square-outline" />
  );

  const UniversityImage = () => (
    <Image
      source={require('../../assets/images/icons/university.png')}
      style={styles.universityImage}
    />
  );

  return (
    <View style={styles.background}>
      <View style={styles.upperSection}>
        <Button
          style={styles.tabButton}
          onPress={() => props.navigation.navigate('SideBar')}
          appearance="ghost"
          accessoryLeft={SideMenuIcon}
        />
        <Text style={styles.helloMessage}>Hey {name},</Text>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.whatAreYouLookinFor}>
          What are you looking for?
        </Text>
        <Button
          style={[styles.button, {top: 25}]}
          onPress={() => props.navigation.navigate('TutorSearch')}>
          Find a Tutor
        </Button>
        <Button
          style={[styles.button, {top: 30}]}
          onPress={() => props.navigation.navigate('StudyGroupSearch')}>
          Find a Study Group
        </Button>
        <UniversityImage />
      </View>
      <View style={styles.lowerSection}>
        <Button
          style={[styles.button, styles.myChats]}
          onPress={() => props.navigation.navigate('MyChats')}
          status="basic"
          accessoryRight={MessageIcon}>
          My Chats
        </Button>
        <Text style={styles.footer}> go.study </Text>
      </View>
    </View>
  );
};

export default HomeUI;
