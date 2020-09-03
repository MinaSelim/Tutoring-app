import {View} from 'react-native';
import React from 'react';
import styles from './layoutStyles';

const layout = ({children}) => {
  return <View style={styles.wrapper}>{children}</View>;
};

export default layout;
