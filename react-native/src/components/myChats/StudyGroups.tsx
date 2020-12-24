import React from 'react';
import {Layout, List} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';
import MockupStudyGroupData from './mockData/MockUpStudyGroupData';
import ChatItem from './ChatItem';

const StudyGroups = (): JSX.Element => (
  <Layout>
    <List
      style={styles.listContainer}
      data={MockupStudyGroupData}
      renderItem={ChatItem}
    />
  </Layout>
);

export default StudyGroups;
