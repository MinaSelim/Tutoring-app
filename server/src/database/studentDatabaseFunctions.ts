import IStudent from '../models/IStudent';
import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
import * as config from '../config/DatabaseConfigInfo.json';
import UserDatabaseFunctions from '../database/userDatabaseFunctions';
import IUser from 'src/models/IUser';

export default class StudentDatabaseFunctions extends UserDatabaseFunctions {

   protected fillSpecificUserData = (user: IUser): IUser => {
      const student:IStudent = user as IStudent;
      return student;
   };
   
   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const student:IStudent = user as IStudent;
      params.Item.campus = {
         S: student.campus
      };
      return params;
   };

   /**
    * Retreives a student from the database
    * @param id The firebase user ID
    * @returns A promise.
    */
   public getStudentByFirebaseId = (id: string): Promise<IStudent> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         TableName: config.tableNames.USER,
      };
      return this.databaseUtils.getItem(params).then(
         (data: GetItemOutput): Promise<IStudent> => {
            const student: IStudent = {
               email: data.Item.email.S,
               is_validated: data.Item.is_validated.BOOL,
               firebase_uid: data.Item.firebase_uid.S,
               stripe_customer_id: data.Item.stripe_customer_id.S,
               first_name: data.Item.first_name.S,
               last_name: data.Item.last_name.S,
               campus: data.Item.campus.S,
               profileImage: data.Item.profileImage.S,
               phone: data.Item.phone.S,
            };
            return Promise.resolve(student);
         },
      );
   };
}
