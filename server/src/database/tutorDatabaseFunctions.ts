import ITutor from '../models/ITutor';
import IReview from '../models/IReview';
import {GetItemInput, GetItemOutput, PutItemInput, UpdateItemInput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import IUser from 'src/models/IUser';
import UserDatabaseFunctions from './userDatabaseFunctions';
import * as config from '../config/DatabaseConfigInfo.json';
import RatingWeights from '../config/RatingWeights.json';

export default class TutorDatabaseFunctions extends UserDatabaseFunctions {
   protected fillSpecificUserData = (user: IUser): IUser => {
      const tutor: ITutor = user as ITutor;

      if (tutor.tutor_info.campuses === undefined || tutor.tutor_info.campuses.length == 0) {
         tutor.tutor_info.campuses = [''];
      }

      if (tutor.tutor_info.chatrooms === undefined || tutor.tutor_info.chatrooms.length == 0) {
         tutor.tutor_info.chatrooms = [''];
      }

      if (!tutor.tutor_info.overallRating) {
         tutor.tutor_info.overallRating = 0;
      }

      if (!tutor.tutor_info.numberOfReviews) {
         tutor.tutor_info.numberOfReviews = 0;
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
            overallRating: {
               N: String(tutor.tutor_info.overallRating),
            },
            numberOfReviews: {
               N: String(tutor.tutor_info.numberOfReviews),
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
         overallRating: parseInt(data.Item.tutor_info.M.overallRating.N),
         numberOfReviews: parseInt(data.Item.tutor_info.M.numberOfReviews.N),
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

   public updateOverallRating = async (newReview: IReview): Promise<void> => {
      // get tutor overallRating and numberOfReviews
      const getItemParams: GetItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: newReview.tutorId,
            },
         },
         ProjectionExpression: 'tutor_info.overallRating, tutor_info.numberOfReviews',
      };
      const data: GetItemOutput = await this.databaseUtils.getItem(getItemParams);
      const overallRating = parseFloat(data.Item.tutor_info.M.overallRating.N);
      const numberOfReviews = parseInt(data.Item.tutor_info.M.numberOfReviews.N);

      // compute new weighted ave
      const newRating =
         RatingWeights.Communication * newReview.communicationRating +
         RatingWeights.Knowledge * newReview.knowledgeRating +
         RatingWeights.WouldTakeAgain * newReview.wouldTakeAgainRating;
      const cumulativeMovingAverage = overallRating + (newRating - overallRating) / (numberOfReviews + 1);

      // update tutor overallRating and numberOfReviews
      const updateItemParams: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: newReview.tutorId,
            },
         },
         UpdateExpression: 'SET tutor_info.overallRating = :or, tutor_info.numberOfReviews = :nr',
         ExpressionAttributeValues: {
            ':or': {
               N: String(cumulativeMovingAverage),
            },
            ':nr': {
               N: String(numberOfReviews + 1),
            },
         },
         ReturnValues: 'NONE',
      };
      this.databaseUtils.updateItem(updateItemParams);
   };
}
