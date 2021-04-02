import IStudent from '../models/IStudent';
import {GetItemInput, GetItemOutput, PutItemInput, UpdateItemInput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import UserDatabaseFunctions from '../database/userDatabaseFunctions';
import IUser from 'src/models/IUser';
import * as config from '../config/DatabaseConfigInfo.json';

export default class StudentDatabaseFunctions extends UserDatabaseFunctions {
   protected fillSpecificUserData = (user: IUser): IUser => {
      const student: IStudent = user as IStudent;

      if (student.student_info.chatrooms === undefined || student.student_info.chatrooms.length == 0) {
         student.student_info.chatrooms = [''];
      }

      return student;
   };

   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const student: IStudent = user as IStudent;

      params.Item.student_info = {
         M: {
            campus: {
               S: student.student_info.campus,
            },
            chatrooms: {
               SS: student.student_info.chatrooms,
            },
         },
      };

      return params;
   };

   protected addSpecificUserProperties = (user: IUser, data: GetItemOutput): IUser => {
      const student: IStudent = user as IStudent;

      student.student_info = {
         campus: data.Item.student_info.M.campus.S,
         chatrooms: data.Item.student_info.M.chatrooms.SS,
      };

      return student;
   };

   public getChatrooms = async (id: string): Promise<string[]> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         ProjectionExpression: 'student_info.chatrooms',
         TableName: config.tableNames.USER,
      };

      const data: GetItemOutput = await this.databaseUtils.getItem(params);
      return data.Item.student_info.M.chatrooms.SS;
   };

   public addChatroom = async (id: string, chatId: string): Promise<string[]> => {
      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         UpdateExpression: 'ADD student_info.chatrooms :cr',
         ExpressionAttributeValues: {
            ':cr': {
               SS: [chatId],
            },
         },
         ReturnValues: 'UPDATED_NEW',
      };

      const data: UpdateItemOutput = await this.databaseUtils.updateItem(params);
      return data.Attributes.student_info.M.chatrooms.SS;
   };

   public removeChatroom = async (id: string, chatId: string): Promise<string[]> => {
      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         UpdateExpression: 'DELETE student_info.chatrooms :cr',
         ExpressionAttributeValues: {
            ':cr': {
               SS: [chatId],
            },
         },
         ReturnValues: 'UPDATED_NEW',
      };

      const data: UpdateItemOutput = await this.databaseUtils.updateItem(params);
      return data.Attributes.student_info.M.chatrooms.SS;
   };

   /**
    * Function that adds a student_info object to an existing user in the database
    * @param student an IStudent object holding the student_info to be added
    * @returns void.
    */
   public addStudentInfoToUser = (student: IStudent): void => {
      if (student.student_info.chatrooms === undefined || student.student_info.chatrooms.length == 0) {
         student.student_info.chatrooms = [''];
      }

      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: student.firebase_uid,
            },
         },
         UpdateExpression: 'SET student_info = :si',
         ExpressionAttributeValues: {
            ':si': {
               M: {
                  campus: {
                     S: student.student_info.campus,
                  },
                  chatrooms: {
                     SS: student.student_info.chatrooms,
                  },
               },
            },
         },
         ReturnValues: 'NONE',
      };

      this.databaseUtils.updateItem(params);
   };

   public updateCampus = async (idToken: string, campus: string): Promise<void> => {
      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: idToken,
            },
         },
         UpdateExpression: 'SET student_info.campus = :cs',
         ExpressionAttributeValues: {
            ':cs': {
               S: campus,
            },
         },
         ReturnValues: 'NONE',
      };

      await this.databaseUtils.updateItem(params);
   };
}
