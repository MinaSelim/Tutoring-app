import {AppRegistry} from 'react-native';
import React from 'react';
import {Component} from 'react';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import mapping from './mapping.json';
import theme from './custom-theme.json'; // <-- Import app theme
import RouteStack from './routeStack';

class App extends Component {
  render(): JSX.Element {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          customMapping={mapping}
          theme={{...eva.light, ...theme}}>
          <RouteStack />
        </ApplicationProvider>
      </>
    );
  }
}

AppRegistry.registerComponent('GoStudy', () => App);
