import { AWSError } from 'aws-sdk';
import { CreateTableInput, CreateTableOutput } from 'aws-sdk/clients/dynamodb';
import { assert } from 'chai';
import Database from '../../src/database/database';
import Dynamo from '../../src/database/dynamo';
import IUser from '../../src/models/IUser';

/**
 * Run this code to make sure you have a properly working local database before
 * testing any other online code. It will create the USER table if it doesn't already
 * exist.
 */

/**
 * Creates a table if it doesn't already exist.
 * Note that dynamo only needs KEY attributes to create a table, other
 * non-key attributes can be added during queries.
 * @param params The table create parameters.
 * @returns A promise.
 */
const createTable = (params: CreateTableInput): Promise<CreateTableOutput> => {
   return Dynamo.getInstance()
      .createTable(params)
      .promise()
      .catch((err: AWSError) => {
         if (err.code == 'ResourceInUseException') {
            // skip error if table already exists
            console.warn('Table already exists');
            const createTableResponse: CreateTableOutput = {
               TableDescription: {},
            };
            return Promise.resolve(createTableResponse);
         } else {
            console.error('Failed creating table');
            return Promise.reject(err);
         }
      });
};

// Use this to practice with local instance
describe('Local dynamo test', () => {
   it.skip('Should create table, add user, and get user', () => {
      const db = new Database();

      const params = {
         AttributeDefinitions: [
            {
               AttributeName: 'firebase_uid',
               AttributeType: 'S',
            },
         ],
         KeySchema: [
            {
               AttributeName: 'firebase_uid',
               KeyType: 'HASH',
            },
         ],
         ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
         },
         TableName: 'User',
      };

      const user: IUser = {
         name: 'string',
         email: 'string',
         firebase_uid: 'string',
         stripe_customer_id: 'string',
         is_validated: true,
      };

      return createTable(params)
         .then(() => {
            return db.addUserInUserCollection(user);
         })
         .then((data) => {
            console.log(data);
            return db.getUserByFirebaseId('string');
         })
         .then((res) => {
            assert.equal(res.email, user.email);
            assert.equal(res.is_validated, user.is_validated);
            assert.equal(res.firebase_uid, user.firebase_uid);
            assert.equal(res.stripe_customer_id, user.stripe_customer_id);
            assert.equal(res.name, user.name);
         });
   });
});
