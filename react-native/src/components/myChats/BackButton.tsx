import React from 'react';
import {Icon} from '@ui-kitten/components';
import styles from './styles/MyChatStyles';

const BackButton = () => {
  return (
    <Icon fill="black" name="arrow-back-outline" style={styles.backButton} />
  );
};

export default BackButton;
