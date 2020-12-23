import Sinon from 'sinon';
import sinon from 'sinon';
import tutorDatabaseFunctions from '../../src/database/tutorDatabaseFunctions';
import databaseUtils from '../../src/database/databaseUtils';
import {AWSError} from 'aws-sdk';
import {
   GetItemInput,
   GetItemOutput,
   PutItemInput,
   PutItemOutput,
} from 'aws-sdk/clients/dynamodb';
import ITutor from '../../src/models/ITutor';
import {assert} from 'chai';
import Dynamo from '../../src/database/dynamo';
import DatabaseUtils from '../../src/database/databaseUtils';

describe('Tutor Database Functions Test', () => {
   let dbUtils: databaseUtils;
   let tutordb: tutorDatabaseFunctions;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

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
      ConsumedCapacity: {TableName: 'User', CapacityUnits: 1},
   };

   const getTutorItemResponseGood: GetItemOutput = {
      Item: {
         first_name: {S: tutor.first_name},
         last_name: {S: tutor.last_name},
         email: {S: tutor.email},
         is_validated: {BOOL: tutor.is_validated},
         firebase_uid: {S: tutor.firebase_uid},
         stripe_customer_id: {S: tutor.stripe_customer_id},
         profileImage: {S: tutor.profileImage},
         campuses: {S: tutor.campuses},
         phone: {S: tutor.phone},
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
      dbUtils = DatabaseUtils.getInstance();
      tutordb = new tutorDatabaseFunctions()
   });

   afterEach(() => {
      sandbox.restore();
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
      const spy = sandbox.spy(dbUtils, 'putItem');

      return tutordb.addTutorInUserCollection(tutor).then((res) => {
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
      const spy = sandbox.spy(dbUtils, 'putItem');
      return tutordb
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
      const spy = sandbox.spy(dbUtils, 'getItem');
      return tutordb.getTutorByFirebaseId(tutor.firebase_uid).then((res) => {
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
      const spy = sandbox.spy(dbUtils, 'getItem');

      return tutordb
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
