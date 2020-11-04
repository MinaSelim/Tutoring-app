import 'mocha';
import express from 'express';
import {expect} from 'chai';
import sinon from 'sinon';
import admin from 'firebase-admin';
import App from '../src/config/app';
import firebaseTest = require('firebase-functions-test');
import {CreateTableOutput} from 'aws-sdk/clients/dynamodb';
import {AWSError} from 'aws-sdk';
import Sinon = require('sinon');
import Dynamo from '../src/database/dynamo';
import FirebaseAuth from '../src/services/FirebaseAuth';

describe('Server initialization', () => {
   let server: express.Application;
   let authStub: sinon.SinonStub;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   before(() => {
      // Stub all functions called by admin from firebase
      authStub = sinon.stub(FirebaseAuth, 'getInstance').returns(null);

      // Stub all db calls during db init phase
      dynamo = Dynamo.getInstance();
      sandbox = sinon.createSandbox();

      const outputCreateTable = ({
         promise() {
            return Promise.resolve({
               TableDescription: {
                  TableName: 'User',
               },
            });
         },
      } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

      sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);
   });

   it('Server instance should exist', () => {
      server = new App().app;
      expect(server).to.exist;
   });

   // Clean up your test
   after(() => {
      authStub.restore();
      sandbox.restore();
      // Do other cleanup tasks.
      firebaseTest().cleanup();
   });
});
