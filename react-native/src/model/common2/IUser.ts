export default interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  firebase_uid: string;
  stripe_customer_id?: string;
  is_validated?: boolean;
}
