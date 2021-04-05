import React from 'react';
import {Icon, Button} from '@ui-kitten/components';
import styles from './styles';
import NavigationInjectedPropsConfigured from '../../../model/navigation/NavigationInjectedPropsConfigured';

type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

type IBackButton = RequireOnlyOne<
  Partial<NavigationInjectedPropsConfigured>,
  'goBack'
>;

const BackButtonIcon = (): JSX.Element => {
  return (
    <Icon fill="black" name="arrow-back-outline" style={styles.backButton} />
  );
};

const BackButton: React.FC<IBackButton> = ({
  goBack,
}: Partial<NavigationInjectedPropsConfigured>): JSX.Element => {
  return (
    <Button
      appearance="ghost"
      onPress={(): void => goBack()}
      accessoryLeft={BackButtonIcon}
    />
  );
};

export default BackButton;
