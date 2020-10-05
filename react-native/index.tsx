import {AppRegistry} from 'react-native';
import React from 'react';
import {Component} from 'react';
import {View, Text} from 'react-native';
import {SERVER_LINK} from 'react-native-dotenv-milkywire';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Hello World</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('GoStudy', () => App);
