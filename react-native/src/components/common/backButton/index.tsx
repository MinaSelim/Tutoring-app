// TODO extract component to use it across pages

import React from 'react';
import {Icon, Button} from '@ui-kitten/components';
import styles from '../../chatInbox/styles/MyChatStyles';
import NavigationInjectedPropsConfigured from '../../../model/navigation/NavigationInjectedPropsConfigured';

const BackButtonIcon = (): JSX.Element => {
  return (
    <Icon fill="black" name="arrow-back-outline" style={styles.backButton} />
  );
};

const BackButton: React.FC<NavigationInjectedPropsConfigured> = (
  props,
): JSX.Element => {
  return (
    <Button
      appearance="ghost"
      onPress={(): boolean => props.navigation.goBack()}
      accessoryLeft={BackButtonIcon}
    />
  );
};

export default BackButton;
