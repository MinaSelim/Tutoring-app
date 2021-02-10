import Sinon from 'sinon';
import sinon from 'sinon';
import studentDatabaseFunctions from '../../src/database/studentDatabaseFunctions';
import databaseUtils from '../../src/database/databaseUtils';
import {AWSError} from 'aws-sdk';
import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
import IStudent from '../../src/models/IStudent';
import {assert} from 'chai';
import Dynamo from '../../src/database/dynamo';

describe('Student Database Functions Test', () => {
   let studentdb: studentDatabaseFunctions;
   let dbUtils: databaseUtils;
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
      phone: 'string',
      student_info: {
         campus: 'string',
         chatrooms: ['string'],
      },
   };

   const studentNoStripe: IStudent = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      profileImage: 'string',
      firebase_uid: 'string',
      is_validated: true,
      phone: 'string',
      student_info: {
         campus: 'string',
         chatrooms: ['string'],
      },
   };

   const studentNoValid: IStudent = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      profileImage: 'string',
      firebase_uid: 'string',
      phone: 'string',
      student_info: {
         campus: 'string',
         chatrooms: ['string'],
      },
   };

   const putItemResponseGood: PutItemOutput = {
      ConsumedCapacity: {TableName: 'User', CapacityUnits: 1},
   };

   const getItemResponseGood: GetItemOutput = {
      Item: {
         first_name: {S: student.first_name},
         last_name: {S: student.last_name},
         email: {S: student.email},
         is_validated: {BOOL: student.is_validated},
         firebase_uid: {S: student.firebase_uid},
         stripe_customer_id: {S: student.stripe_customer_id},
         profileImage: {S: student.profileImage},
         phone: {S: student.phone},
         student_info: {
            M: {
               campus: {S: student.student_info.campus},
               chatrooms: {SS: student.student_info.chatrooms},
            },
         },
      },
      ConsumedCapacity: {TableName: 'User', CapacityUnits: 1},
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
      studentdb = new studentDatabaseFunctions();
      dbUtils = databaseUtils.getInstance();
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
            phone: {
               S: student.phone,
            },
            student_info: {
               M: {
                  campus: {S: student.student_info.campus},
                  chatrooms: {SS: student.student_info.chatrooms},
               },
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
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(student).then((res) => {
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
            phone: {
               S: studentNoStripe.phone,
            },
            student_info: {
               M: {
                  campus: {S: studentNoStripe.student_info.campus},
                  chatrooms: {SS: studentNoStripe.student_info.chatrooms},
               },
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
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(studentNoStripe).then((res) => {
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
            phone: {
               S: studentNoValid.phone,
            },
            student_info: {
               M: {
                  campus: {S: studentNoValid.student_info.campus},
                  chatrooms: {SS: studentNoValid.student_info.chatrooms},
               },
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
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(studentNoValid).then((res) => {
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
            phone: {
               S: student.phone,
            },
            student_info: {
               M: {
                  campus: {S: student.student_info.campus},
                  chatrooms: {SS: student.student_info.chatrooms},
               },
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
      const spy = sandbox.spy(dbUtils, 'putItem');
      return studentdb
         .addUserToDatabase(student)
         .then(() => {
            assert.fail('Should not succeed');
         })
         .catch((err) => {
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
      const spy = sandbox.spy(dbUtils, 'getItem');
      return studentdb.getUserByFirebaseId(student.firebase_uid).then((resAsUser) => {
         const res: IStudent = resAsUser as IStudent;
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.email, student.email);
         assert.equal(res.is_validated, student.is_validated);
         assert.equal(res.firebase_uid, student.firebase_uid);
         assert.equal(res.stripe_customer_id, student.stripe_customer_id);
         assert.equal(res.first_name, student.first_name);
         assert.equal(res.last_name, student.last_name);
         assert.equal(res.profileImage, student.profileImage);
         assert.equal(res.phone, student.phone);
         assert.equal(res.student_info.campus, student.student_info.campus);
         assert.equal(res.student_info.chatrooms, student.student_info.chatrooms);
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
      const spy = sandbox.spy(dbUtils, 'getItem');

      return studentdb
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

   it('Should add student to db with missing params', () => {
      const studentMissingParams: IStudent = {
         first_name: 'string',
         last_name: 'string',
         email: 'string',
         firebase_uid: 'string',
         student_info: {
            campus: 'string',
            chatrooms: ['string']
         }
      };

      const params: PutItemInput = {
         Item: {
            first_name: {
               S: studentMissingParams.first_name,
            },
            last_name: {
               S: studentMissingParams.last_name,
            },
            email: {
               S: studentMissingParams.email,
            },
            firebase_uid: {
               S: studentMissingParams.firebase_uid,
            },
            stripe_customer_id: {
               S: '',
            },
            is_validated: {
               BOOL: false,
            },
            profileImage: {
               S: '',
            },
            phone: {
               S: '',
            },
            student_info: {
               M: {
                  campus: {S: student.student_info.campus},
                  chatrooms: {SS: student.student_info.chatrooms},
               },
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
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(studentMissingParams).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });
});
