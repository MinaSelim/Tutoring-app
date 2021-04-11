import React from 'react';
import {List, Layout} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import ChatItem from './ChatItem';
import IChatTab from '../../model/chatInbox/IChatTab';
import { Text } from 'react-native-svg';

const ChatTab: React.FC<IChatTab> = ({
  navigate,
  navigation,
  toggleDrawer,
  goBack,
  source,
  isLoadingChats
}: IChatTab): JSX.Element => {
  return (
    <Layout>
      {!isLoadingChats && 
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
          />)
        }
        />
        }
        {
          isLoadingChats && <Text>"Loading..."</Text>
        }
      </Layout>
  );
}
  

export default ChatTab;
