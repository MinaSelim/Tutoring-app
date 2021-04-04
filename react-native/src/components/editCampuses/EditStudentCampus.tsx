import {View, SafeAreaView, Image} from 'react-native';
import {Text, Card} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/EditCampusesStyles';
import campusCardStyles from './styles/CampusCardStyles';
import BackButton from '../common/backButton';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import useAuthUser from '../../hooks/authUser';
import AddCampusModal from './AddCampusModal';
import constants from '../../constants/index';

const EditStudentCampus: React.FunctionComponent<INavigation> = (
  props,
): JSX.Element => {
  const user = useAuthUser()[0];
  const [isAddCampusVisible, setIsAddCampusVisibility] = useState(false);

  return (
    <SafeAreaView style={styles.generalView}>
      <View style={styles.campusSelectHeader}>
        <BackButton {...props} />
        <Text style={styles.title}>{constants.editCampuses.yourCampus}</Text>
        <Text style={{opacity: 0}}>{constants.editCampuses.placeholder}</Text>
      </View>
      {/* <Text style={styles.selectYourCampus}>
        Press on a campus to edit its classes
      </Text> */}
      <Card
        style={[campusCardStyles.card, {minHeight: 10}]}
        onPress={(): void => {
          setIsAddCampusVisibility(true);
        }}>
        <Image
          source={require('../../assets/images/icons/university.png')}
          style={campusCardStyles.universityImage}
        />
        <Text style={campusCardStyles.universityText}>
          {user!.student_info.campus}
        </Text>
      </Card>
      <AddCampusModal
        isAddCampusVisible={isAddCampusVisible}
        setIsAddCampusVisibility={setIsAddCampusVisibility}
      />
    </SafeAreaView>
  );
};

export default EditStudentCampus;
