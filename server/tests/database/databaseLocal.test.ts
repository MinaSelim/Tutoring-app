import { assert } from "chai";
import Database from "../../src/database/database";
import IUser from "../../src/models/IUser";
// Use this to practice with local instance
describe("Local dynamo test", () => {
  it.skip("Should create table, add user, and get user", () => {
    let db = new Database();

    let params = {
      AttributeDefinitions: [
        {
          AttributeName: "firebase_uid",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "firebase_uid",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
      TableName: "User",
    };

    let user: IUser = {
      id: "string",
      name: "string",
      email: "string",
      firebase_uid: "string",
      stripe_customer_id: "string",
      is_validated: true,
    };

    return db
      .createTable(params)
      .then(() => {
        return db.addUserInUserCollection(user);
      })
      .then((data) => {
        console.log(data);
        return db.getUserByFirebaseId("string");
      })
      .then((res) => {
        assert.equal(res.email, user.email);
        assert.equal(res.is_validated, user.is_validated);
        assert.equal(res.firebase_uid, user.firebase_uid);
        assert.equal(res.stripe_customer_id, user.stripe_customer_id);
        assert.equal(res.name, user.name);
      });
  });
});
