/* eslint-disable @typescript-eslint/no-var-requires */
// These must be called with require to force loading before test

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

import {assert} from 'chai';
import 'mocha';
import App from '../../src/config/app';
import {Server} from 'http';
import {Application} from 'express';
import DatabaseConfig from '../../src/config/DatabaseConfig';
import Sinon from 'sinon';
import Dynamo from '../../src/database/dynamo';
import FirebaseAuth from '../../src/services/FirebaseAuth';
import firebaseTest = require('firebase-functions-test');
import firebase from 'firebase-admin';
import admin = require('firebase-admin');
import {
   firebaseConfig,
   getItemRejects,
   getItemTutorDefinedResolves,
   putItemOutputRejects,
   putItemOutputResolves,
   getItemStudentDefinedResolves,
   studentDefined,
   tutorDefined,
   updateItemOutputUpdateUserResolves,
   getItemChatroomStudentResolves,
   updateItemOutputStudentChatroomResolves,
   updateItemOutputRejects,
   updateItemOutputTutorChatroomResolves,
   getItemChatroomTutorResolves,
   putItemOutputReviewsResolves,
   review0Rating,
   updateItemOutputReviewsResolves,
   getItemReviewResolves,
   queryReviewsResovles,
   queryReviewsRejects,
   searchConstants,
   scanOuputSearchTutorResolves,
   scanOuputSearchTutorRejects,
   getItemEmptyResolves,
   updateUserNoReturn,
   updateStudent,
} from '../utils/templates';
import Guards from '../../src/routes/common/Guards';
import StripeApi from '../../src/services/StripeApi';
import Stripe from 'stripe';

