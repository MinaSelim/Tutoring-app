import AsyncStorage from '@react-native-community/async-storage';
import IUser from '../../model/common/IUser';

const AUTH_USER_KEY = 'auth_user';

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
