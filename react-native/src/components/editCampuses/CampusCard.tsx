import {Image} from 'react-native';
import {Text, Card} from '@ui-kitten/components';
import React from 'react';
import styles from './styles/CampusCardStyles';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';

interface ICampusCard extends INavigation {
  name: string;
}

const CampusCard: React.FunctionComponent<ICampusCard> = ({
  name,
  navigation,
}): JSX.Element => {
  return (
    <Card
      style={styles.card}
      onPress={(): boolean =>
        navigation.navigate('EditClasses', {
          campusName: name,
        })
      }>
      <Image
        source={require('../../assets/images/icons/university.png')}
        style={styles.universityImage}
      />
      <Text style={styles.universityText}>{name}</Text>
    </Card>
  );
};

export default CampusCard;
