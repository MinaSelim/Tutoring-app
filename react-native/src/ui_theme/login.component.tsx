/* eslint-disable import/prefer-default-export */
import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Button, Input, Text, Layout} from '@ui-kitten/components';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});

export const Login = ({navigation}) => {
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();

  const onSignInButtonPress = (): void => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome!</Text>
        <Text>Sign in to continue</Text>
      </Layout>
      <View>
        <Input placeholder="email" value={email} onChangeText={setEmail} />
        <Input
          placeholder="password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button size="large" onPress={onSignInButtonPress}>
        Sign in
      </Button>
      <Button appearance="ghost">Forgot Password?</Button>
      <Button status="info" size="large" onPress={onSignInButtonPress}>
        Sign up
      </Button>
    </SafeAreaView>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
