import IUser from '../models/IUser';
import {
  CreateTableInput,
  CreateTableOutput,
  GetItemInput,
  GetItemOutput,
  ListTablesOutput,
  PutItemInput,
  PutItemOutput,
} from 'aws-sdk/clients/dynamodb';
import Dynamo from './dynamo';
import {v4 as uuidv4} from 'uuid';

export default class Database {
  /**
   * Adds a user to the database
   * @param user User to add
   */
  public addUserInUserCollection = (user: IUser) => {
    let tempUser = user;

    // Fill in missing parameters
    if (!user.is_validated) {
      tempUser.is_validated = false;
    }

    if (!user.stripe_customer_id) {
      tempUser.stripe_customer_id = '';
    }

    let params: PutItemInput = {
      Item: {
        username: {
          S: tempUser.name,
        },
        email: {
          S: tempUser.email,
        },
        stripe_id: {
          S: tempUser.stripe_customer_id,
        },
        email_validation: {
          BOOL: tempUser.is_validated,
        },
        firebase_uid: {
          S: tempUser.firebase_uid,
        },
      },
      ReturnConsumedCapacity: 'TOTAL',
      TableName: 'User',
    };
    return this.putItem(params);
  };

  /**
   * Retreives a user from the database
   * @param id
   */
  public getUserByFirebaseId = (id: string) => {
    let params: GetItemInput = {
      Key: {
        firebase_uid: {
          S: id,
        },
      },
      TableName: 'User',
    };
    return this.getItem(params).then((data: GetItemOutput) => {
      // TODO not sure how to handle the id when it is not saved to a table
      let user: IUser = {
        id: uuidv4(),
        email: data.Item.email.S,
        is_validated: data.Item.email_validation.BOOL,
        firebase_uid: data.Item.firebase_uid.S,
        stripe_customer_id: data.Item.stripe_id.S,
        name: data.Item.username.S,
      };
      return Promise.resolve(user);
    });
  };

  /**
   * Creates a table if it doesn't already exist.
   * Note that dynamo only needs KEY attributes to create a table, other
   * non-key attributes can be added during queries.
   * @param params The table create parameters.
   * @returns A promise.
   */
  public createTable = (params: CreateTableInput) => {
    const createPromise = new Promise((resolve, reject) => {
      return Dynamo.getInstance().createTable(params).promise();
    });

    return this.tableExists(params.TableName)
      .then((exists) => {
        if (!exists) {
          return createPromise;
        } else {
          return Promise.resolve();
        }
      })
      .catch((err) => {
        console.error('Failed creating table');
        return Promise.reject(err);
      });
  };

  /**
   * Add an item to a table in dynamo.
   * @param params
   */
  public putItem = (params: PutItemInput) => {
    const promise = new Promise((resolve, reject) => {
      resolve(Dynamo.getInstance().putItem(params).promise());
    });

    return promise
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.error('Could not put item in', params.TableName);
        return Promise.reject(err);
      });
  };

  /**
   * Retreive an item from a table in dynamo.
   * @param params
   */
  public getItem = (params: GetItemInput) => {
    const promise = new Promise((resolve, reject) => {
      resolve(Dynamo.getInstance().getItem(params).promise());
    });

    return promise
      .then((data) => {
        return Promise.resolve(data);
      })
      .catch((err) => {
        console.error('Could not get item from', params.TableName);
        return Promise.reject(err);
      });
  };

  /**
   * Function that checks if a table exists in dynamo DB.
   * @param nameToCheck The name of the table to check.
   * @returns A boolean promise with the result.
   */
  private tableExists = (nameToCheck: String): Promise<boolean> => {
    const promise = new Promise((resolve, reject) => {
      resolve(Dynamo.getInstance().listTables().promise());
    });

    return promise.then((data: ListTablesOutput) => {
      const names = data.TableNames.filter((name) => {
        return name === nameToCheck;
      });

      if (names.length > 0) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    });
  };
}
