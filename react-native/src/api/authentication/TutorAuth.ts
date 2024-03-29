import {auth} from 'firebase';
import env from '../../../env';
import fire from './Fire';
import IUserLogin from '../../model/signin/IUserLogin';
import IAuth from './IAuth';
import ITutor from '../../model/common/ITutor';

/**
 * this class provides api abstraction for firebase
 */
export default class TutorAuth implements IAuth {
  private firebaseAuth: auth.Auth;

  constructor(fireAuth: auth.Auth = fire.auth()) {
    this.firebaseAuth = fireAuth;
  }

  /**
   * Abstraction provided to communicate with firebase to authenthicate the user. it returns user information from the backend
   * @param loginInfo the username and password of the user
   */
  public signInWithEmailAndPassword = async (
    loginInfo: IUserLogin,
  ): Promise<ITutor> => {
    await this.firebaseAuth.signInWithEmailAndPassword(
      loginInfo.email,
      loginInfo.password,
    );
    return this.signInWithServer();
  };

  /**
   * this function registers the tutor and stores them in server db and the firebase auth API.
   *@param loginInfo the username and password of the user
   *@param tutor the tutor that needs to be registered with the server. The firebase UID can be left empty.
   */
  public registerWithEmailAndPassword = async (
    loginInfo: IUserLogin,
    tutor: ITutor,
  ): Promise<any> => {
    try {
      const result = await this.firebaseAuth.createUserWithEmailAndPassword(
        loginInfo.email,
        loginInfo.password,
      );
      tutor.firebase_uid = result.user.uid;
      const response = await fetch(`${env.SERVER_LINK}/auth/tutor/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(tutor),
      });
      await this.firebaseAuth.currentUser?.sendEmailVerification();
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /**
   * this method communicates with the backend, sending an auth token to the server so it could authenthicate the user
   */
  private signInWithServer = async (): Promise<ITutor> => {
    const user = this.firebaseAuth.currentUser;
    const token = user && (await user.getIdToken());
    console.info('[FRONT]- Sending logins', user!.email);
    const response = await fetch(`${env.SERVER_LINK}/auth/tutor/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idToken: token}),
      credentials: 'include',
    });
    console.log('status:', response.status);
    const responseBody = await response.json();
    if (!response.ok) {
      throw responseBody;
    }
    return responseBody;
  };
}
