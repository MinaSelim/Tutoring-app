/* eslint-disable react/jsx-props-no-spreading */
import {AppRegistry} from 'react-native';
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

AppRegistry.registerComponent('BookingApp', () => App);
