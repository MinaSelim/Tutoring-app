import React from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import {Text, Button, useStyleSheet} from '@ui-kitten/components';
import homeStyles from './styles/HomeStyles';
import SideMenuIcon from './SideMenuIcon';
import MessageIcon from './MessageIcon';
import UniversityImage from './UniversityImage';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';

const HomeUI: React.FC<NavigationInjectedPropsConfigured> = (props) => {
  const styles = useStyleSheet(homeStyles);
  const name = 'temporaryName';
  // TODO get name from proper state management

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
