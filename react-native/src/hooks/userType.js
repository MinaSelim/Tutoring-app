import {useContext} from 'react';
import appUserTypeContext from '../contexts/userType/context';

const useUserType = () => {
  const {userType, setUserType} = useContext(appUserTypeContext);
  return [userType, setUserType];
};

export default useUserType;
