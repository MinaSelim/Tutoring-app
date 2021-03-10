import {assert} from 'chai';
import Sinon from 'Sinon';
import databaseUtils from '../../src/database/databaseUtils';
import Dynamo from '../../src/database/dynamo';
import studentDatabaseFunctions from '../../src/database/studentDatabaseFunctions';
import tutorDatabaseFunctions from '../../src/database/tutorDatabaseFunctions';

import {
   awsError,
   getItemChatroomStudentResolves,
   getItemInputChatroomStudentDefined,
   getItemRejects,
   studentDefined,
   updateItemOutputStudentChatroomResolves,
   updateItemOutputRejects,
   getItemChatroomTutorResolves,
   getItemInputChatroomTutorDefined,
   tutorDefined,
   updateItemOutputTutorChatroomResolves,
} from '../utils/templates';

describe('Chatrooms database functions', () => {
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

      it('Should get chatrooms', () => {
         sandbox
            .stub(dynamo, 'getItem')
            .withArgs(Sinon.match(getItemInputChatroomStudentDefined))
            .returns(getItemChatroomStudentResolves);
         const spy = sandbox.spy(dbUtils, 'getItem');

         return studentdb.getChatrooms(studentDefined.firebase_uid).then((res) => {
            assert(spy.calledWith(getItemInputChatroomStudentDefined));
            assert.equal(res, studentDefined.student_info.chatrooms);
         });
      });

      it('Should fail to get chatrooms', () => {
         sandbox
            .stub(dynamo, 'getItem')
            .withArgs(Sinon.match(getItemInputChatroomStudentDefined))
            .returns(getItemRejects);
         const spy = sandbox.spy(dbUtils, 'getItem');

         return studentdb
            .getChatrooms(studentDefined.firebase_uid)
            .then(() => {
               assert.fail('Get chatroom should fail with aws error');
            })
            .catch((err) => {
               assert(spy.calledWith(getItemInputChatroomStudentDefined));
               assert.equal(err, awsError);
            });
      });

      it('Should add chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);

         return studentdb.addChatroom(studentDefined.firebase_uid, 'chatId').then((res) => {
            assert.equal(res, studentDefined.student_info.chatrooms);
         });
      });

      it('Should fail to add chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);

         return studentdb
            .addChatroom(studentDefined.firebase_uid, 'chatId')
            .then(() => {
               assert.fail('Should fail to add chatroom');
            })
            .catch((err) => {
               assert.equal(err, awsError);
            });
      });

      it('Should remove chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);

         return studentdb.removeChatroom(studentDefined.firebase_uid, 'chatId').then((res) => {
            assert.equal(res, studentDefined.student_info.chatrooms);
         });
      });

      it('Should fail to remove chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);

         return studentdb
            .removeChatroom(studentDefined.firebase_uid, 'chatId')
            .then(() => {
               assert.fail('Should fail to add chatroom');
            })
            .catch((err) => {
               assert.equal(err, awsError);
            });
      });
   });

   describe('Tutor chatrooms', () => {
      let tutordb: tutorDatabaseFunctions;
      let dbUtils: databaseUtils;
      let sandbox: Sinon.SinonSandbox;
      let dynamo: AWS.DynamoDB;

      beforeEach(() => {
         // Stub all calls to dynamo
         dynamo = Dynamo.getInstance();
         sandbox = Sinon.createSandbox();
         tutordb = new tutorDatabaseFunctions();
         dbUtils = databaseUtils.getInstance();
      });

      afterEach(() => {
         // cleanup
         sandbox.restore();
      });

      it('Should get chatrooms', () => {
         sandbox
            .stub(dynamo, 'getItem')
            .withArgs(Sinon.match(getItemInputChatroomTutorDefined))
            .returns(getItemChatroomTutorResolves);
         const spy = sandbox.spy(dbUtils, 'getItem');

         return tutordb.getChatrooms(tutorDefined.firebase_uid).then((res) => {
            assert(spy.calledWith(getItemInputChatroomTutorDefined));
            assert.equal(res, tutorDefined.tutor_info.chatrooms);
         });
      });

      it('Should fail to get chatrooms', () => {
         sandbox
            .stub(dynamo, 'getItem')
            .withArgs(Sinon.match(getItemInputChatroomTutorDefined))
            .returns(getItemRejects);
         const spy = sandbox.spy(dbUtils, 'getItem');

         return tutordb
            .getChatrooms(tutorDefined.firebase_uid)
            .then(() => {
               assert.fail('Get chatroom should fail with aws error');
            })
            .catch((err) => {
               assert(spy.calledWith(getItemInputChatroomTutorDefined));
               assert.equal(err, awsError);
            });
      });

      it('Should add chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);

         return tutordb.addChatroom(tutorDefined.firebase_uid, 'chatId').then((res) => {
            assert.equal(res, tutorDefined.tutor_info.chatrooms);
         });
      });

      it('Should fail to add chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);

         return tutordb
            .addChatroom(tutorDefined.firebase_uid, 'chatId')
            .then(() => {
               assert.fail('Should fail to add chatroom');
            })
            .catch((err) => {
               assert.equal(err, awsError);
            });
      });

      it('Should remove chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);

         return tutordb.removeChatroom(tutorDefined.firebase_uid, 'chatId').then((res) => {
            assert.equal(res, tutorDefined.tutor_info.chatrooms);
         });
      });

      it('Should fail to remove chatrooms', () => {
         sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);

         return tutordb
            .removeChatroom(tutorDefined.firebase_uid, 'chatId')
            .then(() => {
               assert.fail('Should fail to add chatroom');
            })
            .catch((err) => {
               assert.equal(err, awsError);
            });
      });
   });
});
