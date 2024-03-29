import 'mocha';
import express from 'express';
import {expect} from 'chai';
import sinon from 'sinon';
import App from '../src/config/app';
import firebaseTest = require('firebase-functions-test');
import {CreateTableOutput} from 'aws-sdk/clients/dynamodb';
import {AWSError} from 'aws-sdk';
import Sinon = require('sinon');
import Dynamo from '../src/database/dynamo';
import FirebaseAuth from '../src/services/FirebaseAuth';

describe('Server initialization', () => {
   let server: express.Application;
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   before(() => {
      // Stub calls to resources
      dynamo = Dynamo.getInstance();
      sandbox = sinon.createSandbox();

      sandbox.stub(FirebaseAuth, 'getInstance').returns(null);

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
      sandbox.restore();
      // Do other cleanup tasks.
      firebaseTest().cleanup();
   });
});
