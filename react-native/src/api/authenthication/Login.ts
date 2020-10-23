import {auth} from 'firebase';
import {SERVER_LINK} from 'react-native-dotenv-milkywire';
import fire from './Fire';
import IUserLogin from '../../model/IUserLogin';

/**
 * this class provides api abstraction for firebase
 */
export default class Login {
  private auth: auth.Auth;

  constructor(auth: auth.Auth = fire.auth()) {
    this.auth = auth;
  }

  /**
   * Abstraction provided to communicate with firebase to authenticate the user. it returns user information from the backend
   * @param loginInfo the username and password of the user
   */
  public signInWithEmailAndPassword = async (loginInfo: IUserLogin) => {
    await this.auth.signInWithEmailAndPassword(
      loginInfo.email,
      loginInfo.password,
    );
    return await this.signInWithServer();
  };

  /**
   * this method communicates with the backend, sending an auth token to the server so it could authenticate the user
   */
  private signInWithServer = async () => {
    const user = this.auth.currentUser;
    const token = user && (await user.getIdToken());

    const res = await fetch(`${SERVER_LINK}/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idtoken: token}),
      credentials: 'include',
    }).then((response) => response.json());

    return res;
  };
}
