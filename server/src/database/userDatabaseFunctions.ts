import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput, UpdateItemInput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import * as config from '../config/DatabaseConfigInfo.json';
import DatabaseUtils from '../database/databaseUtils';
import IUser from '../models/IUser';

export default abstract class UserDatabaseFunctions {
   protected databaseUtils: DatabaseUtils;

   constructor() {
      this.databaseUtils = DatabaseUtils.getInstance();
   }

   public addUserToDatabase = (user: IUser): Promise<PutItemOutput> => {
      let tempUser: IUser = this.fillEmptyGenericUserData(user);
      tempUser = this.fillSpecificUserData(tempUser);
      let params: PutItemInput = this.createGenericUserParams(tempUser);
      params = this.addSpecificUserParams(tempUser, params);
      return this.databaseUtils.putItem(params);
   };

   // fills optional generic user values to avoid nulls
   private fillEmptyGenericUserData(user: IUser): IUser {
      const tempUser = {...user};

      if (!user.is_validated) {
         tempUser.is_validated = false;
      }

      if (!user.stripe_customer_id) {
         tempUser.stripe_customer_id = '';
      }

      if (!user.profileImage) {
         tempUser.profileImage = '';
      }

      if (!user.phone) {
         tempUser.phone = '';
      }

      return tempUser;
   }

   // fills specific user type values (like tutor campuses) to avoid nulls 
   protected abstract fillSpecificUserData(tempUser: IUser): IUser;

   private createGenericUserParams = (user: IUser): PutItemInput => {
      const params: PutItemInput = {
         Item: {
            first_name: {
               S: user.first_name,
            },
            last_name: {
               S: user.last_name,
            },
            email: {
               S: user.email,
            },
            stripe_customer_id: {
               S: user.stripe_customer_id,
            },
            is_validated: {
               BOOL: user.is_validated,
            },
            firebase_uid: {
               S: user.firebase_uid,
            },
            profileImage: {
               S: user.profileImage,
            },
            phone: {
               S: user.phone,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: config.tableNames.USER,
      };
      return params;
   };

   protected abstract addSpecificUserParams(tempUser: IUser, params: PutItemInput): PutItemInput;

   public getUserByFirebaseId = async (id: string): Promise<IUser> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         TableName: config.tableNames.USER,
      };
      const data: GetItemOutput = await this.databaseUtils.getItem(params);

      let user: IUser = this.createGenericUser(data);
      user = this.addSpecificUserProperties(user, data);
      return user;
   };

   private createGenericUser = (data: GetItemOutput): IUser => {
      return {
         email: data.Item.email.S,
         is_validated: data.Item.is_validated.BOOL,
         firebase_uid: data.Item.firebase_uid.S,
         stripe_customer_id: data.Item.stripe_customer_id.S,
         first_name: data.Item.first_name.S,
         last_name: data.Item.last_name.S,
         profileImage: data.Item.profileImage.S,
         phone: data.Item.phone.S,
      };
   };

   protected abstract addSpecificUserProperties(user: IUser, data: GetItemOutput): IUser;

   // public updateUser = async (user: IUser): Promise<IUser> => {
   //    const tempUser: IUser = {...user};

   //    const params: UpdateItemInput = {
   //       TableName: config.tableNames.USER, // change to config
   //       Key: {
   //          firebase_uid: {
   //             S: tempUser.firebase_uid
   //          }
   //       },
   //       UpdateExpression: "SET first_name = :fname, last_name = :lname",
   //       ExpressionAttributeValues: {
   //          ":fname": {
   //             S: tempUser.first_name
   //          },
   //          ":lname": {
   //             S: tempUser.last_name
   //          }
   //       },
   //       ReturnValues: "ALL_NEW"
   //    }

   //    const returnData: UpdateItemOutput = await this.databaseUtils.updateItem(params);
   //    const updatedUser: IUser = {
   //       email: returnData.Attributes.email.S,
   //       is_validated: returnData.Attributes.is_validated.BOOL,
   //       firebase_uid: returnData.Attributes.firebase_uid.S,
   //       stripe_customer_id: returnData.Attributes.stripe_customer_id.S,
   //       first_name: returnData.Attributes.first_name.S,
   //       last_name: returnData.Attributes.last_name.S,
   //       profileImage: returnData.Attributes.profileImage.S,
   //       phone: returnData.Attributes.phone.S,
   //    }

   //    return updatedUser;
   // };

   public updateUser = async (user: IUser): Promise<IUser> => {
      let params: UpdateItemInput = this.createGenericUpdateParams(user);
      params = this.addSpecificUserUpdateParams(user, params);
      const returnData: UpdateItemOutput = await this.databaseUtils.updateItem(params);
      let updatedUser: IUser = this.mapGenericUpdateAttributes(returnData);
      updatedUser = this.mapSpecificUpdateAttributes(updatedUser, returnData);
      return updatedUser;
   }

   private createGenericUpdateParams = (user: IUser): UpdateItemInput => {
      const params: UpdateItemInput = {
         TableName: config.tableNames.USER, // change to config
         Key: {
            firebase_uid: {
               S: user.firebase_uid
            }
         },
         UpdateExpression: "SET first_name = :fn, last_name = :ln",
         ExpressionAttributeValues: {
            ":fn": {
               S: user.first_name
            },
            ":ln": {
               S: user.last_name
            }
         },
         ReturnValues: "ALL_NEW"
      };
      return params;
   };

   protected abstract addSpecificUserUpdateParams(user: IUser, params: UpdateItemInput): UpdateItemInput;

   private mapGenericUpdateAttributes = (returnData: UpdateItemOutput): IUser => {
      const updatedUser: IUser = {
         firebase_uid: returnData.Attributes.firebase_uid.S,
         first_name: returnData.Attributes.first_name.S,
         last_name: returnData.Attributes.last_name.S,
         email: returnData.Attributes.email.S,
         is_validated: returnData.Attributes.is_validated.BOOL,
         stripe_customer_id: returnData.Attributes.stripe_customer_id.S,
         profileImage: returnData.Attributes.profileImage.S,
         phone: returnData.Attributes.phone.S, 
      };
      return updatedUser;
   };

   protected abstract mapSpecificUpdateAttributes(user: IUser, returnData: UpdateItemOutput): IUser;
}