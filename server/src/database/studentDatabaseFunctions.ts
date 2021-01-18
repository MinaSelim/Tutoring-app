import IStudent from '../models/IStudent';
import {GetItemOutput, PutItemInput} from 'aws-sdk/clients/dynamodb';
import UserDatabaseFunctions from '../database/userDatabaseFunctions';
import IUser from 'src/models/IUser';

export default class StudentDatabaseFunctions extends UserDatabaseFunctions {
   
   protected fillSpecificUserData = (user: IUser): IUser => {
      const student: IStudent = user as IStudent;
      
      // catch not working
      if (!student.student_info.chatrooms) {
         student.student_info.chatrooms = []
      }

      return student;
   };

   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const student: IStudent = user as IStudent;

      // fingers crossed 
      params.Item.student_info = {
         M: {
            campus: {
               S: student.student_info.campus,
            },
            chatrooms: {
               SS: student.student_info.chatrooms
            }
         }
      }

      return params;
   };

   protected addSpecificUserProperties = (user: IUser, data: GetItemOutput): IUser => {
      const student: IStudent = user as IStudent;

      student.student_info = {
         campus: data.Item.student_info.M.campus.S,
         chatrooms: data.Item.student_info.M.chatrooms.SS,
      }
      
      return student;
   };
}
