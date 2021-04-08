import React from 'react';
import {TopNavigation} from '@ui-kitten/components';
import BackButtonComponent from './backButtonComponent';
import NavigationInjectedPropsConfigured from '../../../model/navigation/NavigationInjectedPropsConfigured';

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
