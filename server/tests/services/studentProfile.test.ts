import StudentProfileManager from '../../src/services/managers/StudentProfileManager';
import Sinon from 'sinon';
import {assert} from 'chai';
import {
   getItemChatroomStudentResolves,
   studentDefined,
   updateItemOutputStudentChatroomResolves,
   updateItemOutputUpdateUserResolves,
   updateUser,
} from '../utils/templates';
import Dynamo from '../../src/database/dynamo';
import IStudent from '../../src/models/IStudent';

describe('Student profile functions', () => {
   let sandbox: Sinon.SinonSandbox;
   let studentProfileManager: StudentProfileManager;
   let dynamo: AWS.DynamoDB;

   beforeEach(() => {
      sandbox = Sinon.createSandbox();
      dynamo = Dynamo.getInstance();
      studentProfileManager = new StudentProfileManager();
   });

   afterEach(() => {
      sandbox.restore();
   });

   it('Should update student profile', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);

      return studentProfileManager.updateInfo(updateUser as IStudent).then((res) => {
         assert.equal(res.first_name, updateUser.first_name);
      });
   });

   it('Should get chatroom', () => {
      sandbox.stub(dynamo, 'getItem').returns(getItemChatroomStudentResolves);

      return studentProfileManager.getChatrooms(studentDefined.firebase_uid).then((res) => {
         assert.equal(res[0], studentDefined.student_info.chatrooms[0]);
      });
   });

   it('Should add chatroom', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);

      return studentProfileManager.addChatroom(studentDefined.firebase_uid, 'chatId').then((res) => {
         assert.equal(res[0], studentDefined.student_info.chatrooms[0]);
      });
   });

   it('Should remove chatrooms', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);

      return studentProfileManager.removeChatroom(studentDefined.firebase_uid, 'chatId').then((res) => {
         assert.equal(res[0], studentDefined.student_info.chatrooms[0]);
      });
   });
});
