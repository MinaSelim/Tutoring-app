/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {Component} from 'react';
import {View, Text} from 'react-native';

class DummyUtils extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <View>
        <Text>Hello World!</Text>
      </View>
    );
  }
}
export default DummyUtils;
