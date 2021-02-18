import IUser from './IUser';

/**
 * the model for the tutor
 */
export default interface ITutor extends IUser {
   tutor_info: {
      campuses?: string[];
      chatrooms: string[];
   };
}
