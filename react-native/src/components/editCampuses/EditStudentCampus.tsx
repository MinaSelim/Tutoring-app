import {View, SafeAreaView, Image} from 'react-native';
import {Text, Card} from '@ui-kitten/components';
import React from 'react';
import styles from './styles/EditCampusesStyles';
import campusCardStyles from './styles/CampusCardStyles';
import BackButton from '../common/backButton';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import useAuthUser from '../../hooks/authUser';

const EditStudentCampus: React.FunctionComponent<INavigation> = (
  props,
): JSX.Element => {
  const [user, setAuthUser] = useAuthUser();
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
          /* modal */
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
