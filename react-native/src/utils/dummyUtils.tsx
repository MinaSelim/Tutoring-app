import React, {Component} from 'react';
import {View, Text} from 'react-native';

class DummyUtils extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Hello World!</Text>
        <Text>arbitrary change for commit test</Text>
      </View>
    );
  }
}
export default DummyUtils;
