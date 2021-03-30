import TutorProfileManager from '../../src/services/managers/TutorProfileManager';
import Sinon from 'sinon';
import {assert} from 'chai';
import {
   getItemChatroomTutorResolves,
   tutorDefined,
   updateItemOutputTutorChatroomResolves,
   updateItemOutputUpdateUserResolves,
   updateUser,
} from '../utils/templates';
import Dynamo from '../../src/database/dynamo';
import ITutor from '../../src/models/ITutor';

describe('Tutor Profile functions', () => {
   let sandbox: Sinon.SinonSandbox;
   let tutorProfileManager: TutorProfileManager;
   let dynamo: AWS.DynamoDB;

   beforeEach(() => {
      sandbox = Sinon.createSandbox();
      dynamo = Dynamo.getInstance();
      tutorProfileManager = new TutorProfileManager();
   });

   afterEach(() => {
      sandbox.restore();
   });

   it('Should update student profile', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);

      return tutorProfileManager.updateInfo(updateUser as ITutor).then((res) => {
         assert.equal(res.first_name, updateUser.first_name);
      });
   });

   it('Should get chatroom', () => {
      sandbox.stub(dynamo, 'getItem').returns(getItemChatroomTutorResolves);

      return tutorProfileManager.getChatrooms(tutorDefined.firebase_uid).then((res) => {
         assert.equal(res[0], tutorDefined.tutor_info.chatrooms[0]);
      });
   });

   it('Should add chatroom', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);

      return tutorProfileManager.addChatroom(tutorDefined.firebase_uid, 'chatId').then((res) => {
         assert.equal(res[0], tutorDefined.tutor_info.chatrooms[0]);
      });
   });

   it('Should remove chatrooms', () => {
      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);

      return tutorProfileManager.removeChatroom(tutorDefined.firebase_uid, 'chatId').then((res) => {
         assert.equal(res[0], tutorDefined.tutor_info.chatrooms[0]);
      });
   });
});
