import React from 'react';
import {Icon, Button, TopNavigation} from '@ui-kitten/components';
import styles from './styles';
import BackButtonComponent from './backButtonComponent';
import NavigationInjectedPropsConfigured from '../../../model/navigation/NavigationInjectedPropsConfigured';

const BackButtonIcon = (): JSX.Element => {
  return (
    <Icon fill="black" name="arrow-back-outline" style={styles.backButton} />
  );
};

const BackButton: React.FC<NavigationInjectedPropsConfigured> = ({
  goBack,
}: NavigationInjectedPropsConfigured): JSX.Element => {
  return (
    <TopNavigation
      alignment="center"
      accessoryLeft={(): JSX.Element => <BackButtonComponent goBack={goBack} />}
    />
  );
};

export default BackButton;
