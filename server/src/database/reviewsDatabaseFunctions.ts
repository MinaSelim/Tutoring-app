import IReview from '../models/IReview';
import DatabaseUtils from '../database/databaseUtils';
import * as dbConfig from '../config/DatabaseConfigInfo.json';
import {PutItemInput, PutItemOutput, QueryInput, QueryOutput} from 'aws-sdk/clients/dynamodb';

export default class ReviewDatabaseFunctions {
   private databaseUtils: DatabaseUtils;

   constructor() {
      this.databaseUtils = DatabaseUtils.getInstance();
   }

   public addReviewToDatabase = async (review: IReview): Promise<PutItemOutput> => {
      if (!review.reviewText) {
         review.reviewText = '';
      }

      const params: PutItemInput = {
         Item: {
            reviewId: {
               S: review.studentId + review.tutorId + review.timestamp,
            },
            studentId: {
               S: review.studentId,
            },
            tutorId: {
               S: review.tutorId,
            },
            reviewText: {
               S: review.reviewText,
            },
            communicationRating: {
               // dynamo likes to send numbers to the db as strings (don't ask)
               N: String(review.communicationRating),
            },
            knowledgeRating: {
               N: String(review.knowledgeRating),
            },
            wouldTakeAgainRating: {
               N: String(review.wouldTakeAgainRating),
            },
            timestamp: {
               S: review.timestamp,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: dbConfig.tableNames.REVIEWS,
      };
      return await this.databaseUtils.putItem(params);
   };

   public getTutorReviews = async (tutorId: string): Promise<IReview[]> => {
      const params: QueryInput = {
         TableName: dbConfig.tableNames.REVIEWS,
         IndexName: dbConfig.indexNames.REVIEWS_TUTOR_ID_INDEX,
         KeyConditionExpression: 'tutorId = :tid',
         ExpressionAttributeValues: {
            ':tid': {
               S: tutorId,
            },
         },
      };

      const data: QueryOutput = await this.databaseUtils.query(params);
      const reviews: IReview[] = [];
      data.Items.forEach((item) => {
         reviews.push({
            reviewId: item.reviewId.S,
            studentId: item.studentId.S,
            tutorId: item.tutorId.S,
            reviewText: item.reviewText.S,
            communicationRating: parseInt(item.communicationRating.N),
            knowledgeRating: parseInt(item.knowledgeRating.N),
            wouldTakeAgainRating: parseInt(item.wouldTakeAgainRating.N),
            timestamp: item.timestamp.S,
         });
      });

      return reviews;
   };
}
