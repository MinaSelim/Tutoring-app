import {createContext} from 'react';
import {
  getPersistedUserType,
  persistUserType,
} from '../../utils/localstorage/localstorage';

interface AppContextInterface {
  userType: Promise<string | null>;
  setUserType: (user: string | null) => void;
}

const context: AppContextInterface = {
  userType: getPersistedUserType(),
  setUserType: (userType: string | null) => {
    persistUserType(userType);
  },
};

const appUserTypeContext = createContext(context);

export default appUserTypeContext;
