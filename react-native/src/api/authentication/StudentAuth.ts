import {auth} from 'firebase';
import axios from 'react-native-axios';
import {SERVER_LINK} from 'react-native-dotenv-milkywire';
import {REGISTER_AUTH_STUDENT, LOGIN_AUTH_STUDENT} from '../../constants/paths';
import fire from './Fire';
import IUserLogin from '../../models/signInSignUp/IUserLogin';
import IAuth from './IAuth';
import IStudent from '../../models/common/IStudent';

/**
 * this class provides api abstraction for firebase
 */
export default class StudentAuth implements IAuth {
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
  ): Promise<IStudent> => {
    await this.firebaseAuth.signInWithEmailAndPassword(
      loginInfo.email,
      loginInfo.password,
    );
    return this.signInWithServer();
  };

  /**
   * this function registers the student and stores them in server db and the firebase auth API
   *@param loginInfo the username and password of the user
   *@param student the student that needs to be registered with the server. The firebase UID can be left empty.
   */
  public registerWithEmailAndPassword = async (
    loginInfo: IUserLogin,
    student: IStudent,
  ): Promise<any> => {
    try {
      const result = await this.firebaseAuth.createUserWithEmailAndPassword(
        loginInfo.email,
        loginInfo.password,
      );
      student.firebase_uid = result.user.uid;
      const response = await axios.post(
        `${SERVER_LINK + REGISTER_AUTH_STUDENT}`,
        student,
        {
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        },
      );
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  /**
   * this method communicates with the backend, sending an auth token to the server so it could authenthicate the user
   */
  private signInWithServer = async (): Promise<IStudent> => {
    const user = this.firebaseAuth.currentUser;
    const token = user && (await user.getIdToken());

    const response = await fetch(`${SERVER_LINK + LOGIN_AUTH_STUDENT}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({idToken: token}),
      credentials: 'include',
    }).then((unformattedResponse) => unformattedResponse.json());

    return response;
  };
}
