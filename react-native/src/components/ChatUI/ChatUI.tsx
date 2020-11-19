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
  List,
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


// This is the main front end for the chat, it calls messageRow for the layout of every single message view
// and uses placeholder data from DATA.tsx to display messages, for prototyping.


const BackIcon = (props) => <Icon {...props} name="arrow-back" />;
const PaperPlaneIcon = (props) => <Icon {...props} name="paper-plane" />;

export const ChatUI = () => {
  const styles = useStyleSheet(chatStyles);

  const renderRightActions = () => (
    <>
      <Button size="medium" style={styles.bookButton}>
        Book
      </Button>
    </>
  );

  const renderViewDetails = () => (
    <>
      <Button status="control" size="tiny">
        View Details
      </Button>
    </>
  );

  const renderTitle = () => (
    <>
      <Button status="control" size="small">
        Title
      </Button>
    </>
  );

  const sendMessage = (): void => {};

  const renderMessage = ({item}) => <MessageRow key={item.key} {...item} />;

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

      <FlatList<IMessage>
        keyExtractor={(item) => item.key}
        renderItem={renderMessage}
        data={DATA}
      />

      <View style={styles.inputContainer}>
        <Input
          style={styles.input}
          placeholder="Message..."
          multiline
          textStyle={{maxHeight: 64}}
        />
      </View>

      <Button
        appearance="ghost"
        style={[styles.iconButton, styles.sendButton]}
        accessoryRight={PaperPlaneIcon}
        onPress={sendMessage}
      />
    </SafeAreaView>
  );
};
