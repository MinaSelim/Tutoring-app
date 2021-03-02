import IAuth from 'api/authentication/IAuth';

export default interface ISignInPage {
  passwordHidden: boolean;
  userType: string;
  userAuth: IAuth;
}
