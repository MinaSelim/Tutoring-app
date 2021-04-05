import {View, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import {Text, Button, List, ListItem} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import styles from './styles/EditClassesStyles';
import BackButton from '../common/backButton';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import AutocompleteSearch from './AutocompleteSearch';
import useAuthUser from '../../hooks/authUser';
import UserUpdate from '../../api/profile/UserUpdate';
import constants from '../../constants/index';

interface IEditCampus extends INavigation {
  route: any;
}

const EditClasses: React.FunctionComponent<IEditCampus> = (
  props,
): JSX.Element => {
  const {campusName} = props.route.params;
  const user = useAuthUser()[0];
  //TODO bug when getting campuses from backend: first item is empty
  if (user!.tutor_info.classes[0] === '') user!.tutor_info.classes.shift();
  const [tempClasses, setTempClasses] = useState<string[]>(
    JSON.parse(JSON.stringify(user!.tutor_info.classes)),
  );
  const [classToAdd, setClassToAdd] = useState<string>('');

  useEffect(() => {
    tempClasses.push(classToAdd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classToAdd]);

  interface IClassItem {
    className: string;
  }

  const ClassItem: React.FunctionComponent<IClassItem> = ({
    className,
  }): JSX.Element => (
    <ListItem style={styles.classListItem}>
      <Text style={styles.classItemText}>{className}</Text>
      <TouchableOpacity
        style={styles.classItemButton}
        onPress={(): void =>
          setTempClasses(
            tempClasses.filter((classToRemove) => classToRemove !== className),
          )
        }>
        <Text style={styles.classItemButtonText}>
          {constants.editCampuses.remove}
        </Text>
      </TouchableOpacity>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>{constants.editCampuses.editCourses}</Text>
        <Text style={styles.placeholder}>{constants.editCampuses.empty}</Text>
      </View>
      <View style={styles.contentView}>
        <View style={styles.topPart}>
          <Text style={styles.universityText}>{campusName}</Text>
          <View style={styles.yourClasses}>
            <View style={styles.yourClassesRule} />
            <Text style={styles.yourClassesText}>
              {constants.editCampuses.addAClass}
            </Text>
            <View style={styles.yourClassesRule} />
          </View>
          <View style={styles.searchBar}>
            <AutocompleteSearch
              category={campusName}
              itemToAdd={classToAdd}
              setItemToAdd={setClassToAdd}
            />
          </View>
          <View style={styles.middleSection}>
            <View style={styles.yourClasses}>
              <View style={styles.yourClassesRule} />
              <Text style={styles.yourClassesText}>
                {constants.editCampuses.yourClasses}
              </Text>
              <View style={styles.yourClassesRule} />
            </View>
            <List
              style={styles.classList}
              data={tempClasses}
              renderItem={(item): JSX.Element => (
                <ClassItem className={item.item} />
              )}
            />
          </View>
        </View>
        <View>
          <Button
            style={styles.button}
            size="large"
            onPress={(): void => {
              //TODO refactor is required in the User object to allow adding classes
              //for specific campuses
              Alert.alert('Not yet available');
            }}>
            {constants.editCampuses.saveChanges}
          </Button>
          <Button
            style={styles.button}
            size="large"
            status="basic"
            onPress={(): void => {
              user!.tutor_info.campuses.pop(campusName);
              UserUpdate.removeTutorCampus(user!.firebase_uid, campusName);
              props.navigation.goBack();
            }}>
            {constants.editCampuses.removeCampus}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditClasses;
