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
import IStudent from '../../src/models/IStudent';
import ITutor from '../../src/models/ITutor';
import { assert } from 'chai';
import Dynamo from '../../src/database/dynamo';

describe('Database test', () => {
   let db: Database;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   const student: IStudent = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      profileImage: 'string',
      firebase_uid: 'string',
      stripe_customer_id: 'string',
      is_validated: true,
      campus: 'string',
      phone: 'string',
   };

   const studentNoStripe: IStudent = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      profileImage: 'string',
      firebase_uid: 'string',
      is_validated: true,
      campus: 'string',
      phone: 'string',
   };

   const studentNoValid: IStudent = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      profileImage: 'string',
      firebase_uid: 'string',
      campus: 'string',
      phone: 'string',
   };

   const tutor: ITutor = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      profileImage: 'string',
      firebase_uid: 'string',
      stripe_customer_id: 'string',
      is_validated: true,
      campuses: 'string',
      phone: 'string',
   };

   const putItemResponseGood: PutItemOutput = {
      ConsumedCapacity: { TableName: 'User', CapacityUnits: 1 },
   };

   const getItemResponseGood: GetItemOutput = {
      Item: {
         first_name: { S: student.first_name },
         last_name: { S: student.last_name },
         email: { S: student.email },
         is_validated: { BOOL: student.is_validated },
         firebase_uid: { S: student.firebase_uid },
         stripe_customer_id: { S: student.stripe_customer_id },
         profileImage: {S: student.profileImage },
         campus: {S: student.campus },
         phone: {S: student.phone },
      },
      ConsumedCapacity: { TableName: 'User', CapacityUnits: 1 },
   };

   const getTutorItemResponseGood: GetItemOutput = {
      Item: {
         first_name: { S: tutor.first_name },
         last_name: { S: tutor.last_name },
         email: { S: tutor.email },
         is_validated: { BOOL: tutor.is_validated },
         firebase_uid: { S: tutor.firebase_uid },
         stripe_customer_id: { S: tutor.stripe_customer_id },
         profileImage: {S: tutor.profileImage},
         campuses: {S: tutor.campuses },
         phone: {S: tutor.phone },
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

   it('Should add student to db with all user params', () => {
      const params: PutItemInput = {
         Item: {
            first_name: {
               S: student.first_name,
            },
            last_name: {
               S: student.last_name,
            },
            email: {
               S: student.email,
            },
            stripe_customer_id: {
               S: student.stripe_customer_id,
            },
            is_validated: {
               BOOL: student.is_validated,
            },
            firebase_uid: {
               S: student.firebase_uid,
            },
            profileImage: {
               S: student.profileImage,
            },
            campus: {
               S: student.campus,
            },
            phone: {
               S: student.phone,
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

      return db.addStudentInUserCollection(student).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should add student to db with missing stripe id user param', () => {
      const params: PutItemInput = {
         Item: {
            first_name: {
               S: studentNoStripe.first_name,
            },
            last_name: {
               S: studentNoStripe.last_name,
            },
            email: {
               S: studentNoStripe.email,
            },
            stripe_customer_id: {
               S: '',
            },
            is_validated: {
               BOOL: studentNoStripe.is_validated,
            },
            firebase_uid: {
               S: studentNoStripe.firebase_uid,
            },
            profileImage: {
               S: studentNoStripe.profileImage,
            },
            campus: {
               S: studentNoStripe.campus,
            },
            phone: {
               S: studentNoStripe.phone,
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

      return db.addStudentInUserCollection(studentNoStripe).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should add student to db with missing email validation user param', () => {
      const params: PutItemInput = {
         Item: {
            first_name: {
               S: studentNoValid.first_name,
            },
            last_name: {
               S: studentNoValid.last_name,
            },
            email: {
               S: studentNoValid.email,
            },
            stripe_customer_id: {
               S: '',
            },
            is_validated: {
               BOOL: false,
            },
            firebase_uid: {
               S: studentNoValid.firebase_uid,
            },
            profileImage: {
               S: studentNoValid.profileImage,
            },
            campus: {
               S: studentNoValid.campus,
            },
            phone: {
               S: studentNoValid.phone,
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

      return db.addStudentInUserCollection(studentNoValid).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should fail to add bad student', () => {
      const params: PutItemInput = {
         Item: {
            first_name: {
               S: student.first_name,
            },
            last_name: {
               S: student.last_name,
            },
            email: {
               S: student.email,
            },
            stripe_customer_id: {
               S: student.stripe_customer_id,
            },
            is_validated: {
               BOOL: student.is_validated,
            },
            firebase_uid: {
               S: student.firebase_uid,
            },
            profileImage: {
               S: student.profileImage,
            },
            campus: {
               S: student.campus,
            },
            phone: {
               S: student.phone,
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
         .addStudentInUserCollection(student)
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

   it('Should get student', () => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: student.firebase_uid,
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
      return db.getStudentByFirebaseId(student.firebase_uid).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
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

   it('Should fail to get bad student', () => {
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
         .getStudentByFirebaseId('1')
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
      return db.createTable(params).then((res: CreateTableOutput) => {
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

   it('Should add tutor to db with all user params', () => {
      const params: PutItemInput = {
         Item: {
            first_name: {
               S: tutor.first_name,
            },
            last_name: {
               S: tutor.last_name,
            },
            email: {
               S: tutor.email,
            },
            stripe_customer_id: {
               S: tutor.stripe_customer_id,
            },
            is_validated: {
               BOOL: tutor.is_validated,
            },
            firebase_uid: {
               S: tutor.firebase_uid,
            },
            profileImage: {
               S: tutor.profileImage,
            },
            campuses: {
               S: tutor.campuses,
            },
            phone: {
               S: tutor.phone,
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

      return db.addTutorInUserCollection(tutor).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should fail to add bad tutor', () => {
      const params: PutItemInput = {
         Item: {
            first_name: {
               S: tutor.first_name,
            },
            last_name: {
               S: tutor.last_name,
            },
            email: {
               S: tutor.email,
            },
            stripe_customer_id: {
               S: tutor.stripe_customer_id,
            },
            is_validated: {
               BOOL: tutor.is_validated,
            },
            firebase_uid: {
               S: tutor.firebase_uid,
            },
            profileImage: {
               S: tutor.profileImage,
            },
            campuses: {
               S: tutor.campuses,
            },
            phone: {
               S: tutor.phone,
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
         .addTutorInUserCollection(tutor)
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

   it('Should get tutor', () => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: tutor.firebase_uid,
            },
         },
         TableName: 'User',
      };

      const output = ({
         promise() {
            return Promise.resolve(getTutorItemResponseGood);
         },
      } as unknown) as AWS.Request<GetItemOutput, AWSError>;

      sandbox.stub(dynamo, 'getItem').returns(output);
      const spy = sandbox.spy(db, 'getItem');
      return db.getTutorByFirebaseId(tutor.firebase_uid).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.email, tutor.email);
         assert.equal(res.is_validated, tutor.is_validated);
         assert.equal(res.firebase_uid, tutor.firebase_uid);
         assert.equal(res.stripe_customer_id, tutor.stripe_customer_id);
         assert.equal(res.first_name, tutor.first_name);
         assert.equal(res.last_name, tutor.last_name);
         assert.equal(res.profileImage, tutor.profileImage);
         assert.equal(res.campuses, tutor.campuses);
         assert.equal(res.phone, tutor.phone);
      });
   });

   it('Should fail to get bad tutor', () => {
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
         .getTutorByFirebaseId('1')
         .then(() => {
            assert.fail('should not get user');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert(spy.calledWith(params));
            assert.equal(err, error);
         });
   });
});
