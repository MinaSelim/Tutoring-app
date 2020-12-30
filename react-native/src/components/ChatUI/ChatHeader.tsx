import React from 'react';
import {
  Button,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import chatStyles from './styles/chatStyles';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;

const renderRightActions = (): JSX.Element => (
  <Button size="small" style={chatStyles.bookButton}>
    {(evaProps): JSX.Element => (
      <Text style={chatStyles.bookButtonText} {...evaProps}>
        Book
      </Text>
    )}
  </Button>
);

const renderTitle = (): JSX.Element => (
  <TouchableOpacity>
    <Text style={chatStyles.chatTitle}>Jessie Allen</Text>
    <Text style={chatStyles.chatSubTitle}>View Details</Text>
  </TouchableOpacity>
);

const renderBackAction = (): JSX.Element => (
  <TopNavigationAction icon={BackIcon} />
);

const Header = (): JSX.Element => {
  return (
    <Layout style={chatStyles.headerContainer} level="1">
      <TopNavigation
        alignment="center"
        title={renderTitle}
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
};
export default Header;
