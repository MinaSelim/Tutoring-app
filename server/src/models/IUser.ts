/**
 * the model for the user
 */
export default interface IUser {
   first_name: string;
   last_name: string;
   email: string;
   firebase_uid: string;
   is_validated?: boolean;
   profileImage?: string;
   phone?: string;
}
