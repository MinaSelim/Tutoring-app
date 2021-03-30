import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import {Text, Button, List, ListItem, Card} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditClassesStyles';
import BackButton from '../common/backButton';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import {useTheme} from '@ui-kitten/components';
import AutocompleteSearch from './AutocompleteSearch';

interface IEditCampus extends INavigation {
  route: any;
}

const EditClasses: React.FunctionComponent<IEditCampus> = (
  props,
): JSX.Element => {
  //TODO replace with campuses from user
  const classes = [
    'Comp-100',
    'Comp-101',
    'Comp-102',
    'Comp-103',
    'Comp-104',
    'Comp-100',
    'Comp-101',
    'Comp-102',
    'Comp-103',
    'Comp-104',
    'Comp-100',
    'Comp-101',
    'Comp-102',
    'Comp-103',
    'Comp-104',
  ];
  const {campusName} = props.route.params;
  const theme = useTheme();

  interface IClassItem {
    className: string;
  }

  const ClassItem: React.FunctionComponent<IClassItem> = ({
    className,
  }): JSX.Element => (
    <ListItem style={styles.classListItem}>
      <Text style={styles.classItemText}>{className}</Text>
      <TouchableOpacity style={styles.classItemButton}>
        <Text style={styles.classItemButtonText}>REMOVE</Text>
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Edit Courses</Text>
        <Text style={styles.placeholder}>empty</Text>
      </View>
      <View style={styles.contentView}>
        <View style={styles.topPart}>
          <Text style={styles.universityText}>{campusName}</Text>
          <View style={styles.yourClasses}>
            <View style={styles.yourClassesRule} />
            <Text style={styles.yourClassesText}> Add a class </Text>
            <View style={styles.yourClassesRule} />
          </View>
          <View style={styles.searchBar}>
            <AutocompleteSearch items={undefined} />
          </View>
          <View style={styles.middleSection}>
            <View style={styles.yourClasses}>
              <View style={styles.yourClassesRule} />
              <Text style={styles.yourClassesText}> Your Classes </Text>
              <View style={styles.yourClassesRule} />
            </View>
            <List
              style={styles.classList}
              data={classes}
              renderItem={(item): JSX.Element => (
                <ClassItem className={item.item} />
              )}
            />
          </View>
        </View>
        <View>
          <Button style={styles.button} size="large">
            Save Changes
          </Button>
          <Button style={styles.button} size="large" status="basic">
            Remove Campus
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditClasses;
