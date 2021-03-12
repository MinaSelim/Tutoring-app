import {View, SafeAreaView} from 'react-native';
import {Text, List, Layout} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import BackButton from '../common/backButton';
import CampusCard from './CampusCard';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

interface IEditCampus extends INavigation {
  route: any;
}

const EditCampus: React.FunctionComponent<IEditCampus> = (
  props,
): JSX.Element => {
  //TODO replace with campuses from user
  const classes = ['Comp-100', 'Comp-101', 'Comp-102', 'Comp-103', 'Comp-104'];
  const {campusName} = props.route.params;

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Edit Courses</Text>
        <Text style={styles.placeholder}>empty</Text>
      </View>
      <Text>{campusName}</Text>
      <Text>Classes page</Text>
    </SafeAreaView>
  );
};

export default EditCampus;
