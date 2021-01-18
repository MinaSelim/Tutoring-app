import IUser from './IUser';

/**
 * the model for the student
 */
export default interface IStudent extends IUser {
   student_info: {
      campus: string;
      chatrooms: string[];
   }
}


