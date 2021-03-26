import {View, SafeAreaView} from 'react-native';
import {Text, Button, List, ListItem, Card} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditClassesStyles';
import BackButton from '../common/backButton';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import {useTheme} from '@ui-kitten/components';
import Search from './Search';

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

  const RemoveButton = (props): JSX.Element => (
    <Button status="basic">Remove</Button>
  );

  const ClassItem = (): JSX.Element => (
    <ListItem style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text>Class</Text>
      <Button status="basic">Remove</Button>
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
            <Search items={undefined} />
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
              renderItem={(): JSX.Element => <ClassItem />}
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
