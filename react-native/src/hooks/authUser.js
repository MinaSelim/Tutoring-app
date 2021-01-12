import {useContext} from 'react';
import appAuthUserContext from '../contexts/authUser/context';
import IUser from '../model/common/IUser';

//type AuthUserHook = [IUser | null, (user: IUser | null) => void];

const useAuthUser = () => {
  const {authUser, setAuthUser} = useContext(appAuthUserContext);
  return [authUser, setAuthUser];
};

export default useAuthUser;
