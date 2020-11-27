import React from 'react';
import {Image} from 'react-native';
import styles from './styles/HomeStyles';

export const UniversityImage = () => {
  return (
    <Image
      source={require('../../assets/images/icons/university.png')}
      style={styles.universityImage}
    />
  );
};

export default UniversityImage;
