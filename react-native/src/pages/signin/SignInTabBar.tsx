import React from 'react';
import {TabBar, Tab} from '@ui-kitten/components';
import styles from './styles';

// sign tab bar to toggle between Student and Tutor signIn
const SignInTopTabBar: React.FunctionComponent<any> = ({
  navigation,
  state,
}: any): JSX.Element => {
  return (
    <TabBar
      style={styles.topTab}
      selectedIndex={state.index}
      onSelect={(index): boolean =>
        navigation.navigate(state.routeNames[index])
      }>
      <Tab title="Student" />
      <Tab title="Tutor" />
    </TabBar>
  );
};

export default SignInTopTabBar;
