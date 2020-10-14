import {AppRegistry, View, Text} from 'react-native';
import React, {Component} from 'react';

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
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
