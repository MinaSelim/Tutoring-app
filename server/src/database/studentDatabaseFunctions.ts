import IStudent from '../models/IStudent';
import {GetItemOutput, PutItemInput} from 'aws-sdk/clients/dynamodb';
import UserDatabaseFunctions from '../database/userDatabaseFunctions';
import IUser from 'src/models/IUser';

export default class StudentDatabaseFunctions extends UserDatabaseFunctions {
   protected fillSpecificUserData = (user: IUser): IUser => {
      const student: IStudent = user as IStudent;
      return student;
   };

   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const student: IStudent = user as IStudent;
      params.Item.campus = {
         S: student.campus,
      };
      return params;
   };

   protected addSpecificUserProperties = (user: IUser, data: GetItemOutput): IUser => {
      const student: IStudent = user as IStudent;
      student.campus = data.Item.campus.S;
      return student;
   };
}
