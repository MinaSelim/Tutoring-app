import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import styles from './styles';
import PageHeader from '../../components/chatInbox/PageHeader';
import ChatMenu from '../../components/chatInbox/ChatMenu';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

const chatInbox: React.FunctionComponent<INavigation> = ({
  navigation,
  navigate,
  goBack,
  toggleDrawer,
}): JSX.Element => {
  return (
    <Layout style={styles.mainFrame}>
      <PageHeader
        navigation={navigation}
        navigate={navigate}
        goBack={navigate}
      />
      <ChatMenu
        navigation={navigation}
        navigate={navigate}
        goBack={goBack}
        toggleDrawer={toggleDrawer}
      />
      <Text style={styles.footer}> go.study </Text>
    </Layout>
  );
};

export default chatInbox;
