import {View, SafeAreaView, Button, TouchableOpacity} from 'react-native';
import {Text, List, Layout} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import BackButton from '../common/backButton';
import CampusCard from './CampusCard';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

const EditCampuses: React.FunctionComponent<INavigation> = (
  props,
): JSX.Element => {
  const [noCampus, changeNoCampus] = useState(false);

  //TODO replace with campuses from user
  const campuses = [
    'Concordia University',
    'McGill University',
    'Bishop',
    'UDM',
    'test',
  ];

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Your Campuses</Text>
        <Text style={styles.placeholder}>empty</Text>
      </View>
      <Text style={styles.selectYourCampus}>Press on a campus to edit it</Text>
      {/* <View style={{flex: 1}}> */}
      <List
        data={campuses}
        renderItem={(info): JSX.Element => (
          <CampusCard
            name={info.item}
            navigation={props.navigation}
            navigate={props.navigate}
            goBack={props.goBack}
            toggleDrawer={props.toggleDrawer}
          />
        )}
        style={{backgroundColor: 'white'}}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default EditCampuses;
