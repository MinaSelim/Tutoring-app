import {View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {Text, List, Button, Icon, Modal} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import BackButton from '../common/backButton';
import CampusCard from './CampusCard';
import Search from './Search';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

const EditTutorCampuses: React.FunctionComponent<INavigation> = (
  props,
): JSX.Element => {
  //TODO replace with campuses from user
  const [userCampuses] = useState([
    'Concordia University',
    'McGill University',
    'Bishop',
    'UDM',
    'test',
  ]);

  //replace with backend data
  const backendCampuses = [
    {title: 'Star Wars'},
    {title: 'Back to the Future'},
    {title: 'The Matrix'},
    {title: 'Inception'},
    {title: 'Interstellar'},
  ];

  const [isAddCampusVisible, setIsAddCampusVisibility] = useState(false);

  const AddButton = (): JSX.Element => {
    return <Icon fill="black" name="plus-outline" style={styles.addButton} />;
  };

  const CampusListView = (): JSX.Element => {
    if (userCampuses.length === 0) return <NoCampusesView />;
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
        <View style={styles.noCampusesAddACampus}>
          <View style={styles.noCampusAddACampusRule} />
          <Text style={styles.noCampusAddACampusText}> Add a campus </Text>
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
          Press on a campus to edit its classes
        </Text>
        <List
          data={userCampuses}
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

  const AddCampusModal = (): JSX.Element => {
    return (
      <Modal
        style={{top: 100}}
        visible={isAddCampusVisible}
        backdropStyle={styles.modalBackground}
        onBackdropPress={(): void => setIsAddCampusVisibility(false)}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.noCampusesAddACampus}>
            <View style={styles.noCampusAddACampusRule} />
            <Text style={styles.noCampusAddACampusText}> Add a campus </Text>
            <View style={styles.noCampusAddACampusRule} />
          </View>
          <View style={styles.autocomplete}>
            <Search items={backendCampuses} />
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Your Campuses</Text>
        <Button
          appearance="ghost"
          onPress={(): void => {
            setIsAddCampusVisibility(true);
          }}
          accessoryLeft={AddButton}
        />
      </View>
      <CampusListView />
      <AddCampusModal />
    </SafeAreaView>
  );
};

export default EditTutorCampuses;
