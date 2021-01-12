import Sinon from 'sinon';
import sinon from 'sinon';
import DatabaseConfig from '../../src/config/DatabaseConfig';
import {AWSError} from 'aws-sdk';
import {CreateTableInput, CreateTableOutput} from 'aws-sdk/clients/dynamodb';
import {assert} from 'chai';
import Dynamo from '../../src/database/dynamo';
import hasOwnProperty from '../helper';

describe('Database Config Test', () => {
   let sandbox: Sinon.SinonSandbox;
   let dynamo: AWS.DynamoDB;

   const createTableResponseGood: CreateTableOutput = {
      TableDescription: {
         TableName: 'User',
      },
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

   const errorTableExists: AWSError = {
      code: 'ResourceInUseException',
      message: 'ResourceInUseException',
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

   beforeEach(() => {
      // Stub all calls to dynamo
      dynamo = Dynamo.getInstance();
      sandbox = sinon.createSandbox();
   });

   afterEach(() => {
      sandbox.restore();
   });

   it('Should create a new valid table', () => {
      const params: CreateTableInput = {
         AttributeDefinitions: [
            {
               AttributeName: 'test',
               AttributeType: 'S',
            },
         ],
         KeySchema: [
            {
               AttributeName: 'test',
               KeyType: 'HASH',
            },
         ],
         ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
         },
         TableName: 'Test',
      };

      const outputCreateTable: AWS.Request<CreateTableOutput, AWSError> = ({
         promise() {
            return Promise.resolve(createTableResponseGood);
         },
      } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

      sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);
      return DatabaseConfig.createTable(params).then((res: CreateTableOutput) => {
         assert.equal(res.TableDescription.TableName, createTableResponseGood.TableDescription.TableName);
      });
   });

   it('Should not create table if aws error', () => {
      const params: CreateTableInput = {
         AttributeDefinitions: [
            {
               AttributeName: 'test',
               AttributeType: 'S',
            },
         ],
         KeySchema: [
            {
               AttributeName: 'test',
               KeyType: 'HASH',
            },
         ],
         ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
         },
         TableName: 'Test',
      };

      const outputCreateTable = ({
         promise() {
            return Promise.reject(error);
         },
      } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

      const spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);

      return DatabaseConfig.createTable(params)
         .then(() => {
            assert.fail('Should not pass');
         })
         .catch((err) => {
            assert(spy.calledOnce);
            assert.equal(err, error);
         });
   });

   it('Should not create table that already exists', () => {
      const params: CreateTableInput = {
         AttributeDefinitions: [
            {
               AttributeName: 'test',
               AttributeType: 'S',
            },
         ],
         KeySchema: [
            {
               AttributeName: 'test',
               KeyType: 'HASH',
            },
         ],
         ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
         },
         TableName: 'Test',
      };

      const outputCreateTable = ({
         promise() {
            return Promise.reject(errorTableExists);
         },
      } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

      const spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);

      return DatabaseConfig.createTable(params).then((out: CreateTableOutput | AWSError) => {
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
      const outputCreateTable = ({
         promise() {
            return Promise.reject(error);
         },
      } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

      const spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);

      return DatabaseConfig.init().then(() => {
         assert(spy.called);
      });
   });
});
