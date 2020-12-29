import ITutor from '../models/ITutor';
import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
import * as config from '../config/DatabaseConfigInfo.json';
import IUser from 'src/models/IUser';
import UserDatabaseFunctions from './userDatabaseFunctions';

export default class TutorDatabaseFunctions extends UserDatabaseFunctions {
   
   protected fillSpecificUserData = (user: IUser): IUser => {
      const tutor:ITutor = user as ITutor;

      if (!tutor.campuses) {
         tutor.campuses = '';
      }

      return tutor;
   };
   
   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const tutor:ITutor = user as ITutor;
      params.Item.campuses = {
         S: tutor.campuses
      };
      return params;
   };

   /**
    * Adds a tutor to the database
    * @param tutor Tutor to add
    * @returns A promise.
    */
   

   /**
    * Retreives a tutor from the database
    * @param id The firebase user ID
    * @returns A promise.
    */
   public getTutorByFirebaseId = (id: string): Promise<ITutor> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         TableName: config.tableNames.USER,
      };
      return this.databaseUtils.getItem(params).then(
         (data: GetItemOutput): Promise<ITutor> => {
            const tutor: ITutor = {
               email: data.Item.email.S,
               is_validated: data.Item.is_validated.BOOL,
               firebase_uid: data.Item.firebase_uid.S,
               stripe_customer_id: data.Item.stripe_customer_id.S,
               first_name: data.Item.first_name.S,
               last_name: data.Item.last_name.S,
               campuses: data.Item.campuses.S,
               profileImage: data.Item.profileImage.S,
               phone: data.Item.phone.S,
            };
            return Promise.resolve(tutor);
         },
      );
   };
}
