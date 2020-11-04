import IUser from '../../model/common2/IUser';
import IUserLogin from '../../model/signInSignUp/IUserLogin';

export default interface IAuth {
  /**
   * Abstraction provided to communicate with firebase to authenthicate the user. it returns user information from the backend
   * @param loginInfo the username and password of the user
   */
  signInWithEmailAndPassword(loginInfo: IUserLogin): Promise<IUser>;

  /**
   * this function registers the user and stores them in server db and the firebase auth API
   *@param loginInfo the username and password of the user
   *@param user the user that needs to be registered with the server. The firebase UID can be left empty.
   */
  registerWithEmailAndPassword(
    loginInfo: IUserLogin,
    user: IUser,
  ): Promise<void>;
}
