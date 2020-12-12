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

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const renderRightActions = () => (
  <>
    <Button size="small" style={chatStyles.bookButton}>
      {evaProps => <Text style={{fontSize: 40}} {...evaProps}>Book</Text>}
    </Button>
  </>
);

const renderTitle = () => (
  <TouchableOpacity>
    <Text style={chatStyles.chatTitle}>Jessie Allen</Text>
    <Text style={chatStyles.chatSubTitle}>View Details</Text>
  </TouchableOpacity>
);

const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

const Header = () => {
  return (
    <Layout
      style={{
        height: 'auto',
        borderBottomColor: '#949494',
        borderBottomWidth: 0.5,
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
