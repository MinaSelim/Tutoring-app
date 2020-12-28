import ITutor from '../models/ITutor';
import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
import * as config from '../config/DatabaseConfigInfo.json';
import DatabaseUtils from './databaseUtils';

export default class TutorDatabaseFunctions {
   private dbutils: DatabaseUtils;

   constructor() {
      this.dbutils = DatabaseUtils.getInstance();
   }

   /**
    * Adds a tutor to the database
    * @param tutor Tutor to add
    * @returns A promise.
    */
   public addTutorInUserCollection = (tutor: ITutor): Promise<PutItemOutput> => {
      // Create deep copy to modify without affecting input tutor
      const tempUser = {...tutor};

      if (!tutor.is_validated) {
         tempUser.is_validated = false;
      }

      if (!tutor.stripe_customer_id) {
         tempUser.stripe_customer_id = '';
      }

      if (!tutor.profileImage) {
         tempUser.profileImage = '';
      }

      if (!tutor.campuses) {
         tempUser.campuses = '';
      }

      if (!tutor.phone) {
         tempUser.phone = '';
      }

      const params: PutItemInput = {
         Item: {
            first_name: {
               S: tempUser.first_name,
            },
            last_name: {
               S: tempUser.last_name,
            },
            email: {
               S: tempUser.email,
            },
            stripe_customer_id: {
               S: tempUser.stripe_customer_id,
            },
            is_validated: {
               BOOL: tempUser.is_validated,
            },
            firebase_uid: {
               S: tempUser.firebase_uid,
            },
            campuses: {
               S: tempUser.campuses, // TODO: tutor should be able to have more than one campus
            },
            profileImage: {
               S: tempUser.profileImage,
            },
            phone: {
               S: tempUser.phone,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: config.tableNames.USER,
      };
      return this.dbutils.putItem(params);
   };

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
      return this.dbutils.getItem(params).then(
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
