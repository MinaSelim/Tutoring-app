import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import styles from './styles';
import PageHeader from '../../components/chatInbox/PageHeader';
import ChatMenu from '../../components/chatInbox/ChatMenu';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import DirectMessageChat from '../../api/chatroom/DirectMessageChat';
import IChat from '../../api/chatroom/components/IChat';

interface IChatInbox extends INavigation {
  oneOnOneSource: IChat[];
  groupChatsource: IChat[];
}

// const chat1 = new DirectMessageChat();
// chat1.createChatroom(
//   'bJiEoXuUihgOP3iRBEWceji5mjr1',
//   'sQ3hsTOxYZdjffVY6lNA0Mwt0iy2',
//   'direct',
// );
// chat1.createChatroom(
//   'bJiEoXuUihgOP3iRBEWceji5mjr1',
//   '7nw6KGylW5S3gthCJ3bSq7bFkgC2',
//   'direct',
// );

const chatInbox: React.FunctionComponent<IChatInbox> = ({
  navigation,
  oneOnOneSource,
  groupChatsource,
  navigate,
  goBack,
  toggleDrawer,
}: IChatInbox): JSX.Element => {
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
        oneOnOnesource={oneOnOneSource}
        groupChatsource={groupChatsource}
      />
      <Text style={styles.footer}> go.study </Text>
    </Layout>
  );
};

export default chatInbox;
