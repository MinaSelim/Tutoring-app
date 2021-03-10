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
} from '../utils/templates';

describe('API request calls', () => {
   let app: Application;
   let server: Server;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   // Setup all mocked values
   before(() => {
      dynamo = Dynamo.getInstance();
      sandbox = Sinon.createSandbox();
      sandbox.stub(DatabaseConfig, 'init').resolves();

      sandbox.stub(FirebaseAuth, 'getInstance').returns(firebase.initializeApp(firebaseConfig).auth());

      // Used for registration
      const putItemStub = sandbox.stub(dynamo, 'putItem');
      putItemStub.onCall(0).returns(putItemOutputResolves);
      putItemStub.onCall(1).returns(putItemOutputResolves);
      // force error
      putItemStub.onCall(2).returns(putItemOutputRejects);
      putItemStub.onCall(3).returns(putItemOutputRejects);

      // Used for login
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

      const getItemStub = sandbox.stub(dynamo, 'getItem');
      getItemStub.onCall(0).returns(getItemStudentDefinedResolves);
      getItemStub.onCall(1).returns(getItemTutorDefinedResolves);
      // force error
      getItemStub.onCall(2).returns(getItemRejects);
      getItemStub.onCall(3).returns(getItemRejects);

      // Start the server only after having stubbed everything
      app = new App().app;
      server = app.listen(3000);
   });

   after(() => {
      // cleanup and turn off server
      sandbox.restore();
      firebaseTest().cleanup();
      return server.close();
   });

   it('Should register student', () => {
      return chai
         .request(server)
         .post('/auth/student/register')
         .send(studentDefined)
         .then((res: Response) => {
            assert.exists(res.body);
            assert.equal(res.status, 200);
         });
   });

   it('Should register tutor', () => {
      return chai
         .request(server)
         .post('/auth/tutor/register')
         .send(tutorDefined)
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
