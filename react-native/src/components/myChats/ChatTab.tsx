import React from 'react';
import {List, Layout} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import ChatItem from './ChatItem';
import IChatTab from '../../model/myChats/IChatTab';

const ChatTab: React.FC<IChatTab> = (props): JSX.Element => (
  <Layout>
    <List
      style={styles.listContainer}
      data={props.source}
      renderItem={ChatItem}
    />
  </Layout>
);

export default ChatTab;
