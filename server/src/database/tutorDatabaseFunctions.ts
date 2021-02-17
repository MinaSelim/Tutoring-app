import ITutor from '../models/ITutor';
import {GetItemInput, GetItemOutput, PutItemInput, UpdateItemInput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import IUser from 'src/models/IUser';
import UserDatabaseFunctions from './userDatabaseFunctions';
import * as config from '../config/DatabaseConfigInfo.json';


export default class TutorDatabaseFunctions extends UserDatabaseFunctions {
   protected fillSpecificUserData = (user: IUser): IUser => {
      const tutor: ITutor = user as ITutor;

      if (tutor.tutor_info.campuses === undefined || tutor.tutor_info.campuses.length == 0) {
         tutor.tutor_info.campuses = [''];
      }

      if (tutor.tutor_info.chatrooms === undefined || tutor.tutor_info.chatrooms.length == 0) {
         tutor.tutor_info.chatrooms = [''];
      }

      return tutor;
   };

   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const tutor: ITutor = user as ITutor;

      params.Item.tutor_info = {
         M: {
            campuses: {
               SS: tutor.tutor_info.campuses,
            },
            chatrooms: {
               SS: tutor.tutor_info.chatrooms,
            },
         },
      };

      return params;
   };

   protected addSpecificUserProperties = (user: IUser, data: GetItemOutput): IUser => {
      const tutor: ITutor = user as ITutor;

      tutor.tutor_info = {
         campuses: data.Item.tutor_info.M.campus.SS,
         chatrooms: data.Item.tutor_info.M.chatrooms.SS,
      };

      return tutor;
   };

   public getChatrooms = async (id: string): Promise<string[]> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         ProjectionExpression: 'tutor_info.chatrooms',
         TableName: config.tableNames.USER,
      };

      const data: GetItemOutput = await this.databaseUtils.getItem(params);
      return data.Item.tutor_info.M.chatrooms.SS;
   };

   public addChatroom = async (id: string, chatId: string): Promise<string[]> => {
      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         UpdateExpression: 'ADD tutor_info.chatrooms :cr',
         ExpressionAttributeValues: {
            ':cr': {
               SS: [chatId],
            },
         },
         ReturnValues: 'UPDATED_NEW',
      };

      const data: UpdateItemOutput = await this.databaseUtils.updateItem(params);
      return data.Attributes.tutor_info.M.chatrooms.SS;
   };

   public removeChatroom = async (id: string, chatId: string): Promise<string[]> => {
      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         UpdateExpression: 'DELETE tutor_info.chatrooms :cr',
         ExpressionAttributeValues: {
            ':cr': {
               SS: [chatId],
            },
         },
         ReturnValues: 'UPDATED_NEW',
      };

      const data: UpdateItemOutput = await this.databaseUtils.updateItem(params);
      return data.Attributes.tutor_info.M.chatrooms.SS;
   };

}
