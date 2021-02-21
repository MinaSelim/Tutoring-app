import ITutor from '../models/ITutor';
import IReview from '../models/IReview';
import {GetItemInput, GetItemOutput, PutItemInput, UpdateItemInput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import IUser from 'src/models/IUser';
import UserDatabaseFunctions from './userDatabaseFunctions';
import * as config from '../config/DatabaseConfigInfo.json';
import ReviewDatabaseFunctions from './reviewsDatabaseFunctions';

export default class TutorDatabaseFunctions extends UserDatabaseFunctions {
   private reviewDatabaseFunctions: ReviewDatabaseFunctions;

   constructor() {
      super();
      this.reviewDatabaseFunctions = new ReviewDatabaseFunctions();
   }
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

   public updateOverallRating = async (tutorId: string): Promise<void> => {
      const communcationRatingWeight = 0.25;
      const knowledgeRatingWeight = 0.25;
      const wouldTakeAgainRatingWeight = 0.5;

      const reviews: IReview[] = await this.reviewDatabaseFunctions.getTutorReviews(tutorId);

      let weightedRatingsSum = 0;
      reviews.forEach((review) => {
         weightedRatingsSum += communcationRatingWeight * review.communicationRating;
         weightedRatingsSum += knowledgeRatingWeight * review.knowledgeRating;
         weightedRatingsSum += wouldTakeAgainRatingWeight * review.wouldTakeAgainRating;
      });
      const overallRating = weightedRatingsSum / reviews.length;

      const params: UpdateItemInput = {
         TableName: config.tableNames.USER,
         Key: {
            firebase_uid: {
               S: tutorId,
            },
         },
         UpdateExpression: 'SET overallRating = :or',
         ExpressionAttributeValues: {
            ':or': {
               N: String(overallRating),
            },
         },
         ReturnValues: 'NONE',
      };

      await this.databaseUtils.updateItem(params);
   };
}
