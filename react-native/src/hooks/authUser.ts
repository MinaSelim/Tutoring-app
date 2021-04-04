/* eslint-disable no-use-before-define */
import IStudent from 'model/common/IStudent';
import ITutor from 'model/common/ITutor';
import {useContext} from 'react';
import appAuthUserContext from '../contexts/authUser/context';
import IUser from '../model/common/IUser';

type AuthUserHook = [
  IUser | null,
  (user: IUser | IStudent | ITutor | null) => void,
];

const useAuthUser = (): AuthUserHook => {
  const {authUser, setAuthUser} = useContext(appAuthUserContext);
  return [authUser, setAuthUser];
};

export default useAuthUser;
