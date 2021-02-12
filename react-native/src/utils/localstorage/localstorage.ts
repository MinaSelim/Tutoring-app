import AsyncStorage from '@react-native-community/async-storage';
import IUser from '../../model/common/IUser';

const AUTH_USER_KEY = 'auth_user';
const USER_TYPE_KEY = 'user_type';

export const persistAuthUser = (user: IUser | null): void => {
  if (user != null) {
    AsyncStorage.removeItem(AUTH_USER_KEY);
    AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

export const getPersistedAuthUser = (): IUser | null => {
  let user = null;
  AsyncStorage.getItem(AUTH_USER_KEY).then((stringifiedUserstring) => {
    if (stringifiedUserstring != null) {
      try {
        user = JSON.parse(stringifiedUserstring);
        return user;
      } catch (e) {
        return user;
      }
    } else return user;
  });
  return user;
};

export const persistUserType = (userType: string | null): void => {
  AsyncStorage.setItem(USER_TYPE_KEY, JSON.stringify(userType));
};

export const getPersistedUserType = (): Promise<string | null> => {
  console.log(JSON.stringify(AsyncStorage.getItem(USER_TYPE_KEY)));
  return AsyncStorage.getItem(USER_TYPE_KEY);
};
