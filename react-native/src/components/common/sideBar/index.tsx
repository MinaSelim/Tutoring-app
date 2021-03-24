import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  Layout,
  Avatar,
  Button,
  Icon,
  Divider,
} from '@ui-kitten/components';
import constants from '../../../constants';
import styles from './styles/styles';
import useAuthUser from '../../../hooks/authUser';
import Profile from '../../profile/Profile';
import {useNavigation} from '@react-navigation/native';

const CalendarIcon = (props): JSX.Element => (
  <Icon {...props} name="calendar-outline" />
);
const CreditCardIcon = (props): JSX.Element => (
  <Icon {...props} name="credit-card" />
);
const HistoryIcon = (props): JSX.Element => (
  <Icon {...props} name="archive-outline" />
);
const CampusIcon = (props): JSX.Element => (
  <Icon {...props} name="home-outline" />
);
const BookIcon = (props): JSX.Element => (
  <Icon {...props} name="book-outline" />
);
const EmptyIcon = (props): JSX.Element => (
  <Icon {...props} name="code-outline" fill="#ffffff00" />
);

const SideBar: React.FunctionComponent<any> = () => {
  const [user, setAuthUser] = useAuthUser();
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    if (user != null) setUserName(user!.first_name);
  }, [user]);

  const handleSignOut = (): void => {
    setAuthUser(null);
    navigation.navigate('SignInMenu');
  };
  const TutorCalendar = (props): JSX.Element => (
    <Button
      style={styles.button}
      appearance="ghost"
      status="control"
      accessoryLeft={CalendarIcon}
      size="giant">
      {constants.commonComponents.sidebar.tutorCalendar}
    </Button>
  );
  /**
   * this method conditionally renders a calendar option for tutor
   * returns a tutor calendar menu option if the user is a tutor
   * retruns empty view if user is not tutor
   */
  function ConditionalTutorCalendar(): JSX.Element {
    try {
      return user!.hasOwnProperty('tutor_info') ? <TutorCalendar /> : <View />;
    } catch (error) {
      console.log(error);
      return <View />;
    }
  }

  return (
    <Layout level="primary" style={styles.container}>
      <View>
        <Layout level="primary" style={styles.userTitleContainer}>
          <Text style={styles.text}>{userName}</Text>
          <Avatar
            size="giant"
            source={require('./avatar_placeholder.png')}
            style={styles.avatar}
          />
        </Layout>
        <Profile />
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={BookIcon}
          size="giant">
          {constants.commonComponents.sidebar.mySessions}
        </Button>
        <ConditionalTutorCalendar />
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={CreditCardIcon}
          size="giant">
          {constants.commonComponents.sidebar.paymentOptions}
        </Button>
        <Divider style={styles.divider} />
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={HistoryIcon}
          size="giant">
          {constants.commonComponents.sidebar.accountHistory}
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={CampusIcon}
          size="giant">
          {constants.commonComponents.sidebar.selectCampus}
        </Button>
        <Divider style={styles.divider} />
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={EmptyIcon}
          size="giant"
          onPress={(): void => handleSignOut()}>
          {constants.commonComponents.sidebar.signout}
        </Button>
      </View>
      <View style={styles.terms}>
        <Button
          style={styles.termsButton}
          appearance="ghost"
          status="control"
          size="medium">
          {constants.commonComponents.sidebar.termsAndConditions}
        </Button>
      </View>
    </Layout>
  );
};

export default SideBar;
