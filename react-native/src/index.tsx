import {AppRegistry, View} from 'react-native';
import React, {Component} from 'react';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import mapping from '../mapping.json';
import theme from '../custom-theme.json'; // <-- Import app theme
import RouteStack from './routing/routeStack';

class App extends Component {
  render(): JSX.Element {
    return (
      <View>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...eva}
          customMapping={{...eva.mapping, mapping}}
          theme={{...eva.light, ...theme}}>
          <RouteStack />
        </ApplicationProvider>
      </View>
    );
  }
}

AppRegistry.registerComponent('GoStudy', () => App);
