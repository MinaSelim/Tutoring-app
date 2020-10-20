import Sinon from 'sinon';

import sinon from 'sinon';
import Database from '../../src/database/database';
import { AWSError } from 'aws-sdk';
import {
   CreateTableInput,
   CreateTableOutput,
   GetItemInput,
   GetItemOutput,
   PutItemInput,
   PutItemOutput,
} from 'aws-sdk/clients/dynamodb';
import IUser from '../../src/models/IUser';
import { assert } from 'chai';
import Dynamo from '../../src/database/dynamo';

describe('Database test', () => {
   let db: Database;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   const user: IUser = {
      name: 'string',
      email: 'string',
      firebase_uid: 'string',
      stripe_customer_id: 'string',
      is_validated: true,
   };

   const userNoStripe: IUser = {
      name: 'string',
      email: 'string',
      firebase_uid: 'string',
      is_validated: true,
   };

   const userNoValid: IUser = {
      name: 'string',
      email: 'string',
      firebase_uid: 'string',
   };

   const putItemResponseGood: PutItemOutput = {
      ConsumedCapacity: { TableName: 'User', CapacityUnits: 1 },
   };

   const getItemResponseGood: GetItemOutput = {
      Item: {
         username: { S: user.name },
         email: { S: user.email },
         email_validation: { BOOL: user.is_validated },
         firebase_uid: { S: user.firebase_uid },
         stripe_id: { S: user.stripe_customer_id },
      },
      ConsumedCapacity: { TableName: 'User', CapacityUnits: 1 },
   };

   const createTableResponseGood: CreateTableOutput = {
      TableDescription: {
         TableName: 'User',
      },
   };

   const error: AWSError = {
      code: 'badRequest',
      message: 'bad request',
      retryable: false,
      statusCode: 1,
      time: new Date(),
      name: '',
      hostname: '',
      region: '',
      retryDelay: 1,
      requestId: '',
      extendedRequestId: '',
      cfId: '',
   };

   beforeEach(() => {
      // Stub all calls to dynamo
      dynamo = Dynamo.getInstance();
      sandbox = sinon.createSandbox();
      db = new Database();
   });

   afterEach(() => {
      sandbox.restore();
   });

   it('Should add user to db with all user params', () => {
      const params: PutItemInput = {
         Item: {
            username: {
               S: user.name,
            },
            email: {
               S: user.email,
            },
            stripe_id: {
               S: user.stripe_customer_id,
            },
            email_validation: {
               BOOL: user.is_validated,
            },
            firebase_uid: {
               S: user.firebase_uid,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: 'User',
      };

      const output = ({
         promise() {
            return Promise.resolve(putItemResponseGood);
         },
      } as unknown) as AWS.Request<PutItemOutput, AWSError>;

      sandbox.stub(dynamo, 'putItem').returns(output);
      const spy = sandbox.spy(db, 'putItem');

      return db.addUserInUserCollection(user).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should add user to db with missing stripe id user param', () => {
      const params: PutItemInput = {
         Item: {
            username: {
               S: userNoStripe.name,
            },
            email: {
               S: userNoStripe.email,
            },
            stripe_id: {
               S: '',
            },
            email_validation: {
               BOOL: userNoStripe.is_validated,
            },
            firebase_uid: {
               S: userNoStripe.firebase_uid,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: 'User',
      };

      const output = ({
         promise() {
            return Promise.resolve(putItemResponseGood);
         },
      } as unknown) as AWS.Request<PutItemOutput, AWSError>;

      sandbox.stub(dynamo, 'putItem').returns(output);
      const spy = sandbox.spy(db, 'putItem');

      return db.addUserInUserCollection(userNoStripe).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should add user to db with missing email validation user param', () => {
      const params: PutItemInput = {
         Item: {
            username: {
               S: userNoValid.name,
            },
            email: {
               S: userNoValid.email,
            },
            stripe_id: {
               S: '',
            },
            email_validation: {
               BOOL: false,
            },
            firebase_uid: {
               S: userNoValid.firebase_uid,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: 'User',
      };

      const output = ({
         promise() {
            return Promise.resolve(putItemResponseGood);
         },
      } as unknown) as AWS.Request<PutItemOutput, AWSError>;

      sandbox.stub(dynamo, 'putItem').returns(output);
      const spy = sandbox.spy(db, 'putItem');

      return db.addUserInUserCollection(userNoValid).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should fail to add bad user', () => {
      const params: PutItemInput = {
         Item: {
            username: {
               S: user.name,
            },
            email: {
               S: user.email,
            },
            stripe_id: {
               S: user.stripe_customer_id,
            },
            email_validation: {
               BOOL: user.is_validated,
            },
            firebase_uid: {
               S: user.firebase_uid,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: 'User',
      };

      const output = ({
         promise() {
            return Promise.reject(error);
         },
      } as unknown) as AWS.Request<PutItemOutput, AWSError>;

      sandbox.stub(dynamo, 'putItem').returns(output);
      const spy = sandbox.spy(db, 'putItem');
      return db
         .addUserInUserCollection(user)
         .then(() => {
            assert.fail('Should not succeed');
         })
         .catch((err) => {
            // todo fix this test
            assert(spy.calledOnce);
            assert(spy.calledWith(params));
            assert.equal(err, error);
         });
   });

   it('Should get user', () => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: user.firebase_uid,
            },
         },
         TableName: 'User',
      };

      const output = ({
         promise() {
            return Promise.resolve(getItemResponseGood);
         },
      } as unknown) as AWS.Request<GetItemOutput, AWSError>;

      sandbox.stub(dynamo, 'getItem').returns(output);
      const spy = sandbox.spy(db, 'getItem');
      return db.getUserByFirebaseId(user.firebase_uid).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.email, user.email);
         assert.equal(res.is_validated, user.is_validated);
         assert.equal(res.firebase_uid, user.firebase_uid);
         assert.equal(res.stripe_customer_id, user.stripe_customer_id);
         assert.equal(res.name, user.name);
      });
   });

   it('Should fail to get bad user', () => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: '1',
            },
         },
         TableName: 'User',
      };

      const output = ({
         promise() {
            return Promise.reject(error);
         },
      } as unknown) as AWS.Request<GetItemOutput, AWSError>;

      sandbox.stub(dynamo, 'getItem').returns(output);
      const spy = sandbox.spy(db, 'getItem');

      return db
         .getUserByFirebaseId('1')
         .then(() => {
            assert.fail('should not get user');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert(spy.calledWith(params));
            assert.equal(err, error);
         });
   });

   it('Should create a new valid table', () => {
      const params: CreateTableInput = {
         AttributeDefinitions: [
            {
               AttributeName: 'test',
               AttributeType: 'S',
            },
         ],
         KeySchema: [
            {
               AttributeName: 'test',
               KeyType: 'HASH',
            },
         ],
         ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
         },
         TableName: 'Test',
      };

      const outputCreateTable = ({
         promise() {
            return Promise.resolve(createTableResponseGood);
         },
      } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

      sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);
      return db.createTable(params).then((res) => {
         assert.equal(res.TableDescription.TableName, createTableResponseGood.TableDescription.TableName);
      });
   });

   it('Should not create table that already exists', () => {
      const params: CreateTableInput = {
         AttributeDefinitions: [
            {
               AttributeName: 'test',
               AttributeType: 'S',
            },
         ],
         KeySchema: [
            {
               AttributeName: 'test',
               KeyType: 'HASH',
            },
         ],
         ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
         },
         TableName: 'Test',
      };

      const outputCreateTable = ({
         promise() {
            return Promise.reject(error);
         },
      } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

      const spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);

      return db
         .createTable(params)
         .then(() => {
            assert.fail('Should not pass');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert.equal(err, error);
         });
   });
});
