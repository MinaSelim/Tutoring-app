import {
   GetItemInput,
   GetItemOutput,
   PutItemInput,
   PutItemOutput,
   QueryInput,
   QueryOutput,
   UpdateItemInput,
   UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
import {AWSError} from 'aws-sdk';
import Dynamo from './dynamo';

export default class DatabaseUtils {
   private dynamo: AWS.DynamoDB = Dynamo.getInstance();
   private static instance: DatabaseUtils;

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

   /**
    * Update an item in a dynamo table.
    * @param params
    * @returns A promise.
    */
   public updateItem = (params: UpdateItemInput): Promise<UpdateItemOutput> => {
      return this.dynamo
         .updateItem(params)
         .promise()
         .catch((err: AWSError) => {
            console.error('Could not update item in', params.TableName);
            return Promise.reject(err);
         });
   };

   /**
    * Queries a dynamo table.
    * @param params
    * @returns A promise.
    */
   public query = (params: QueryInput): Promise<QueryOutput> => {
      return this.dynamo
         .query(params)
         .promise()
         .catch((err: AWSError) => {
            console.error('Could not perform query on', params.TableName);
            return Promise.reject(err);
         });
   };
}
