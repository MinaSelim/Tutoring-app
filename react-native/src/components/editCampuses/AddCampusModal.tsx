import {View, SafeAreaView, Alert} from 'react-native';
import {Text, Button, Modal} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import AutocompleteSearch from './AutocompleteSearch';
import useAuthUser from '../../hooks/authUser';
import UserUpdate from '../../api/profile/UserUpdate';
import constants from '../../constants/index';

interface IAddCampusModal {
  isAddCampusVisible: boolean;
  setIsAddCampusVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditClasses: React.FunctionComponent<IAddCampusModal> = ({
  isAddCampusVisible,
  setIsAddCampusVisibility,
}): JSX.Element => {
  const [campusToAdd, setCampusToAdd] = useState<string>('');
  const user = useAuthUser()[0];
  const userType = user!.hasOwnProperty('tutor_info') ? 'tutor' : 'student';

  function isButtonDisabled(): boolean {
    if (userType === 'tutor')
      return (
        campusToAdd === '' ||
        JSON.stringify(user!.tutor_info.campuses).includes(campusToAdd)
      );
    else
      return (
        campusToAdd === '' ||
        JSON.stringify(user!.student_info.campus).includes(campusToAdd)
      );
  }

  function addTutorCampus(): void {
    try {
      UserUpdate.addTutorCampus(user!.firebase_uid, campusToAdd);
      user!.tutor_info.campuses.push(campusToAdd);
    } catch (error) {
      Alert.alert(`${error}`);
    }
  }

  function updateStudentCampus(): void {
    try {
      UserUpdate.updateStudentCampus(user!.firebase_uid, campusToAdd);
      user!.student_info.campus = campusToAdd;
    } catch (error) {
      Alert.alert(`${error}`);
    }
  }

  return (
    <Modal
      style={styles.modalPosition}
      visible={isAddCampusVisible}
      backdropStyle={styles.modalBackground}
      onBackdropPress={(): void => setIsAddCampusVisibility(false)}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.noCampusesAddACampus}>
          <View style={styles.noCampusAddACampusRule} />
          <Text style={styles.noCampusAddACampusText}>
            {' '}
            {constants.editCampuses.addACampus}{' '}
          </Text>
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
          disabled={isButtonDisabled()}
          onPress={(): void => {
            if (userType === 'tutor') addTutorCampus();
            else updateStudentCampus();
            setIsAddCampusVisibility(false);
          }}>
          {constants.editCampuses.confirm}
        </Button>
      </SafeAreaView>
    </Modal>
  );
};

export default EditClasses;
