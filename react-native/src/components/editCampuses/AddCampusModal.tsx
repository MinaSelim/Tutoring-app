import {View, SafeAreaView} from 'react-native';
import {Text, Button, Modal} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import AutocompleteSearch from './AutocompleteSearch';

interface IAddCampusModal {
  isAddCampusVisible: boolean;
  setIsAddCampusVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditClasses: React.FunctionComponent<IAddCampusModal> = ({
  isAddCampusVisible,
  setIsAddCampusVisibility,
}): JSX.Element => {
  const [campusToAdd, setCampusToAdd] = useState<string>('');
  if (isAddCampusVisible === undefined) setIsAddCampusVisibility(false);
  return (
    <Modal
      style={styles.modalPosition}
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
          <AutocompleteSearch
            category={'campuses'}
            itemToAdd={campusToAdd}
            setItemToAdd={setCampusToAdd}
          />
        </View>
        <Button
          style={styles.button}
          size="medium"
          disabled={
            campusToAdd === '' /*|| userCampuses.includes(campusToAdd)*/
          }
          onPress={(): void => {
            // userCampuses.push(campusToAdd);
            // setIsAddCampusVisibility(false);
          }}>
          Confirm
        </Button>
      </SafeAreaView>
    </Modal>
  );
};

export default EditClasses;
