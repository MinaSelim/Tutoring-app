import {View, Image} from 'react-native';
import {Text, Button, Card, ListItem} from '@ui-kitten/components';
import React, {useState} from 'react';
import styles from './styles/CampusCardStyles';
import {colors} from '../../styles/appColors';
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
        navigation.navigate('EditCampus', {campusName: name})
      }>
      <Image
        source={require('../../assets/images/icons/university.png')}
        style={styles.universityImage}
      />
      <Text style={styles.universityText}>{name}</Text>
      {/* <Button appearance="primary" style={styles.button}>
        Edit
      </Button> */}
    </Card>
  );
};

export default CampusCard;
