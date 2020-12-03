import React from 'react';
import {
  Button,
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text
} from '@ui-kitten/components';
import chatStyles from './styles/chatStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const renderRightActions = () => (
  <>
    <Button size="medium" style={chatStyles.bookButton}>
      Book
    </Button>
  </>
);



const renderTitle = () => (
  <TouchableOpacity>
    <Text style = {chatStyles.chatTitle}>
      Title
    </Text>
    <Text style = {chatStyles.chatTitle}>
      View Details
    </Text>
  </TouchableOpacity>
);

const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

const Header = () => {
  return (
    <Layout
      style={{
        height: 'auto',
      }}
      level="1">
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
