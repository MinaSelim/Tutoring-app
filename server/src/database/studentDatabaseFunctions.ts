import IStudent from '../models/IStudent';
import {GetItemOutput, PutItemInput, UpdateItemInput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import UserDatabaseFunctions from '../database/userDatabaseFunctions';
import IUser from 'src/models/IUser';
import { StudentProfileRoutes } from 'src/routes/profile/StudentProfileRoutes';
import { config } from 'dotenv/types';

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

   protected addSpecificUserUpdateParams = (user: IUser, params: UpdateItemInput): UpdateItemInput => {
      const student: IStudent = user as IStudent;
      
      params.UpdateExpression = params.UpdateExpression.concat(", student_info.campus = :ca, student_info.chatrooms = :ch");
      params.ExpressionAttributeValues[':ca'] = {S: student.student_info.campus};
      params.ExpressionAttributeValues[':ch'] = {SS: student.student_info.chatrooms};

      console.log(params);
      return params;
   }

   protected mapSpecificUpdateAttributes = (user: IUser, returnData: UpdateItemOutput): IUser => {
      const student: IStudent = user as IStudent;

      student.student_info = {
         campus: returnData.Attributes.student_info.M.campus.S,
         chatrooms: returnData.Attributes.student_info.M.chatrooms.SS,
      }
      
      return student;
   };


}
