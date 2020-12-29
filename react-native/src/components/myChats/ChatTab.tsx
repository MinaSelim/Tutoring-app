import React from 'react';
import {List, Layout} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import ChatItem from './ChatItem';

const ChatTab = (props): JSX.Element => (
  <Layout>
    <List
      style={styles.listContainer}
      data={props.source}
      renderItem={ChatItem}
    />
  </Layout>
);

export default ChatTab;
