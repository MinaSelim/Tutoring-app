import {PutItemOutput} from 'aws-sdk/clients/dynamodb';
import {assert} from 'chai';
import DatabaseConfig from '../../src/config/DatabaseConfig';
import Database from '../../src/database/database';
import Dynamo from '../../src/database/dynamo';
import IStudent from '../../src/models/IStudent';
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
      return DatabaseConfig.init()
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

      const student: IStudent = {
         first_name: 'string',
         last_name: 'string',
         email: 'string',
         firebase_uid: 'string',
         stripe_customer_id: 'string',
         is_validated: true,
         profileImage: 'string',
         campus: 'string',
         phone: 'string',
      };

      return DatabaseConfig.createTable(params)
         .then(() => {
            return db.addStudentInUserCollection(student);
         })
         .then((data: PutItemOutput) => {
            console.log(data);
            return db.getStudentByFirebaseId('string');
         })
         .then((res: IStudent) => {
            assert.equal(res.email, student.email);
            assert.equal(res.is_validated, student.is_validated);
            assert.equal(res.firebase_uid, student.firebase_uid);
            assert.equal(res.stripe_customer_id, student.stripe_customer_id);
            assert.equal(res.first_name, student.first_name);
            assert.equal(res.last_name, student.last_name);
            assert.equal(res.profileImage, student.profileImage);
            assert.equal(res.campus, student.campus);
            assert.equal(res.phone, student.phone);
         });
   });
});
