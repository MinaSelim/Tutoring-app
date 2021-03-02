import React from 'react';
import {List, Layout} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import ChatItem from './ChatItem';
import IChatTab from '../../model/chatInbox/IChatTab';

const ChatTab: React.FC<IChatTab> = ({
  navigate,
  navigation,
  toggleDrawer,
  goBack,
  source,
}: IChatTab): JSX.Element => (
  <Layout>
    <List
      style={styles.listContainer}
      data={source}
      renderItem={(item): JSX.Element => (
        <ChatItem
          {...item}
          navigation={navigation}
          navigate={navigate}
          goBack={goBack}
          toggleDrawer={toggleDrawer}
        />
      )}
    />
  </Layout>
);

export default ChatTab;
