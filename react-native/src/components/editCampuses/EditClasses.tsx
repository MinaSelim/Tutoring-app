import {View, SafeAreaView, Image} from 'react-native';
import {
  Text,
  Drawer,
  DrawerGroup,
  DrawerItem,
  Icon,
  Button,
} from '@ui-kitten/components';
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
  const classes = ['Comp-100', 'Comp-101', 'Comp-102', 'Comp-103', 'Comp-104'];
  const {campusName} = props.route.params;
  const [isListExpanded, setIsListExpanded] = useState(false);
  const theme = useTheme();

  const RemoveButton = (): JSX.Element => (
    <Button status="basic">Remove</Button>
  );

  const ArrowIcon = (): JSX.Element => {
    let iconName = '';
    if (!isListExpanded) iconName = 'arrow-ios-downward-outline';
    else iconName = 'arrow-ios-upward-outline';
    return (
      <Icon
        {...props}
        name={iconName}
        fill={'orange'}
        style={styles.arrowIcon}
      />
    );
  };

  const ClassesText = (): JSX.Element => {
    return <Text style={styles.yourClassesText}>Your Classes</Text>;
  };

  // const StarIcon = (props): JSX.Element => <Icon {...props} name="star" />;

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Edit Courses</Text>
        <Text style={styles.placeholder}>empty</Text>
      </View>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View>
          <Text style={styles.universityText}>{campusName}</Text>
          {/* <Image
            source={require('../../assets/images/icons/university.png')}
            style={styles.universityImage}
          /> */}
          {/* <Text style={styles.yourClassesText}>Your Classes</Text> */}
          <View style={styles.yourClasses}>
            <View style={styles.yourClassesRule} />
            <Text style={styles.yourClassesText}> Add a class </Text>
            <View style={styles.yourClassesRule} />
          </View>
          <View style={styles.searchBar}>
            <Search />
          </View>
          <View style={styles.middleSection}>
            <View style={styles.yourClasses}>
              <View style={styles.yourClassesRule} />
              <Text style={styles.yourClassesText}> Your Classes </Text>
              <View style={styles.yourClassesRule} />
            </View>
          </View>
        </View>
        {/* <Drawer
          onSelect={(): void => {}}
          style={{
            alignSelf: 'center',
            width: '90%',
            backgroundColor: 'red',
            maxHeight: 50,
          }}>
          <DrawerGroup
            title={ClassesText}
            // accessoryRight={ArrowIcon}
            onPress={(): void => setIsListExpanded(!isListExpanded)}
            style={{width: 120, alignSelf: 'center'}}>
            <DrawerItem title="UI Kitten" accessoryRight={RemoveButton} />
            <DrawerItem title="Kitten Tricks" accessoryRight={RemoveButton} />
          </DrawerGroup>
        </Drawer> */}
        <View>
          <Button style={styles.button} size="large">
            Confirm Changes
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
