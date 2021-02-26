import {assert} from 'chai';
import Sinon from 'Sinon';
import databaseUtils from '../../src/database/databaseUtils';
import Dynamo from '../../src/database/dynamo';
import studentDatabaseFunctions from '../../src/database/studentDatabaseFunctions';
import {getItemChatroomResolves, getItemInputChatroomStudentDefined, studentDefined} from '../utils/templates';

describe.only('Chatrooms database functions', () => {
   describe('Student chatrooms', () => {
      let studentdb: studentDatabaseFunctions;
      let dbUtils: databaseUtils;
      let sandbox: Sinon.SinonSandbox;
      let dynamo: AWS.DynamoDB;
      beforeEach(() => {
         // Stub all calls to dynamo
         dynamo = Dynamo.getInstance();
         sandbox = Sinon.createSandbox();
         studentdb = new studentDatabaseFunctions();
         dbUtils = databaseUtils.getInstance();
      });

      afterEach(() => {
         // cleanup
         sandbox.restore();
      });

      it.only('Should get chatrooms', () => {
         sandbox.stub(dynamo, 'getItem').returns(getItemChatroomResolves);
         const spy = sandbox.spy(dbUtils, 'getItem');

         return studentdb
            .getChatrooms(studentDefined.firebase_uid)
            .then((res) => {
               assert(spy.calledWith(getItemInputChatroomStudentDefined));
               assert.equal(res, studentDefined.student_info.chatrooms);
            })
            .catch((err) => {
               console.log(err);
               assert.fail();
            });
      });

      it('Should fail to get chatrooms', () => {
         return Promise.resolve();
      });

      it('Should add chatrooms', () => {
         return Promise.resolve();
      });

      it('Should fail to add chatrooms', () => {
         return Promise.resolve();
      });

      it('Should remove chatrooms', () => {
         return Promise.resolve();
      });

      it('Should fail to remove chatrooms', () => {
         return Promise.resolve();
      });
   });

   describe('Tutor chatrooms', () => {
      it('Should get chatrooms', () => {
         return Promise.resolve();
      });

      it('Should fail to get chatrooms', () => {
         return Promise.resolve();
      });

      it('Should add chatrooms', () => {
         return Promise.resolve();
      });

      it('Should fail to add chatrooms', () => {
         return Promise.resolve();
      });

      it('Should remove chatrooms', () => {
         return Promise.resolve();
      });

      it('Should fail to remove chatrooms', () => {
         return Promise.resolve();
      });
   });
});
