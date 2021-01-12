import {createContext} from 'react';
import {
  getPersistedAuthUser,
  persistAuthUser,
} from '../../utils/localstorage/localstorage';
import IUser from '../../model/common/IUser';

interface AppContextInterface {
  authUser: IUser | null;
  setAuthUser: (user: IUser | null) => void;
}

const context: AppContextInterface = {
  authUser: getPersistedAuthUser(),
  setAuthUser: (user: IUser | null) => {
    persistAuthUser(user);
  },
};

const appAuthUserContext = createContext(context);

export default appAuthUserContext;
