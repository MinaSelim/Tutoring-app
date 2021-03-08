import React from 'react';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import chatStyles from './styles/chatStyles';
import BookButton from '../widgets/BookButton';
import constants from '../../constants';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;

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

const Header = ({navigation}): JSX.Element => {
  return (
    <Layout style={chatStyles.headerContainer} level="1">
      <TopNavigation
        alignment="center"
        title={renderTitle}
        accessoryLeft={renderBackAction}
        accessoryRight={(): JSX.Element => (
          <BookButton navigation={navigation} />
        )}
      />
    </Layout>
  );
};
export default Header;
