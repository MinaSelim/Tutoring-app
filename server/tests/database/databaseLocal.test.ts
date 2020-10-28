import { PutItemOutput } from 'aws-sdk/clients/dynamodb';
import { assert } from 'chai';
import Database from '../../src/database/database';
import Dynamo from '../../src/database/dynamo';
import IUser from '../../src/models/IUser';
/**
 * Run this code to make sure you have a properly working local database before
 * testing any other online code. It will create the USER table if it doesn't already
 * exist.
 */

// Use this to practice with local instance
describe('Local dynamo test', () => {
   let db: Database;

   beforeEach(() => {
      db = new Database();
   });

   it.skip('Should initiate all tables in db config file', () => {
      const dynamo = Dynamo.getInstance();
      return db
         .init()
         .then(() => {
            return dynamo.listTables().promise();
         })
         .then((tables) => {
            assert.equal(tables.TableNames[0], 'User');
         });
   });

   it.skip('Should create table, add user, and get user', () => {
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

      return db
         .createTable(params)
         .then(() => {
            return db.addUserInUserCollection(user);
         })
         .then((data: PutItemOutput) => {
            console.log(data);
            return db.getUserByFirebaseId('string');
         })
         .then((res: IUser) => {
            assert.equal(res.email, user.email);
            assert.equal(res.is_validated, user.is_validated);
            assert.equal(res.firebase_uid, user.firebase_uid);
            assert.equal(res.stripe_customer_id, user.stripe_customer_id);
            assert.equal(res.name, user.name);
         });
   });
});
