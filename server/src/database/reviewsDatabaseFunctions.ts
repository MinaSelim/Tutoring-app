import IReview from '../models/IReview';
import DatabaseUtils from '../database/databaseUtils';
import * as dbConfig from '../config/DatabaseConfigInfo.json';
import {PutItemInput, PutItemOutput, QueryInput, QueryOutput} from 'aws-sdk/clients/dynamodb';

export default class ReviewDatabaseFunctions {
   private databaseUtils: DatabaseUtils;

   constructor() {
      this.databaseUtils = DatabaseUtils.getInstance();
   }

   public addReviewToDatabase = (review: IReview): Promise<PutItemOutput> => {
      const params: PutItemInput = {
         Item: {
            reviewId: {
               S: review.studentId + review.timestamp,
            },
            studentId: {
               S: review.studentId,
            },
            tutorId: {
               S: review.tutorId,
            },
            reviewTest: {
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
      return this.databaseUtils.putItem(params);
   };

   // var params = {
   //     TableName : "Movies",
   //     ProjectionExpression:"#yr, title, info.genres, info.actors[0]",
   //     KeyConditionExpression: "#yr = :yyyy and title between :letter1 and :letter2",
   //     ExpressionAttributeNames:{
   //         "#yr": "year"
   //     },
   //     ExpressionAttributeValues: {
   //         ":yyyy": 1992,
   //         ":letter1": "A",
   //         ":letter2": "L"
   //     }
   // };

   // public getTutorReviews(tutorId: string): Promise<QueryOutput => {
   //     const params: QueryInput = {
   //         TableName: dbConfig.tableNames.REVIEWS,
   //         Select: "ALL_ATTRIBUTES",
   //         KeyConditionExpression:

   //     }
   // }
}
