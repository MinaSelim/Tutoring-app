import Sinon from 'sinon';
import sinon from 'sinon';
import studentDatabaseFunctions from '../../src/database/studentDatabaseFunctions';
import databaseUtils from '../../src/database/databaseUtils';
import IStudent from '../../src/models/IStudent';
import {assert} from 'chai';
import Dynamo from '../../src/database/dynamo';
import {
   studentDefined,
   studentValidUndefined,
   studentIncomplete,
   putItemStudentDefined,
   putItemOutput,
   studentStripeUndefined,
   putItemInputStudentStripeUndefined,
   putItemOutputResolves,
   putItemInputStudentValidUndefined,
   awsError,
   putItemOutputRejects,
   getItemInputStudentDefined,
   getItemStudentDefinedResolves,
   getItemRejects,
   putItemInputStudentIncomplete,
   updateItemOutputUpdateUserResolves,
   updateItemInputUpdateUser,
   updateUser,
   updateItemOutputRejects,
} from '../utils/templates';

describe('Student Database Functions Test', () => {
   let studentdb: studentDatabaseFunctions;
   let dbUtils: databaseUtils;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   beforeEach(() => {
      // Stub all calls to dynamo
      dynamo = Dynamo.getInstance();
      sandbox = sinon.createSandbox();
      studentdb = new studentDatabaseFunctions();
      dbUtils = databaseUtils.getInstance();
   });

   afterEach(() => {
      // cleanup
      sandbox.restore();
   });

   it('Should add student to db with all user params', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(studentDefined).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(putItemStudentDefined));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemOutput.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should add student to db with missing stripe id user param', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(studentStripeUndefined).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(putItemInputStudentStripeUndefined));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemOutput.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should add student to db with missing email validation user param', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(studentValidUndefined).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(putItemInputStudentValidUndefined));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemOutput.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should fail to add bad student', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputRejects);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb
         .addUserToDatabase(studentDefined)
         .then(() => {
            assert.fail('Should not succeed');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert(spy.calledWith(putItemStudentDefined));
            assert.equal(err, awsError);
         });
   });

   it('Should get student', () => {
      sandbox.stub(dynamo, 'getItem').returns(getItemStudentDefinedResolves);
      const spy = sandbox.spy(dbUtils, 'getItem');

      return studentdb.getUserByFirebaseId(studentDefined.firebase_uid).then((resAsUser) => {
         const res: IStudent = resAsUser as IStudent;
         assert(spy.calledOnce);
         assert(spy.calledWith(getItemInputStudentDefined));
         assert.equal(res.email, studentDefined.email);
         assert.equal(res.is_validated, studentDefined.is_validated);
         assert.equal(res.firebase_uid, studentDefined.firebase_uid);
         assert.equal(res.stripe_customer_id, studentDefined.stripe_customer_id);
         assert.equal(res.first_name, studentDefined.first_name);
         assert.equal(res.last_name, studentDefined.last_name);
         assert.equal(res.profileImage, studentDefined.profileImage);
         assert.equal(res.phone, studentDefined.phone);
         assert.equal(res.student_info.campus, studentDefined.student_info.campus);
         assert.equal(res.student_info.chatrooms, studentDefined.student_info.chatrooms);
      });
   });

   it('Should fail to get bad student', () => {
      sandbox.stub(dynamo, 'getItem').returns(getItemRejects);
      const spy = sandbox.spy(dbUtils, 'getItem');

      return studentdb
         .getUserByFirebaseId(studentDefined.firebase_uid)
         .then(() => {
            assert.fail('should not get user');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert(spy.calledWith(getItemInputStudentDefined));
            assert.equal(err, awsError);
         });
   });

   it('Should add student to db with missing params', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
      const spy = sandbox.spy(dbUtils, 'putItem');

      return studentdb.addUserToDatabase(studentIncomplete).then((res) => {
         assert(spy.calledOnce);
         assert(spy.calledWith(putItemInputStudentIncomplete));
         assert.equal(res.ConsumedCapacity.CapacityUnits, putItemOutput.ConsumedCapacity.CapacityUnits);
      });
   });

   it('Should update a user', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);
      const spy = sandbox.spy(dbUtils, 'updateItem');

      return studentdb.updateUser(updateUser).then((res) => {
         assert(spy.calledWith(updateItemInputUpdateUser));
         assert.equal(res.firebase_uid, updateUser.firebase_uid);
         assert.equal(res.email, updateUser.email);
         assert.equal(res.is_validated, updateUser.is_validated);
         assert.equal(res.stripe_customer_id, updateUser.stripe_customer_id);
         assert.equal(res.first_name, updateUser.first_name);
         assert.equal(res.last_name, updateUser.last_name);
         assert.equal(res.profileImage, updateUser.profileImage);
         assert.equal(res.phone, updateUser.phone);
      });
   });

   it('Should fail to update a user', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);
      const spy = sandbox.spy(dbUtils, 'updateItem');

      return studentdb
         .updateUser(updateUser)
         .then(() => {
            assert.fail('Should fail to update user');
         })
         .catch((err) => {
            assert.equal(err, awsError);
            assert(spy.calledWith(updateItemInputUpdateUser));
         });
   });
});
