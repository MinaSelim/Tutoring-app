import {useContext, createContext} from 'react';
import appUserTypeContext from '../contexts/userType/context';

const useUserType = () => {
  const {userType, setUserType} = useContext(createContext(null));
  return [userType, setUserType];
};

export default useUserType;
