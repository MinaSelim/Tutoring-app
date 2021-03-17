import {View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import {
  Text,
  List,
  Button,
  Icon,
  Autocomplete,
  AutocompleteItem,
  Modal,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import BackButton from '../common/backButton';
import CampusCard from './CampusCard';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

const EditCampuses: React.FunctionComponent<INavigation> = (
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
    const Arrow = (props): JSX.Element => (
      <Icon {...props} name="arrow-ios-downward-outline" />
    );
    //replace with real campuses
    const campuses = [
      {title: 'Star Wars'},
      {title: 'Back to the Future'},
      {title: 'The Matrix'},
      {title: 'Inception'},
      {title: 'Interstellar'},
    ];
    const [value, setValue] = React.useState('');
    const [data, setData] = React.useState(campuses);

    const onSelect = (index): void => {
      setValue(campuses[index].title);
    };

    const onChangeText = (query): void => {
      setValue(query);
      setData(
        campuses.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    };

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
            <Autocomplete
              placeholder="Select a campus"
              accessoryRight={Arrow}
              placement="bottom start"
              value={value}
              onSelect={onSelect}
              onChangeText={onChangeText}>
              {data.map((item, index) => (
                <AutocompleteItem key={index} title={item.title} />
              ))}
            </Autocomplete>
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

export default EditCampuses;
