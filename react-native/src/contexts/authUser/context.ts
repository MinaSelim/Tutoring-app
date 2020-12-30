import {createContext} from 'react';
import {getPersistedAuthUser} from '../../utils/localstorage/localstorage';
import IUser from '../../model/common/IUser';

interface AppContextInterface {
  authUser: IUser | null;
  setAuthUser: (user: IUser | null) => void;
}

const context: AppContextInterface = {
  authUser: getPersistedAuthUser(),
  setAuthUser: () => {
    console.log('Able to set an authnticated user with this ...');
  },
};

const appAuthUserContext = createContext(context);

export default appAuthUserContext;
