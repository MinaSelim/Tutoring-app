import IUser from './IUser';

/**
 * the model for the tutor
 */
export default interface ITutor extends IUser {
   campuses?: string; // TODO: implement as a list of strings
}
