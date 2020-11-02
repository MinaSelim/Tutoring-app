export default interface ISignUpCredentials {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string; //TODO what to do with password?
};
