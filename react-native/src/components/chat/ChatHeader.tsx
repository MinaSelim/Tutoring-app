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
import constants from '../../constants';
import chatStyles from './styles/chatStyles';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;

const renderRightActions = (): JSX.Element => (
  <Button size="small" style={chatStyles.bookButton}>
    {(evaProps): JSX.Element => (
      <Text style={chatStyles.bookButtonText} {...evaProps}>
        {constants.chat.chatHeader.Book}
      </Text>
    )}
  </Button>
);

const renderTitle = (): JSX.Element => (
  <TouchableOpacity>
    <Text style={chatStyles.chatTitle} />
    <Text style={chatStyles.chatSubTitle}>
      {constants.chat.chatHeader.ViewDetails}
    </Text>
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
