import React from 'react';
import {Text, TabBar, Tab} from '@ui-kitten/components';
import styles from './styles/SignInStyles';
import {View} from 'react-native';

//function using useState hook to toggle between login user types
function ToggleBarStudentTutor(): JSX.Element {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let signInUserType;
  if (selectedIndex) {
    signInUserType = (
      <Text style={styles.signInUserType} category="s1">
        Tutor
      </Text>
    );
  } else {
    signInUserType = (
      <Text style={styles.signInUserType} category="s1">
        Student
      </Text>
    );
  }
  return (
    <>
      <TabBar
        style={styles.topTab}
        selectedIndex={selectedIndex}
        onSelect={(index): void => setSelectedIndex(index)}>
        <Tab title="Student" />
        <Tab title="Tutor" />
      </TabBar>
      <Text style={styles.welcome} category="h4">
        Welcome!
      </Text>
      <View style={styles.signInAsAView}>
        <Text style={styles.signInToContinue}>Sign in as a {}</Text>
        {signInUserType}
      </View>
    </>
  );
}
export default ToggleBarStudentTutor;
