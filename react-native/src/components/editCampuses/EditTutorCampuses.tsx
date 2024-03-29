import {View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {Text, List, Button, Icon} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import styles from './styles/EditCampusesStyles';
import BackButton from '../common/backButton';
import CampusCard from './CampusCard';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import AddCampusModal from './AddCampusModal';
import useAuthUser from '../../hooks/authUser';
import constants from '../../constants/index';

const EditTutorCampuses: React.FunctionComponent<INavigation> = (
  props,
): JSX.Element => {
  const user = useAuthUser()[0];
  //TODO bug when getting campuses from backend: first item is empty
  if (user!.tutor_info.campuses[0] === '') user!.tutor_info.campuses.shift();
  const [isAddCampusVisible, setIsAddCampusVisibility] = useState<boolean>(
    false,
  );
  const [hasNoCampus, setHasNoCampus] = useState<boolean>(
    user!.tutor_info.campuses.length === 0,
  );

  const AddButton = (): JSX.Element => {
    return <Icon fill="black" name="plus-outline" style={styles.addButton} />;
  };

  const CampusListView = (): JSX.Element => {
    if (hasNoCampus) return <NoCampusesView />;
    else return <ExistantCampusesView />;
  };

  useEffect(() => {
    setHasNoCampus(user!.tutor_info.campuses.length === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddCampusVisible]);

  const NoCampusesView = (): JSX.Element => {
    return (
      <>
        <Text style={styles.selectYourCampus}>
          {constants.editCampuses.noAssociatedCampuses}
        </Text>
        <Image
          source={require('../../assets/images/icons/university.png')}
          style={styles.noCampusesIcon}
        />
        <View style={styles.noCampusesAddACampus}>
          <View style={styles.noCampusAddACampusRule} />
          <Text style={styles.noCampusAddACampusText}>
            {' '}
            {constants.editCampuses.addACampus}{' '}
          </Text>
          <View style={styles.noCampusAddACampusRule} />
        </View>
        <TouchableOpacity
          onPress={(): void => {
            setIsAddCampusVisibility(true);
          }}>
          <Image
            style={styles.noCampusesAddButton}
            source={require('../../assets/icons/addCampus.png')}
          />
        </TouchableOpacity>
      </>
    );
  };

  const ExistantCampusesView = (): JSX.Element => {
    return (
      <>
        <Text style={styles.selectYourCampus}>
          {constants.editCampuses.pressOnCampusToEditClasses}
        </Text>
        <List
          data={user!.tutor_info.campuses}
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
        <BackButton
          navigate={props.navigate}
          toggleDrawer={props.toggleDrawer}
          goBack={props.navigation.goBack}
          navigation={props.navigation}
        />
        <Text style={styles.title}>{constants.editCampuses.yourCampuses}</Text>
        <Button
          appearance="ghost"
          onPress={(): void => {
            setIsAddCampusVisibility(true);
          }}
          accessoryLeft={AddButton}
        />
      </View>
      <CampusListView />
      <AddCampusModal
        isAddCampusVisible={isAddCampusVisible}
        setIsAddCampusVisibility={setIsAddCampusVisibility}
      />
    </SafeAreaView>
  );
};

export default EditTutorCampuses;
