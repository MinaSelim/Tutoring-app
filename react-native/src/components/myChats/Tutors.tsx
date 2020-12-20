import React from 'react';
import {List, Layout} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import MockupTutorData from './mockData/MockupTutorData';
import ChatItem from './ChatItem';

const Tutors = () => (
  <Layout>
    <List
      style={styles.listContainer}
      data={MockupTutorData}
      renderItem={ChatItem}
    />
  </Layout>
);

export default Tutors;
