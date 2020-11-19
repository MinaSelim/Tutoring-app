import AWS from 'aws-sdk';
import * as config from '../config/DatabaseConfigInfo.json';

/**
 * The singleton class that manages the dynamo db API
 */
class Dynamo {
   private static instance: AWS.DynamoDB;

   /**
    * The Singleton's constructor.
    */
   // eslint-disable-next-line @typescript-eslint/no-empty-function
   private constructor() {}

   /**
    * Function that returns the instance of the database to use.
    * @returns An instance of the dynamo DB api.
    */
   public static getInstance(): AWS.DynamoDB {
      if (!Dynamo.instance) {
         AWS.config.update({region: config.aws.REGION});
         Dynamo.instance = new AWS.DynamoDB({apiVersion: config.aws.APIVERSION, endpoint: config.aws.ENDPOINT});
      }
      return Dynamo.instance;
   }
}

export default Dynamo;
