import AsyncStorage from '@react-native-community/async-storage';
import IUser from '../../model/common/IUser';

const AUTH_USER_KEY = 'auth_user';

export const persistAuthUser = (user: IUser | null): void => {
  if (!user) {
    AsyncStorage.removeItem(AUTH_USER_KEY);
  } else {
    AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

export const getPersistedAuthUser = (): IUser | null => {
  let user = null;
  AsyncStorage.getItem(AUTH_USER_KEY).then((stringifiedUserstring) => {
    if (stringifiedUserstring) {
      try {
        user = JSON.parse(stringifiedUserstring);
      } catch (e) {
        console.log('Unable to parse local user', e);
      }
    }
  });
  return user;
};