describe('API request calls', () => {
   let server: Server;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   before(() => {
      dynamo = Dynamo.getInstance();
      sandbox = Sinon.createSandbox();
      sandbox.stub(DatabaseConfig, 'init').resolves();
      sandbox.stub(FirebaseAuth, 'getInstance').returns(firebase.initializeApp(firebaseConfig).auth());
      const firebaseApp = FirebaseAuth.getInstance();
      const verifyIdTokenResponse: admin.auth.DecodedIdToken = {
         uid: '',
         aud: '',
         auth_time: 0,
         exp: 0,
         firebase: {identities: {}, sign_in_provider: ''},
         iat: 0,
         iss: '',
         sub: '',
      };
      sandbox.stub(firebaseApp, 'verifyIdToken').resolves(verifyIdTokenResponse);

      const stripeDev = new Stripe('apikey', null);
      sandbox.stub(StripeApi, 'getInstance').returns(stripeDev);

      const app: Application = new App().app;
      return new Promise<void>((resolve) => {
         server = app.listen(3000, () => {
            resolve();
         });
      });
   });

   after(() => {
      // cleanup and turn off server
      sandbox.restore();
      firebaseTest().cleanup();
      return server.close();
   });

   describe('Login api calls', () => {
      it('Should reutrn good response on student login', () => {
         const stub = sandbox.stub(dynamo, 'getItem').returns(getItemStudentDefinedResolves);
         return chai
            .request(server)
            .post('/auth/student/login')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
            });
      });

      it('Should return good response on tutor login', () => {
         const stub = sandbox.stub(dynamo, 'getItem').returns(getItemTutorDefinedResolves);
         return chai
            .request(server)
            .post('/auth/tutor/login')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
            });
      });

      it('Should return 500 on student login fail', () => {
         const stub = sandbox.stub(dynamo, 'getItem').returns(getItemRejects);
         return chai
            .request(server)
            .post('/auth/student/login')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stub.restore();
            });
      });

      it('Should return 500 on tutor login fail', () => {
         const stub = sandbox.stub(dynamo, 'getItem').returns(getItemRejects);
         return chai
            .request(server)
            .post('/auth/tutor/login')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stub.restore();
            });
      });
   });

   describe('Register api calls', () => {
      it('Should return 200 on student register', () => {
         const stub = sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
         const isNotAlreadyRegistered = sandbox.stub(dynamo, 'getItem').returns(getItemEmptyResolves);

         return chai
            .request(server)
            .post('/auth/student/register')
            .send(studentDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
               isNotAlreadyRegistered.restore();
            });
      });

      it('Should return 200 on tutor register', () => {
         const stub = sandbox.stub(dynamo, 'putItem').returns(putItemOutputResolves);
         const isNotAlreadyRegistered = sandbox.stub(dynamo, 'getItem').returns(getItemEmptyResolves);
         return chai
            .request(server)
            .post('/auth/tutor/register')
            .send(tutorDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
               isNotAlreadyRegistered.restore();
            });
      });

      it('Should return 500 on student already exists as student', () => {
         const stub = sandbox.stub(dynamo, 'putItem').returns(putItemOutputRejects);
         const isRegistered = sandbox.stub(dynamo, 'getItem');
         isRegistered.onCall(0).returns(getItemStudentDefinedResolves);
         return chai
            .request(server)
            .post('/auth/student/register')
            .send(studentDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stub.restore();
               isRegistered.restore();
            });
      });

      it('Should return 200 on student already exists as tutor', () => {
         const stub = sandbox.stub(dynamo, 'putItem').returns(putItemOutputRejects);
         const isRegistered = sandbox.stub(dynamo, 'getItem');
         isRegistered.onCall(0).returns(getItemEmptyResolves);
         isRegistered.onCall(1).returns(getItemTutorDefinedResolves);
         const updateStub = sandbox.stub(dynamo, 'updateItem').returns(updateUserNoReturn);

         return chai
            .request(server)
            .post('/auth/student/register')
            .send(updateStudent)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
               isRegistered.restore();
               updateStub.restore();
            });
      });

      it('Should return 200 on tutor already registed as student', () => {
         const stub = sandbox.stub(dynamo, 'putItem').returns(putItemOutputRejects);
         const isRegistered = sandbox.stub(dynamo, 'getItem');
         isRegistered.onCall(0).returns(getItemEmptyResolves);
         isRegistered.onCall(1).returns(getItemStudentDefinedResolves);
         const updateStub = sandbox.stub(dynamo, 'updateItem').returns(updateUserNoReturn);

         return chai
            .request(server)
            .post('/auth/tutor/register')
            .send(tutorDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
               isRegistered.restore();
               updateStub.restore();
            });
      });

      it('Should return 500 on tutor already registed as tutor', () => {
         const stub = sandbox.stub(dynamo, 'putItem').returns(putItemOutputRejects);
         const isRegistered = sandbox.stub(dynamo, 'getItem');
         isRegistered.onCall(0).returns(getItemEmptyResolves);
         return chai
            .request(server)
            .post('/auth/tutor/register')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stub.restore();
               isRegistered.restore();
            });
      });
   });

   describe('Student profile api calls', () => {
      it('Should return 200 on update student profile', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);
         return chai
            .request(server)
            .post('/profile/student/update')
            .send(studentDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on update student profile without being logged in', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').throws();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);
         return chai
            .request(server)
            .post('/profile/student/update')
            .send(studentDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on student profile update and db error', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(putItemOutputRejects);
         return chai
            .request(server)
            .post('/profile/student/update')
            .send(studentDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 200 on get chatroom', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const getItemStub = sandbox.stub(dynamo, 'getItem').returns(getItemChatroomStudentResolves);
         return chai
            .request(server)
            .post('/profile/student/getChatrooms')
            .send(studentDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               getItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on get chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').throws();
         const getItemStub = sandbox.stub(dynamo, 'getItem').returns(getItemChatroomStudentResolves);
         return chai
            .request(server)
            .post('/profile/student/getChatrooms')
            .send(studentDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               getItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on get chatroom with db error', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const getItemStub = sandbox.stub(dynamo, 'getItem').returns(getItemRejects);
         return chai
            .request(server)
            .post('/profile/student/getChatrooms')
            .send(studentDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               getItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 200 on add chatroom', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);
         return chai
            .request(server)
            .post('/profile/student/addChatroom')
            .send(studentDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on add chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').throws();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);
         return chai
            .request(server)
            .post('/profile/student/addChatroom')
            .send(studentDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on add chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);
         return chai
            .request(server)
            .post('/profile/student/addChatroom')
            .send(studentDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 200 on remove chatroom', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);
         return chai
            .request(server)
            .post('/profile/student/removeChatroom')
            .send(studentDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on remove chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').throws();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputStudentChatroomResolves);
         return chai
            .request(server)
            .post('/profile/student/removeChatroom')
            .send(studentDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on remove chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);
         return chai
            .request(server)
            .post('/profile/student/removeChatroom')
            .send(studentDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });
   });

   describe('Tutor profile api calls', () => {
      it('Should return 200 on update tutor profile', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);
         return chai
            .request(server)
            .post('/profile/tutor/update')
            .send(tutorDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on update tutor profile without being logged in', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').throws();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputUpdateUserResolves);
         return chai
            .request(server)
            .post('/profile/tutor/update')
            .send(tutorDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on tutor profile update and db error', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(putItemOutputRejects);
         return chai
            .request(server)
            .post('/profile/tutor/update')
            .send(tutorDefined)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 200 on get chatroom', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const getItemStub = sandbox.stub(dynamo, 'getItem').returns(getItemChatroomTutorResolves);
         return chai
            .request(server)
            .post('/profile/tutor/getChatrooms')
            .send(tutorDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               getItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on get chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').throws();
         const getItemStub = sandbox.stub(dynamo, 'getItem').returns(getItemChatroomTutorResolves);
         return chai
            .request(server)
            .post('/profile/tutor/getChatrooms')
            .send(tutorDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               getItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on get chatroom with db error', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const getItemStub = sandbox.stub(dynamo, 'getItem').returns(getItemRejects);
         return chai
            .request(server)
            .post('/profile/tutor/getChatrooms')
            .send(tutorDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               getItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 200 on add chatroom', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);
         return chai
            .request(server)
            .post('/profile/tutor/addChatroom')
            .send(tutorDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on add chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').throws();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);
         return chai
            .request(server)
            .post('/profile/tutor/addChatroom')
            .send(tutorDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on add chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);
         return chai
            .request(server)
            .post('/profile/tutor/addChatroom')
            .send(tutorDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 200 on remove chatroom', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);
         return chai
            .request(server)
            .post('/profile/tutor/removeChatroom')
            .send(tutorDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on remove chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').throws();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputTutorChatroomResolves);
         return chai
            .request(server)
            .post('/profile/tutor/removeChatroom')
            .send(tutorDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on remove chatroom without login', () => {
         const guard = sandbox.stub(Guards, 'loggedInTutorGuard').returns();
         const updateItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputRejects);
         return chai
            .request(server)
            .post('/profile/tutor/removeChatroom')
            .send(tutorDefined.firebase_uid, 'chatId')
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               updateItemStub.restore();
               guard.restore();
            });
      });
   });

   describe('Reviews routes', () => {
      it('Should return 200 on adding review', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const stubPutItem = sandbox.stub(dynamo, 'putItem').returns(putItemOutputReviewsResolves);
         const stubGetItem = sandbox.stub(dynamo, 'getItem').returns(getItemReviewResolves);
         const udapteItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputReviewsResolves);
         return chai
            .request(server)
            .post('/reviews/addReview')
            .send(review0Rating)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stubPutItem.restore();
               stubGetItem.restore();
               udapteItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on adding review wtihout login', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').throws();
         const stubPutItem = sandbox.stub(dynamo, 'putItem').returns(putItemOutputReviewsResolves);
         const stubGetItem = sandbox.stub(dynamo, 'getItem').returns(getItemReviewResolves);
         const udapteItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputReviewsResolves);
         return chai
            .request(server)
            .post('/reviews/addReview')
            .send(review0Rating)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stubPutItem.restore();
               stubGetItem.restore();
               udapteItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 500 on adding review with db error', () => {
         const guard = sandbox.stub(Guards, 'loggedInStudentGuard').returns();
         const stubPutItem = sandbox.stub(dynamo, 'putItem').returns(putItemOutputRejects);
         const stubGetItem = sandbox.stub(dynamo, 'getItem').returns(getItemReviewResolves);
         const udapteItemStub = sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputReviewsResolves);
         return chai
            .request(server)
            .post('/reviews/addReview')
            .send(review0Rating)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stubPutItem.restore();
               stubGetItem.restore();
               udapteItemStub.restore();
               guard.restore();
            });
      });

      it('Should return 200 on getting tutor reviews', () => {
         const stub = sandbox.stub(dynamo, 'query').returns(queryReviewsResovles);
         return chai
            .request(server)
            .post('/reviews/getTutorReviews')
            .send(tutorDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
            });
      });

      it('Should return 500 on getting tutor review with db error', () => {
         const stub = sandbox.stub(dynamo, 'query').returns(queryReviewsRejects);
         return chai
            .request(server)
            .post('/reviews/getTutorReviews')
            .send(tutorDefined.firebase_uid)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stub.restore();
            });
      });
   });

   describe('Search api calls', () => {
      it('Should return 200 on searching tutors', () => {
         const stub = sandbox.stub(dynamo, 'scan').returns(scanOuputSearchTutorResolves);
         return chai
            .request(server)
            .post('/search/tutorsForClass')
            .send(searchConstants.CAMPUS, searchConstants.CLASSCODE)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
               stub.restore();
            });
      });

      it('Should return 500 on searching tutors', () => {
         const stub = sandbox.stub(dynamo, 'scan').returns(scanOuputSearchTutorRejects);
         return chai
            .request(server)
            .post('/search/tutorsForClass')
            .send(searchConstants.CAMPUS, searchConstants.CLASSCODE)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 500);
               stub.restore();
            });
      });

      it('Should return 200 on searching for classes', () => {
         return chai
            .request(server)
            .post('/search/classes')
            .send(searchConstants.CAMPUS, searchConstants.CLASSCODE)
            .then((res: Response) => {
               assert.exists(res.body);
               assert.equal(res.status, 200);
            });
      });
   });
});
