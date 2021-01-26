/* eslint-disable react/jsx-props-no-spreading */
import {AppRegistry} from 'react-native';
import {SERVER_LINK} from 'react-native-dotenv-milkywire';
import React from 'react';
import {Component} from 'react';
import 'react-native-gesture-handler';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import AppAuthContext from './src/contexts/authUser/context';
import mapping from './mapping.json';
import theme from './custom-theme.json'; // <-- Import app theme
import RouteStack from './routeStack';
import {getPersistedAuthUser} from './src/utils/localstorage/localstorage';
import 'react-native-gesture-handler';
import IUser from './src/model/common/IUser';

const App: React.FunctionComponent = () => {
  // States and refs
  const [authUser, setAuthUser] = useState<IUser | null>(
    getPersistedAuthUser(),
  );

  return (
    <AppAuthContext.Provider value={{authUser, setAuthUser}}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        customMapping={mapping}
        theme={{...eva.light, ...theme}}>
        <RouteStack />
      </ApplicationProvider>
    </AppAuthContext.Provider>
  );
};

AppRegistry.registerComponent('GoStudy', () => App);
// 1. Clear watchman watches: watchman watch-del-all
//  2. Delete node_modules: rm -rf node_modules and run yarn install
//  3. Reset Metro's cache: yarn start --reset-cache
//  4. Remove the cache: rm -rf /tmp/metro-*]
