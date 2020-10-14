import IUser from "../models/IUser";
import {
  CreateBackupOutput,
  CreateTableInput,
  CreateTableOutput,
  GetItemInput,
  GetItemOutput,
  ListTablesOutput,
  PutItemInput,
  PutItemOutput,
} from "aws-sdk/clients/dynamodb";
import Dynamo from "./dynamo";
import { v4 as uuidv4 } from "uuid";
import { bool } from "aws-sdk/clients/signer";

export default class Database {
  /**
   * Adds a user to the database
   * @param user User to add
   */
  public addUserInUserCollection = (user: IUser): Promise<PutItemOutput> => {
    let tempUser = user;

    // Fill in missing parameters
    if (!user.is_validated) {
      tempUser.is_validated = false;
    }

    if (!user.stripe_customer_id) {
      tempUser.stripe_customer_id = "";
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
      ReturnConsumedCapacity: "TOTAL",
      TableName: "User",
    };
    return this.putItem(params);
  };

  /**
   * Retreives a user from the database
   * @param id
   */
  public getUserByFirebaseId = (id: string): Promise<IUser> => {
    let params: GetItemInput = {
      Key: {
        firebase_uid: {
          S: id,
        },
      },
      TableName: "User",
    };
    return this.getItem(params).then(
      (data: GetItemOutput): Promise<IUser> => {
        let user: IUser = {
          id: uuidv4(),
          email: data.Item.email.S,
          is_validated: data.Item.email_validation.BOOL,
          firebase_uid: data.Item.firebase_uid.S,
          stripe_customer_id: data.Item.stripe_id.S,
          name: data.Item.username.S,
        };
        return Promise.resolve(user);
      }
    );
  };

  /**
   * Creates a table if it doesn't already exist.
   * Note that dynamo only needs KEY attributes to create a table, other
   * non-key attributes can be added during queries.
   * @param params The table create parameters.
   * @returns A promise.
   */
  public createTable = (
    params: CreateTableInput
  ): Promise<CreateTableOutput> => {
    return Dynamo.getInstance()
      .createTable(params)
      .promise()
      .catch((err) => {
        if (err.code == "ResourceInUseException") {
          // skip error if table already exists
          console.warn("Table already exists");
          let createTableResponse: CreateTableOutput = {
            TableDescription: {},
          };
          return Promise.resolve(createTableResponse);
        } else {
          console.error("Failed creating table");
          return Promise.reject(err);
        }
      });
  };

  /**
   * Add an item to a table in dynamo.
   * @param params
   */
  public putItem = (params: PutItemInput): Promise<PutItemOutput> => {
    return Dynamo.getInstance()
      .putItem(params)
      .promise()
      .catch((err) => {
        console.error("Could not put item in", params.TableName);
        return Promise.reject(err);
      });
  };

  /**
   * Retreive an item from a table in dynamo.
   * @param params
   */
  public getItem = (params: GetItemInput): Promise<GetItemOutput> => {
    return Dynamo.getInstance()
      .getItem(params)
      .promise()
      .catch((err) => {
        console.error("Could not get item from", params.TableName);
        return Promise.reject(err);
      });
  };
}
