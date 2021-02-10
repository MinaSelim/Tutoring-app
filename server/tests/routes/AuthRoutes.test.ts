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
import {GetItemOutput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
import {AWSError} from 'aws-sdk';
import IStudent from '../../src/models/IStudent';
import FirebaseAuth from '../../src/services/FirebaseAuth';
import firebaseTest = require('firebase-functions-test');
import firebase from 'firebase-admin';
import admin = require('firebase-admin');
import ITutor from '../../src/models/ITutor';

describe('API request calls', () => {
   let app: Application;
   let server: Server;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   const putItemResponseGood: PutItemOutput = {
      ConsumedCapacity: {TableName: 'User', CapacityUnits: 1},
   };

   const student: IStudent = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      firebase_uid: 'string',
      student_info: {
         campus: 'string',
         chatrooms: ['string'],
      },
   };

   const getItemResponseGoodStudent: GetItemOutput = {
      Item: {
         first_name: {S: student.first_name},
         last_name: {S: student.last_name},
         email: {S: student.email},
         firebase_uid: {S: student.firebase_uid},
         stripe_customer_id: {S: ''},
         is_validated: {BOOL: false},
         profileImage: {S: ''},
         phone: {S: ''},
         student_info: {
            M: {
               campus: {S: student.student_info.campus},
               chatrooms: {SS: student.student_info.chatrooms},
            },
         },
      },
      ConsumedCapacity: {TableName: 'User', CapacityUnits: 1},
   };

   const tutor: ITutor = {
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      firebase_uid: 'string',
      tutor_info: {
         campuses: ['string'],
         chatrooms: ['string'],
      },
   };

   const getItemResponseGoodTutor: GetItemOutput = {
      Item: {
         first_name: {S: tutor.first_name},
         last_name: {S: tutor.last_name},
         email: {S: tutor.email},
         firebase_uid: {S: tutor.firebase_uid},
         stripe_customer_id: {S: ''},
         is_validated: {BOOL: false},
         profileImage: {S: ''},
         campuses: {S: ''},
         phone: {S: ''},
         tutor_info: {
            M: {
               campus: {SS: tutor.tutor_info.campuses},
               chatrooms: {SS: tutor.tutor_info.chatrooms},
            },
         },
      },
      ConsumedCapacity: {TableName: 'User', CapacityUnits: 1},
   };

   const firebaseConfig = {
      apiKey: 'Api Key',
      authDomain: 'Domain',
      databaseURL: 'URL',
      projectId: 'ID',
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

   // Setupt all mocked values
   before(() => {
      dynamo = Dynamo.getInstance();
      sandbox = Sinon.createSandbox();
      sandbox.stub(DatabaseConfig, 'init').resolves();

      const putItemOutputResolve = ({
         promise() {
            return Promise.resolve(putItemResponseGood);
         },
      } as unknown) as AWS.Request<PutItemOutput, AWSError>;

      const putItemOutputReject = ({
         promise() {
            return Promise.reject(putItemResponseGood);
         },
      } as unknown) as AWS.Request<PutItemOutput, AWSError>;

      const putItemStub = sandbox.stub(dynamo, 'putItem');
      putItemStub.onCall(0).returns(putItemOutputResolve);
      putItemStub.onCall(1).returns(putItemOutputResolve);
      // force error
      putItemStub.onCall(2).returns(putItemOutputReject);
      putItemStub.onCall(3).returns(putItemOutputReject);

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

      const getItemOutput0 = ({
         promise() {
            return Promise.resolve(getItemResponseGoodStudent);
         },
      } as unknown) as AWS.Request<GetItemOutput, AWSError>;

      const getItemOutput1 = ({
         promise() {
            return Promise.resolve(getItemResponseGoodTutor);
         },
      } as unknown) as AWS.Request<GetItemOutput, AWSError>;

      const getItemOutput2 = ({
         promise() {
            return Promise.reject(error);
         },
      } as unknown) as AWS.Request<GetItemOutput, AWSError>;

      const getItemStub = sandbox.stub(dynamo, 'getItem');
      getItemStub.onCall(0).returns(getItemOutput0);
      getItemStub.onCall(1).returns(getItemOutput1);
      // force error
      getItemStub.onCall(2).returns(getItemOutput2);
      getItemStub.onCall(3).returns(getItemOutput2);

      app = new App().app;
      server = app.listen(3000);
   });

   after(() => {
      sandbox.restore();
      firebaseTest().cleanup();
      return server.close();
   });

   it.skip('Should register student', () => {
      return chai
         .request(server)
         .post('/auth/student/register')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 200);
         });
   });

   it.skip('Should register tutor', () => {
      return chai
         .request(server)
         .post('/auth/tutor/register')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 200);
         });
   });

   it('Should login student', () => {
      return chai
         .request(server)
         .post('/auth/student/login')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 200);
         });
   });

   it('Should login tutor', () => {
      return chai
         .request(server)
         .post('/auth/tutor/login')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 200);
         });
   });

   it('Should not register bad student', () => {
      return chai
         .request(server)
         .post('/auth/student/register')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 500);
         });
   });

   it('Should not register bad tutor', () => {
      return chai
         .request(server)
         .post('/auth/tutor/register')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 500);
         });
   });

   it('Should not login bad student', () => {
      return chai
         .request(server)
         .post('/auth/student/login')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 500);
         });
   });

   it('Should not login bad tutor', () => {
      return chai
         .request(server)
         .post('/auth/tutor/login')
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 500);
         });
   });
});
