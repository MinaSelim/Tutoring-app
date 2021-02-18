import {PutItemOutput} from 'aws-sdk/clients/dynamodb';
import {assert} from 'chai';
import DatabaseConfig from '../../src/config/DatabaseConfig';
import studentDatabaseFunctions from '../../src/database/studentDatabaseFunctions';
import Dynamo from '../../src/database/dynamo';
import IStudent from '../../src/models/IStudent';
import IUser from '../../src/models/IUser';
/**
 * Run this code to make sure you have a properly working local database before
 * testing any other online code. It will create the USER table if it doesn't already
 * exist.
 */

// Use this to practice with local instance
describe('Local dynamo test', () => {
   let studentdb: studentDatabaseFunctions;

   beforeEach(() => {
      studentdb = new studentDatabaseFunctions();
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
         phone: 'string',
         student_info: {
            campus: 'string',
            chatrooms: ['string'],
         },
      };

      return DatabaseConfig.createTable(params)
         .then(() => {
            return studentdb.addUserToDatabase(student);
         })
         .then((data: PutItemOutput) => {
            console.log(data);
            return studentdb.getUserByFirebaseId('string');
         })
         .then((resAsUser: IUser) => {
            const res = resAsUser as IStudent;
            assert.equal(res.email, student.email);
            assert.equal(res.is_validated, student.is_validated);
            assert.equal(res.firebase_uid, student.firebase_uid);
            assert.equal(res.stripe_customer_id, student.stripe_customer_id);
            assert.equal(res.first_name, student.first_name);
            assert.equal(res.last_name, student.last_name);
            assert.equal(res.profileImage, student.profileImage);
            assert.equal(res.student_info.campus, student.student_info.campus);
            assert.equal(res.student_info.chatrooms, student.student_info.chatrooms);
            assert.equal(res.phone, student.phone);
         });
   });
});
