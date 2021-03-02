import React from 'react';
import {Icon} from '@ui-kitten/components';
import styles from './styles';

export const SideMenuIcon = (): JSX.Element => {
  return <Icon fill="black" name="menu-outline" style={styles.tabButton} />;
};

export default SideMenuIcon;
