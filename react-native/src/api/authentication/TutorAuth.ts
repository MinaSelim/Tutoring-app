import fire from './Fire';
import {auth} from 'firebase';
import IUserLogin from '../../model/signInSignUp/IUserLogin';
import {SERVER_LINK} from 'react-native-dotenv-milkywire';
import IAuth from './IAuth';
import ITutor from '../../model/common/ITutor';

/**
 * this class provides api abstraction for firebase
 */
export default class TutorAuth implements IAuth {
  private auth: auth.Auth;

  constructor(auth: auth.Auth = fire.auth()) {
    this.auth = auth;
  }

  /**
   * Abstraction provided to communicate with firebase to authenthicate the user. it returns user information from the backend
   * @param loginInfo the username and password of the user
   */
  public signInWithEmailAndPassword = async (
    loginInfo: IUserLogin,
  ): Promise<ITutor> => {
    await this.auth.signInWithEmailAndPassword(
      loginInfo.email,
      loginInfo.password,
    );
    return await this.signInWithServer();
  };

  /**
   * this function registers the student and stores them in server db and the firebase auth API.
   *@param loginInfo the username and password of the user
   *@param tutor the tutor that needs to be registered with the server. The firebase UID can be left empty.
   */
  public registerWithEmailAndPassword = async (
    loginInfo: IUserLogin,
    tutor: ITutor,
  ): Promise<void> => {
    try {
      let result = await this.auth.createUserWithEmailAndPassword(
        loginInfo.email,
        loginInfo.password,
      );
      tutor.firebase_uid = result.user.uid;
      let response = fetch(SERVER_LINK + '/auth/tutor/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(tutor),
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * this method communicates with the backend, sending an auth token to the server so it could authenthicate the user
   */
  private signInWithServer = async () => {
    let user = this.auth.currentUser;
    let token = user && (await user.getIdToken());

    let response = await fetch(SERVER_LINK + '/auth/tutor/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idtoken: token}),
      credentials: 'include',
    }).then((response) => response.json());

    return response;
  };
}
