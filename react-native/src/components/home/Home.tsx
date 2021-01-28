import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import 'react-native-gesture-handler';
import {Text, Button, useStyleSheet} from '@ui-kitten/components';
import homeStyles from './styles/HomeStyles';
import SideMenuIcon from './SideMenuIcon';
import MessageIcon from './MessageIcon';
import UniversityImage from './UniversityImage';
import useAuthUser from '../../hooks/authUser';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '@ui-kitten/components';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

const HomeUI: React.FC<INavigation> = ({
  navigation,
  toggleDrawer,
}: INavigation) => {
  const styles = useStyleSheet(homeStyles);
  const theme = useTheme();
  const user = useAuthUser()[0];
  const [userName, setUserName] = useState('');

  useEffect(() => setUserName(user!.first_name), [user]);

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme['color-basic-100']}]}>
      <View style={styles.background}>
        <View style={styles.upperSection}>
          <Button
            style={styles.tabButton}
            onPress={(): void => navigation.toggleDrawer()}
            appearance="ghost"
            accessoryLeft={SideMenuIcon}
          />
          <Text style={styles.helloMessage}>Hey {userName},</Text>
        </View>
        <View style={styles.middleSection}>
          <Text style={styles.whatAreYouLookinFor}>
            What are you looking for?
          </Text>
          <Button
            style={[styles.button, {top: 25}]}
            onPress={(): boolean => navigation.navigate('TutorSearch')}>
            Find a Tutor
          </Button>
          <Button
            style={[styles.button, {top: 30}]}
            onPress={(): boolean => navigation.navigate('StudyGroupSearch')}>
            Find a Study Group
          </Button>
          <UniversityImage />
        </View>
        <View style={styles.lowerSection}>
          <Button
            style={[styles.button, styles.myChats]}
            onPress={(): boolean => navigation.navigate('MyChats')}
            status="basic"
            accessoryRight={MessageIcon}>
            My Chats
          </Button>
          <Text style={styles.footer}> go.study </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeUI;
