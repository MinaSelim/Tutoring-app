import {View, SafeAreaView, Image} from 'react-native';
import {Text, List, Button, Icon} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import BackButton from '../common/backButton';
import CampusCard from './CampusCard';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

const EditCampuses: React.FunctionComponent<INavigation> = (
  props,
): JSX.Element => {
  //TODO replace with campuses from user
  const [campuses] = useState([
    // 'Concordia University',
    // 'McGill University',
    // 'Bishop',
    // 'UDM',
    // 'test',
  ]);

  const AddButton = (): JSX.Element => {
    return <Icon fill="black" name="plus-outline" style={styles.addButton} />;
  };

  const CampusListView = (): JSX.Element => {
    if (campuses.length === 0) return <NoCampusesView />;
    else return <ExistantCampusesView />;
  };

  const NoCampusesView = (): JSX.Element => {
    return (
      <>
        <Text style={styles.selectYourCampus}>
          You have no associated campuses
        </Text>
        <Image
          source={require('../../assets/images/icons/university.png')}
          style={styles.noCampusesIcon}
        />
        <Text style={styles.noCampusesAddACampus}>Add a campus</Text>
        <Image
          style={styles.noCampusesAddButton}
          source={require('../../assets/icons/addCampus.png')}
        />
      </>
    );
  };

  const ExistantCampusesView = (): JSX.Element => {
    return (
      <>
        <Text style={styles.selectYourCampus}>
          Press on a campus to edit its classes
        </Text>
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
          style={styles.list}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Your Campuses</Text>
        <Button
          appearance="ghost"
          onPress={(): void => {}}
          accessoryLeft={AddButton}
        />
      </View>
      <CampusListView />
    </SafeAreaView>
  );
};

export default EditCampuses;
