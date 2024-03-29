import Sinon from 'sinon';
import sinon from 'sinon';
import tutorDatabaseFunctions from '../../src/database/tutorDatabaseFunctions';
import databaseUtils from '../../src/database/databaseUtils';
import ITutor from '../../src/models/ITutor';
import {assert} from 'chai';
import Dynamo from '../../src/database/dynamo';
import DatabaseUtils from '../../src/database/databaseUtils';
import {
   tutorDefined,
   putItemOutput,
   putItemInputTutorDefined,
   putItemOutputResolves,
   awsError,
   putItemOutputRejects,
   getItemInputTutorDefined,
   getItemTutorDefinedResolves,
   getItemRejects,
   tutorIncomplete,
   putItemInputTutorIncomplete,
   updateItemInputUpdateUser,
   updateItemOutputRejects,
   updateItemOutputUpdateUserResolves,
   updateUser,
   updateUserNoReturn,
   dateToTest,
   updateItemLastSeenTutor,
   updateItemIncompleteTutor,
} from '../utils/templates';

describe('Tutor Database Functions Test', () => {
   let dbUtils: databaseUtils;
   let tutordb: tutorDatabaseFunctions;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   beforeEach(() => {
      // Stub all calls to dynamo
      dynamo = Dynamo.getInstance();
      sandbox = sinon.createSandbox();
      dbUtils = DatabaseUtils.getInstance();
      tutordb = new tutorDatabaseFunctions();
   });

   afterEach(() => {
      // Cleanup
      sandbox.restore();
   });

   it('Should add tutor to db with all user params', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return tutordb.addUserToDatabase(tutorDefined).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(putItemInputTutorDefined));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemOutput.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should fail to add bad tutor', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputRejects);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return tutordb
         .addUserToDatabase(tutorDefined)
         .then(() => {
            assert.fail('Should not succeed');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert(spy.calledWith(putItemInputTutorDefined));
            assert.equal(err, awsError);
         });
   });

   it('Should get tutor', () => {
      sandbox.stub(dynamo, 'getItem').returns(getItemTutorDefinedResolves);
      const spy = sandbox.spy(dbUtils, 'getItem');

      return tutordb.getUserByFirebaseId(tutorDefined.firebase_uid).then((resAsUser) => {
         const res: ITutor = resAsUser as ITutor;
         assert(spy.calledOnce);
         assert(spy.calledWith(getItemInputTutorDefined));
         assert.equal(res.email, tutorDefined.email);
         assert.equal(res.is_validated, tutorDefined.is_validated);
         assert.equal(res.firebase_uid, tutorDefined.firebase_uid);
         assert.equal(res.first_name, tutorDefined.first_name);
         assert.equal(res.last_name, tutorDefined.last_name);
         assert.equal(res.profileImage, tutorDefined.profileImage);
         assert.equal(res.phone, tutorDefined.phone);
         assert.equal(res.tutor_info.campuses, tutorDefined.tutor_info.campuses);
         assert.equal(res.tutor_info.chatrooms, tutorDefined.tutor_info.chatrooms);
         assert.equal(res.tutor_info.overallRating, tutorDefined.tutor_info.overallRating);
         assert.equal(res.tutor_info.stripe_account_id, tutorDefined.tutor_info.stripe_account_id);
      });
   });

   it('Should fail to get bad tutor', () => {
      sandbox.stub(dynamo, 'getItem').returns(getItemRejects);
      const spy = sandbox.spy(dbUtils, 'getItem');

      return tutordb
         .getUserByFirebaseId(tutorDefined.firebase_uid)
         .then(() => {
            assert.fail('should not get user');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert(spy.calledWith(getItemInputTutorDefined));
            assert.equal(err, awsError);
         });
   });

   it('Should add tutor to db with missing params', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return tutordb.addUserToDatabase(tutorIncomplete).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(putItemInputTutorIncomplete));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemOutput.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should update a user', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);
      const spy = sandbox.spy(dbUtils, 'updateItem');

      return tutordb.updateUser(updateUser).then((res) => {
         assert(spy.calledWith(updateItemInputUpdateUser));
         assert.equal(res.firebase_uid, updateUser.firebase_uid);
         assert.equal(res.email, updateUser.email);
         assert.equal(res.is_validated, updateUser.is_validated);
         assert.equal(res.first_name, updateUser.first_name);
         assert.equal(res.last_name, updateUser.last_name);
         assert.equal(res.profileImage, updateUser.profileImage);
         assert.equal(res.phone, updateUser.phone);
      });
   });

   it('Should fail to update a user', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);
      const spy = sandbox.spy(dbUtils, 'updateItem');

      return tutordb
         .updateUser(updateUser)
         .then(() => {
            assert.fail('Should fail to update user');
         })
         .catch((err) => {
            assert.equal(err, awsError);
            assert(spy.calledWith(updateItemInputUpdateUser));
         });
   });

   it('Should update last seen data', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateUserNoReturn);
      const spy = sandbox.spy(dbUtils, 'updateItem');

      return tutordb.updateLastSeen(tutorDefined.firebase_uid, dateToTest).then(() => {
         assert(spy.calledWith(updateItemLastSeenTutor));
      });
   });

   it('Should add missing tutor parameters', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateUserNoReturn);
      const spy = sandbox.spy(dbUtils, 'updateItem');

      return tutordb.addTutorInfoToUser(tutorIncomplete).then(() => {
         assert(spy.calledWith(updateItemIncompleteTutor));
      });
   });
});
