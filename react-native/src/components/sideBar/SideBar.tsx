import {View} from 'react-native';
import 'react-native-gesture-handler';
import {
  Text,
  Layout,
  Avatar,
  Button,
  Icon,
  Divider,
} from '@ui-kitten/components';
import React from 'react';
import styles from './styles/styles';

const PersonIcon = (props): JSX.Element => (
  <Icon {...props} name="person-outline" />
);
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

const tutorCalendar = (): JSX.Element => (
  <Button
    style={styles.button}
    appearance="ghost"
    status="control"
    accessoryLeft={CalendarIcon}
    size="giant">
    My Calendar
  </Button>
);

const SideBar = (): JSX.Element => {
  return (
    <Layout level="primary" style={styles.container}>
      <View>
        <Layout level="primary" style={styles.userTitleContainer}>
          <Text style={styles.text}>User Name</Text>
          <Avatar
            size="giant"
            source={require('./avatar_placeholder.png')}
            style={styles.avatar}
          />
        </Layout>
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={PersonIcon}
          size="giant">
          Profile
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={BookIcon}
          size="giant">
          My Sessions
        </Button>
        {/* conditional button: if userObject session is "tutor" display tutorCalendar*/}
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={CreditCardIcon}
          size="giant">
          Payment Options
        </Button>
        <Divider style={styles.divider} />
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={HistoryIcon}
          size="giant">
          Account History
        </Button>
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={CampusIcon}
          size="giant">
          Select Campus
        </Button>
        <Divider style={styles.divider} />
        <Button
          style={styles.button}
          appearance="ghost"
          status="control"
          accessoryLeft={EmptyIcon}
          size="giant">
          Sign out
        </Button>
      </View>
      <View style={styles.terms}>
        <Button
          style={styles.termsButton}
          appearance="ghost"
          status="control"
          size="medium">
          Terms and Conditions
        </Button>
      </View>
    </Layout>
  );
};

export default SideBar;
