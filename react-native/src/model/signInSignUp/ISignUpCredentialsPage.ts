export default interface ISignUpCredentialsPage {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  passwordHidden: boolean;
}
