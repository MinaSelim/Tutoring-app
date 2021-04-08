export default interface IUser {
  id?: string;
  isConnected?: boolean;
  authToken?: string;
  first_name: string;
  last_name: string;
  fullName?: string; // Optional for now, may need to be manadatory depending on futur use
  profileImage?: string;
  unseenMessagesCount?: number;
  email: string;
  phone?: string;
  avatar?: string;
  firebase_uid: string;
  stripe_customer_id?: string;
  is_validated?: boolean;
}
