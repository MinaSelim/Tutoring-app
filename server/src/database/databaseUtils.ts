import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
import {AWSError} from 'aws-sdk';
import Dynamo from './dynamo';

export default class DatabaseUtils {
   private dynamo: AWS.DynamoDB = Dynamo.getInstance();
   private static instance: DatabaseUtils;

   private constructor() {};

   public static getInstance(): DatabaseUtils {
      if (!DatabaseUtils.instance) {
         DatabaseUtils.instance = new DatabaseUtils();
      }
      return DatabaseUtils.instance;
   }

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
