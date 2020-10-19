/**
 * the model for the user //TODO: add models for the students and tutors that inherit from this class.
 */
export default interface IUser {
   id: string;
   name: string;
   email: string;
   firebase_uid: string;
   stripe_customer_id?: string;
   is_validated?: boolean;
}
