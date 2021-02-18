import Sinon from 'sinon';
import sinon from 'sinon';
import tutorDatabaseFunctions from '../../src/database/tutorDatabaseFunctions';
import databaseUtils from '../../src/database/databaseUtils';
import {AWSError} from 'aws-sdk';
import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
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
      phone: 'string',
      tutor_info: {
         campuses: ['string'],
         chatrooms: ['string'],
      },
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
         phone: {S: tutor.phone},
         tutor_info: {
            M: {
               campus: {SS: tutor.tutor_info.campuses},
               chatrooms: {SS: tutor.tutor_info.chatrooms},
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
      dbUtils = DatabaseUtils.getInstance();
      tutordb = new tutorDatabaseFunctions();
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
            phone: {
               S: tutor.phone,
            },
            tutor_info: {
               M: {
                  campuses: {SS: tutor.tutor_info.campuses},
                  chatrooms: {SS: tutor.tutor_info.chatrooms},
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

      return tutordb.addUserToDatabase(tutor).then((res) => {
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
            phone: {
               S: tutor.phone,
            },
            tutor_info: {
               M: {
                  campuses: {SS: tutor.tutor_info.campuses},
                  chatrooms: {SS: tutor.tutor_info.chatrooms},
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
      return tutordb
         .addUserToDatabase(tutor)
         .then(() => {
            assert.fail('Should not succeed');
         })
         .catch((err) => {
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
      return tutordb.getUserByFirebaseId(tutor.firebase_uid).then((resAsUser) => {
         const res: ITutor = resAsUser as ITutor;
         assert(spy.calledOnce);
         assert(spy.calledWith(getItemInputTutorDefined));
         assert.equal(res.email, tutorDefined.email);
         assert.equal(res.is_validated, tutorDefined.is_validated);
         assert.equal(res.firebase_uid, tutorDefined.firebase_uid);
         assert.equal(res.stripe_customer_id, tutorDefined.stripe_customer_id);
         assert.equal(res.first_name, tutorDefined.first_name);
         assert.equal(res.last_name, tutorDefined.last_name);
         assert.equal(res.profileImage, tutorDefined.profileImage);
         assert.equal(res.phone, tutorDefined.phone);
         assert.equal(res.tutor_info.campuses, tutorDefined.tutor_info.campuses);
         assert.equal(res.tutor_info.chatrooms, tutorDefined.tutor_info.chatrooms);
         assert.equal(res.tutor_info.overallRating, tutorDefined.tutor_info.overallRating);
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

   it('Should add tutor to db with missing params', () => {
      const tutorMissingParams: ITutor = {
         first_name: 'string',
         last_name: 'string',
         email: 'string',
         firebase_uid: 'string',
         tutor_info: {
            campuses: ['string'],
            chatrooms: ['string'],
         },
      };

      const params: PutItemInput = {
         Item: {
            first_name: {
               S: tutorMissingParams.first_name,
            },
            last_name: {
               S: tutorMissingParams.last_name,
            },
            email: {
               S: tutorMissingParams.email,
            },
            firebase_uid: {
               S: tutorMissingParams.firebase_uid,
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
            tutor_info: {
               M: {
                  campuses: {SS: tutor.tutor_info.campuses},
                  chatrooms: {SS: tutor.tutor_info.chatrooms},
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

      return tutordb.addUserToDatabase(tutorMissingParams).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(params));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemResponseGood.ConsumedCapacity.CapacityUnits);
      });
   });
});
