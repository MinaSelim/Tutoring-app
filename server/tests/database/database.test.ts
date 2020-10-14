import Sinon, {spy} from 'sinon';

import sinon from 'sinon';
import Database from '../../src/database/database';
import {AWSError} from 'aws-sdk';
import {
  CreateTableInput,
  CreateTableOutput,
  GetItemInput,
  GetItemOutput,
  ListTablesOutput,
  PutItemInput,
  PutItemOutput,
  TableNameList,
} from 'aws-sdk/clients/dynamodb';
import IUser from '../../src/models/IUser';
import {assert} from 'chai';
import Dynamo from '../../src/database/dynamo';

describe('Database test', () => {
  let db: Database;
  let sandbox: Sinon.SinonSandbox;
  let dynamo: AWS.DynamoDB;
  beforeEach(() => {
    // Stub all calls to dynamo
    dynamo = Dynamo.getInstance();
    sandbox = sinon.createSandbox();
    db = new Database();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should add user to db with all user params', () => {
    let user: IUser = {
      id: 'string',
      name: 'string',
      email: 'string',
      firebase_uid: 'string',
      stripe_customer_id: 'string',
      is_validated: true,
    };

    let params: PutItemInput = {
      Item: {
        username: {
          S: user.name,
        },
        email: {
          S: user.email,
        },
        stripe_id: {
          S: user.stripe_customer_id,
        },
        email_validation: {
          BOOL: user.is_validated,
        },
        firebase_uid: {
          S: user.firebase_uid,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'User',
    };
    const putOutput:PutItemOutput = {} 

    const output = ({
      promise() {
        return 'passed';
      },
    } as unknown) as AWS.Request<PutItemOutput, AWSError>;

    sandbox.stub(dynamo, 'putItem').returns(output);
    let spy = sandbox.spy(db, 'putItem');

    return db
      .addUserInUserCollection(user)
      .then((res) => {
        assert(spy.calledOnce);
        assert(spy.calledWith(params));
        assert.equal(res, 'passed');
      })
      .catch((err) => {
        assert.fail('Should not fail adding user');
      });
  });

  it('Should add user to db with missing stripe id user param', () => {
    let user: IUser = {
      id: '1',
      name: 'string',
      email: 'string',
      firebase_uid: 'string',
      is_validated: true,
    };

    let params: PutItemInput = {
      Item: {
        username: {
          S: user.name,
        },
        email: {
          S: user.email,
        },
        stripe_id: {
          S: '',
        },
        email_validation: {
          BOOL: user.is_validated,
        },
        firebase_uid: {
          S: user.firebase_uid,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'User',
    };

    const output = ({
      promise() {
        return 'passed';
      },
    } as unknown) as AWS.Request<PutItemOutput, AWSError>;

    sandbox.stub(dynamo, 'putItem').returns(output);
    let spy = sandbox.spy(db, 'putItem');

    return db
      .addUserInUserCollection(user)
      .then((res) => {
        assert(spy.calledOnce);
        assert(spy.calledWith(params));
        assert.equal(res, 'passed');
      })
      .catch((err) => {
        assert.fail('Should not fail adding user');
      });
  });

  it('Should add user to db with missing email validation user param', () => {
    let user: IUser = {
      id: '1',
      name: 'string',
      email: 'string',
      firebase_uid: 'string',
    };

    let params: PutItemInput = {
      Item: {
        username: {
          S: user.name,
        },
        email: {
          S: user.email,
        },
        stripe_id: {
          S: '',
        },
        email_validation: {
          BOOL: false,
        },
        firebase_uid: {
          S: user.firebase_uid,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'User',
    };

    const output = ({
      promise() {
        return 'passed';
      },
    } as unknown) as AWS.Request<PutItemOutput, AWSError>;

    sandbox.stub(dynamo, 'putItem').returns(output);
    let spy = sandbox.spy(db, 'putItem');

    return db
      .addUserInUserCollection(user)
      .then((res) => {
        assert(spy.calledOnce);
        assert(spy.calledWith(params));
        assert.equal(res, 'passed');
      })
      .catch((err) => {
        assert.fail('Should not fail adding user');
      });
  });

  it('Should fail to add bad user', () => {
    let user: IUser = {
      id: '1',
      name: 'string',
      email: 'string',
      firebase_uid: 'string',
      is_validated: true,
    };

    let params: PutItemInput = {
      Item: {
        username: {
          S: user.name,
        },
        email: {
          S: user.email,
        },
        stripe_id: {
          S: '',
        },
        email_validation: {
          BOOL: user.is_validated,
        },
        firebase_uid: {
          S: user.firebase_uid,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'User',
    };

    const output = ({
      promise() {
        return Promise.reject('Failed');
      },
    } as unknown) as AWS.Request<PutItemOutput, AWSError>;

    sandbox.stub(dynamo, 'putItem').returns(output);
    let spy = sandbox.spy(db, 'putItem');
    return db
      .addUserInUserCollection(user)
      .then(() => {
        assert.fail('Should not succeed');
      })
      .catch((err) => {
        assert(spy.calledOnce);
        assert(spy.calledWith(params));
        assert.equal(err, 'Failed');
      });
  });

  it('Should get user', () => {
    let params: GetItemInput = {
      Key: {
        firebase_uid: {
          S: '1',
        },
      },
      TableName: 'User',
    };

    const output = ({
      promise() {
        return 'passed';
      },
    } as unknown) as AWS.Request<GetItemOutput, AWSError>;

    sandbox.stub(dynamo, 'getItem').returns(output);
    let spy = sandbox.spy(db, 'getItem');
    return db
      .getUserByFirebaseId('1')
      .then((res) => {
        assert(spy.calledOnce);
        assert(spy.calledWith(params));
      })
      .catch((err) => {
        assert.fail('Should not fail');
      });
  });

  it('Should fail to get bad user', () => {
    let params: GetItemInput = {
      Key: {
        firebase_uid: {
          S: '1',
        },
      },
      TableName: 'User',
    };

    const output = ({
      promise() {
        return Promise.reject('failed');
      },
    } as unknown) as AWS.Request<GetItemOutput, AWSError>;

    sandbox.stub(dynamo, 'getItem').returns(output);
    let spy = sandbox.spy(db, 'getItem');

    return db
      .getUserByFirebaseId('1')
      .then((res) => {
        assert.fail('should not fet user');
      })
      .catch((err) => {
        assert(spy.calledOnce);
        assert(spy.calledWith(params));
        assert.equal(err, 'failed');
      });
  });

  it('Should create a new valid table', () => {
    var params: CreateTableInput = {
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
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      TableName: 'Test',
    };

    const outputCreateTable = ({
      promise() {
        return 'passed';
      },
    } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

    let tableList: TableNameList = [];
    const outputListTables = ({
      promise() {
        return {TableNames: tableList};
      },
    } as unknown) as AWS.Request<ListTablesOutput, AWSError>;

    sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);
    sandbox.stub(dynamo, 'listTables').returns(outputListTables);

    return db
      .createTable(params)
      .then((res) => {
        assert.equal(res, 'passed');
      })
      .catch((err) => {
        assert.fail('Should not fail');
      });
  });

  it('Should not create table that already exists', () => {
    var params: CreateTableInput = {
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
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      TableName: 'Test',
    };

    const outputCreateTable = ({
      promise() {
        return 'failed';
      },
    } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

    let tableList: TableNameList = ['Test'];

    const outputListTables = ({
      promise() {
        return {TableNames: tableList};
      },
    } as unknown) as AWS.Request<ListTablesOutput, AWSError>;

    let spy = sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);
    sandbox.stub(dynamo, 'listTables').returns(outputListTables);

    return db
      .createTable(params)
      .then((res) => {
        assert(spy.calledOnce);
        assert.isUndefined(res);
      })
      .catch((err) => {
        assert.fail(err, 'Should not fail');
      });
  });

  it('Should throw exception on failed creation of table', () => {
    var params: CreateTableInput = {
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
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      TableName: 'Test',
    };

    const outputCreateTable = ({
      promise() {
        return Promise.reject('failed');
      },
    } as unknown) as AWS.Request<CreateTableOutput, AWSError>;

    let tableList: TableNameList = [];

    const outputListTables = ({
      promise() {
        return {TableNames: tableList};
      },
    } as unknown) as AWS.Request<ListTablesOutput, AWSError>;

    sandbox.stub(dynamo, 'createTable').returns(outputCreateTable);
    sandbox.stub(dynamo, 'listTables').returns(outputListTables);

    return db
      .createTable(params)
      .then((res) => {
        assert.fail('It should not pass');
      })
      .catch((err) => {
        assert.equal(err, 'failed');
      });
  });
});
