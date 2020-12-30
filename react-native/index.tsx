/* eslint-disable react/jsx-props-no-spreading */
import {AppRegistry} from 'react-native';
import {SERVER_LINK} from 'react-native-dotenv-milkywire';
import React from 'react';
import {Component} from 'react';
import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {Provider} from 'react-redux';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import AppAuthContext from './src/contexts/authUser/context';
import mapping from './mapping.json';
import theme from './custom-theme.json'; // <-- Import app theme
import RouteStack from './routeStack';
import {getPersistedAuthUser} from './src/utils/localstorage/localstorage';
import 'react-native-gesture-handler';
// Model Imports
import IUser from './src/model/common/IUser';

class App extends Component {
  render(): JSX.Element {
      console.log(SERVER_LINK);
    return (
      <>
const App: React.FunctionComponent = () => {
  // States and refs
  const [authUser, setAuthUser] = useState<IUser | null>(
    getPersistedAuthUser(),
  );
  // TODO remove redux provider
      <AppAuthContext.Provider value={{authUser, setAuthUser}}>
  return (
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          customMapping={mapping}
          theme={{...eva.light, ...theme}}>
          <RouteStack />
        </ApplicationProvider>
      </AppAuthContext.Provider>
    </Provider>
  );
};

AppRegistry.registerComponent('GoStudy', () => App);
