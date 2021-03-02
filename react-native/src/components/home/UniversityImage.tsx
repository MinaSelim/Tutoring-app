import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

export const UniversityImage = (): JSX.Element => {
  return (
    <Image
      source={require('../../assets/images/icons/universityHome.png')}
      style={styles.universityImage}
    />
  );
};

export default UniversityImage;
