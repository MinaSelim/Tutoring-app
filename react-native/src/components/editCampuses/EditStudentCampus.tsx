import {View, SafeAreaView, Image} from 'react-native';
import {Text, Card, Modal} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import campusCardStyles from './styles/CampusCardStyles';
import BackButton from '../common/backButton';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import useAuthUser from '../../hooks/authUser';
import AutocompleteSearch from './AutocompleteSearch';

const EditStudentCampus: React.FunctionComponent<INavigation> = (
  props,
): JSX.Element => {
  const [user, setAuthUser] = useAuthUser();
  const [campusToAdd, setCampusToAdd] = useState<string>('');
  const [isAddCampusVisible, setIsAddCampusVisibility] = useState(false);
  const campus = 'Concordia';

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>Your Campus</Text>
        <Text style={{opacity: 0}}>Placeholder</Text>
      </View>
      <Text style={styles.selectYourCampus}>
        Press on a campus to edit its classes
      </Text>
      <Card
        style={[campusCardStyles.card, {minHeight: 10}]}
        onPress={(): void => {
          <Modal
            style={{top: 100}}
            visible={isAddCampusVisible}
            backdropStyle={styles.modalBackground}
            onBackdropPress={(): void => setIsAddCampusVisibility(false)}>
            <SafeAreaView style={styles.modal}>
              <View style={styles.noCampusesAddACampus}>
                <View style={styles.noCampusAddACampusRule} />
                <Text style={styles.noCampusAddACampusText}>
                  {' '}
                  Add a campus{' '}
                </Text>
                <View style={styles.noCampusAddACampusRule} />
              </View>
              <View style={styles.autocomplete}>
                <AutocompleteSearch
                  category={'campuses'}
                  setItemToAdd={setCampusToAdd}
                />
              </View>
            </SafeAreaView>
          </Modal>;
        }}>
        <Image
          source={require('../../assets/images/icons/university.png')}
          style={campusCardStyles.universityImage}
        />
        <Text style={campusCardStyles.universityText}>
          {/* {user!.student_info.campus} */}
          {campus}
        </Text>
      </Card>
    </SafeAreaView>
  );
};

export default EditStudentCampus;
