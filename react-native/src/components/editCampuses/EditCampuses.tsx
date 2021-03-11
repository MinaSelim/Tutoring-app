import {View, Image} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import React from 'react';
import styles from './styles/EditCampusesStyles';
import BackButton from '../common/backButton';

const EditCampuses = (props): JSX.Element => {
  return (
    <View>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Your Campuses</Text>
        <Text style={styles.placeholder}>empty</Text>
      </View>
      <Text style={styles.selectYourCampus}>Edit Campuses</Text>
    </View>
  );
};

export default EditCampuses;
