import {
   GetItemInput,
   GetItemOutput,
   PutItemInput,
   PutItemOutput,
   UpdateItemInput,
   UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
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
         first_name: data.Item.first_name.S,
         last_name: data.Item.last_name.S,
         profileImage: data.Item.profileImage.S,
         phone: data.Item.phone.S,
      };
   };

   protected abstract addSpecificUserProperties(user: IUser, data: GetItemOutput): IUser;

   public updateUser = async (user: IUser): Promise<IUser> => {
      const tempUser: IUser = {...user};

      if (!tempUser.profileImage) {
         tempUser.profileImage = '';
      }

      if (!tempUser.phone) {
         tempUser.phone = '';
      }

      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: tempUser.firebase_uid,
            },
         },
         UpdateExpression: 'SET first_name = :fn, last_name = :ln, profileImage = :pi, phone = :ph',
         ExpressionAttributeValues: {
            ':fn': {
               S: tempUser.first_name,
            },
            ':ln': {
               S: tempUser.last_name,
            },
            ':pi': {
               S: tempUser.profileImage,
            },
            ':ph': {
               S: tempUser.phone,
            },
         },
         ReturnValues: 'ALL_NEW',
      };

      const returnData: UpdateItemOutput = await this.databaseUtils.updateItem(params);
      const updatedUser: IUser = {
         email: returnData.Attributes.email.S,
         is_validated: returnData.Attributes.is_validated.BOOL,
         firebase_uid: returnData.Attributes.firebase_uid.S,
         first_name: returnData.Attributes.first_name.S,
         last_name: returnData.Attributes.last_name.S,
         profileImage: returnData.Attributes.profileImage.S,
         phone: returnData.Attributes.phone.S,
      };

      return updatedUser;
   };

   /**
    * Function that checks whether a user exists in the database.
    * @param id representing the user's firebase_uid
    * @returns a promise of type boolean.
    */
   public userExists = async (id: string): Promise<boolean> => {
      const params: GetItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
      };
      const data: GetItemOutput = await this.databaseUtils.getItem(params);
      // return data.Item != null
      return data.Item != null && data.Item.firebase_uid.S == id;
   };

   public userIsRegisteredAsStudent = async (id: string): Promise<boolean> => {
      const params: GetItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
      };
      const data: GetItemOutput = await this.databaseUtils.getItem(params);
      return data.Item != null && data.Item.student_info != null;
   };

   public userIsRegisteredAsTutor = async (id: string): Promise<boolean> => {
      const params: GetItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
      };
      const data: GetItemOutput = await this.databaseUtils.getItem(params);
      return data.Item != null && data.Item.tutor_info != null;
   };

   public getBasicUserInfo = async (id: string): Promise<IUser> => {
      const params: GetItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
      };
      const queryResponse: GetItemOutput = await this.databaseUtils.getItem(params);
      const user: IUser = this.createGenericUser(queryResponse);
      return user;
   };
}
