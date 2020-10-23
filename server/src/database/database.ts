import IUser from '../models/IUser';
import { GetItemInput, GetItemOutput, PutItemInput, PutItemOutput } from 'aws-sdk/clients/dynamodb';
import Dynamo from './dynamo';
import { AWSError } from 'aws-sdk';
import * as config from './config.json';

export default class Database {
   private dynamo: AWS.DynamoDB = Dynamo.getInstance();

   /**
    * Adds a user to the database
    * @param user User to add
    * @returns A promise.
    */
   public addUserInUserCollection = (user: IUser): Promise<PutItemOutput> => {
      // Create deep copy to modify without affecting input user
      const tempUser = { ...user };

      // Fill in missing parameters
      if (!user.is_validated) {
         tempUser.is_validated = false;
      }

      if (!user.stripe_customer_id) {
         tempUser.stripe_customer_id = '';
      }

      const params: PutItemInput = {
         Item: {
            username: {
               S: tempUser.name,
            },
            email: {
               S: tempUser.email,
            },
            stripe_id: {
               S: tempUser.stripe_customer_id,
            },
            email_validation: {
               BOOL: tempUser.is_validated,
            },
            firebase_uid: {
               S: tempUser.firebase_uid,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: config.tableNames.USER,
      };
      return this.putItem(params);
   };

   /**
    * Retreives a user from the database
    * @param id The firebase user ID
    * @returns A promise.
    */
   public getUserByFirebaseId = (id: string): Promise<IUser> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         TableName: config.tableNames.USER,
      };
      return this.getItem(params).then(
         (data: GetItemOutput): Promise<IUser> => {
            const user: IUser = {
               email: data.Item.email.S,
               is_validated: data.Item.email_validation.BOOL,
               firebase_uid: data.Item.firebase_uid.S,
               stripe_customer_id: data.Item.stripe_id.S,
               name: data.Item.username.S,
            };
            return Promise.resolve(user);
         },
      );
   };

   /**
    * Add an item to a table in dynamo.
    * @param params
    * @returns A promise.
    */
   public putItem = (params: PutItemInput): Promise<PutItemOutput> => {
      return this.dynamo
         .putItem(params)
         .promise()
         .catch((err: AWSError) => {
            console.error('Could not put item in', params.TableName);
            return Promise.reject(err);
         });
   };

   /**
    * Retreive an item from a table in dynamo.
    * @param params
    * @returns A promise.
    */
   public getItem = (params: GetItemInput): Promise<GetItemOutput> => {
      return this.dynamo
         .getItem(params)
         .promise()
         .catch((err: AWSError) => {
            console.error('Could not get item from', params.TableName);
            return Promise.reject(err);
         });
   };
}
