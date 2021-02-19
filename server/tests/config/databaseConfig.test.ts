import Sinon from 'sinon';
import sinon from 'sinon';
import DatabaseConfig from '../../src/config/DatabaseConfig';
import {AWSError} from 'aws-sdk';
import {CreateTableOutput} from 'aws-sdk/clients/dynamodb';
import {assert} from 'chai';
import Dynamo from '../../src/database/dynamo';
import hasOwnProperty from '../utils/helper';
import {
   awsError,
   createTableOutput,
   createTableInputTemplate,
   outputCreateTableResolves,
   outputCreateTableRejectsBasicError,
   outputCreateTableRejectsTableExistError,
} from '../utils/templates';

describe('Database Config Test', () => {
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   beforeEach(() => {
      // Stub all calls to dynamo
      dynamo = Dynamo.getInstance();
      sandbox = sinon.createSandbox();
   });

   afterEach(() => {
      // cleanup stubs
      sandbox.restore();
   });

   it('Should create a new valid table', () => {
      sandbox.stub(dynamo, 'createTable').returns(outputCreateTableResolves);

      return DatabaseConfig.createTable(createTableInputTemplate).then((res: CreateTableOutput | AWSError) => {
         if (
            typeof res === 'object' &&
            hasOwnProperty(res, 'TableDescription') &&
            typeof res.TableDescription === 'object' &&
            hasOwnProperty(res.TableDescription, 'TableName')
         ) {
            assert.equal(res.TableDescription.TableName, createTableOutput.TableDescription.TableName);
         } else {
            assert.fail('Response object should have table description property');
         }
      });
   });

   it('Should not create table if aws error', () => {
      const spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTableRejectsBasicError);

      return DatabaseConfig.createTable(createTableInputTemplate)
         .then(() => {
            assert.fail('Should not pass');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert.equal(err, awsError);
         });
   });

   it('Should not create table that already exists', () => {
      const spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTableRejectsTableExistError);

      return DatabaseConfig.createTable(createTableInputTemplate).then((out: CreateTableOutput | AWSError) => {
         assert(spy.calledOnce);
         // Check we are of correct type before infering a property exists
         if (typeof out === 'object' && hasOwnProperty(out, 'TableDescription')) {
            assert.isEmpty(out['TableDescription']);
         } else {
            assert.fail('Should have table description property in reponse');
         }
      });
   });

   it('Should gracefully fail to init database', () => {
      const spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTableRejectsBasicError);

      return DatabaseConfig.init().then(() => {
         assert(spy.called);
      });
   });
});
