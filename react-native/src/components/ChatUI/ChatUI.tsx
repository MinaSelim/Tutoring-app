import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import 'react-native-gesture-handler';
import {
  Button,
  StyleService,
  useStyleSheet,
  Input,
  IconRegistry,
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {Header} from '@react-navigation/stack';
import {chatStyles} from './styles/chatStyles';
import MessageList from './MessageList';
import MessageRow from './MessageRow';
import IMessage from '../../model/IMessage';
import {DATA} from './DATA';
// import {KeyboardAvoidingView} from './KeyboardAvoidingView';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const keyboardOffset = (height: number): number =>
  Platform.select({
    android: 0,
    ios: height,
  });

export const ChatUI = () => {
  const styles = useStyleSheet(chatStyles);

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <>
      <Button size="medium" style={styles.bookButton}>
        Book
      </Button>
    </>
  );

  const renderViewDetails = () => (
    <>
      <Button status = 'control' size = 'tiny'>
        View Details
      </Button>
    </>
  );

  const renderTitle = () => (
    <>
      <Button status = 'control' size = 'small'>
        View Details
      </Button>
    </>
  );


  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <SafeAreaView style={styles.container}>
      <Layout
        style={{
          height: 'auto',
        }}
        level="1">
        <TopNavigation
          alignment="center"
          title={renderTitle}
          subtitle={renderViewDetails}
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
        />
      </Layout>

      <ScrollView style={{flex: 1}}>
        {DATA.map((message: IMessage) => (
          <MessageRow key={message.key} {...message} />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Input style={styles.input} placeholder="Message..." />

        <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
          <Image
            style={styles.tinySendIcon}
            source={require('../../assets/icons/SendArrow.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
