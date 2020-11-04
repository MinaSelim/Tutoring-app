// TODO: refactor db into tables for users, students, and tutors

import IStudent from '../models/IStudent';
import ITutor from '../models/ITutor';
import {
   GetItemInput,
   GetItemOutput,
   PutItemInput,
   PutItemOutput,
   CreateTableOutput,
   CreateTableInput,
} from 'aws-sdk/clients/dynamodb';
import Dynamo from './dynamo';
import {AWSError} from 'aws-sdk';
import * as config from './config.json';

export default class Database {
   private dynamo: AWS.DynamoDB = Dynamo.getInstance();

   /**
    * A method that initiates the missing tables of the database on app start.
    */
   public init = (): Promise<void | (CreateTableOutput | AWSError)[]> => {
      const tablePromises = [] as Promise<CreateTableOutput | AWSError>[];

      for (const table of config.tables) {
         const params = {
            AttributeDefinitions: [
               {
                  AttributeName: table.keyName,
                  AttributeType: table.keyType,
               },
            ],
            KeySchema: [
               {
                  AttributeName: table.keyName,
                  KeyType: table.KeyType,
               },
            ],
            ProvisionedThroughput: {
               // TODO update the RW capacities as needed
               ReadCapacityUnits: 1,
               WriteCapacityUnits: 1,
            },
            TableName: table.name,
         };

         tablePromises.push(this.createTable(params));
      }
      // WARNING - Creates tables in parallel
      return Promise.all(tablePromises).catch((err: AWSError) => {
         console.error('Initializing of tables failed.\n', err);
         return Promise.resolve();
      });
   };

   /**
    * Adds a student to the database
    * @param student Student to add
    * @returns A promise.
    */
   public addStudentInUserCollection = (student: IStudent): Promise<PutItemOutput> => {
      // Create deep copy to modify without affecting input student
      const tempUser = {...student};

      if (!student.is_validated) {
         tempUser.is_validated = false;
      }

      if (!student.stripe_customer_id) {
         tempUser.stripe_customer_id = '';
      }

      if (!student.profileImage) {
         tempUser.profileImage = '';
      }

      if (!student.phone) {
         tempUser.phone = '';
      }

      const params: PutItemInput = {
         Item: {
            first_name: {
               S: tempUser.first_name,
            },
            last_name: {
               S: tempUser.last_name,
            },
            email: {
               S: tempUser.email,
            },
            stripe_customer_id: {
               S: tempUser.stripe_customer_id,
            },
            is_validated: {
               BOOL: tempUser.is_validated,
            },
            firebase_uid: {
               S: tempUser.firebase_uid,
            },
            campus: {
               S: tempUser.campus,
            },
            profileImage: {
               S: tempUser.profileImage,
            },
            phone: {
               S: tempUser.phone,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: config.tableNames.USER,
      };
      return this.putItem(params);
   };

   /**
    * Adds a tutor to the database
    * @param tutor Tutor to add
    * @returns A promise.
    */
   public addTutorInUserCollection = (tutor: ITutor): Promise<PutItemOutput> => {
      // Create deep copy to modify without affecting input tutor
      const tempUser = {...tutor};

      if (!tutor.is_validated) {
         tempUser.is_validated = false;
      }

      if (!tutor.stripe_customer_id) {
         tempUser.stripe_customer_id = '';
      }

      if (!tutor.profileImage) {
         tempUser.profileImage = '';
      }

      if (!tutor.campuses) {
         tempUser.campuses = '';
      }

      if (!tutor.phone) {
         tempUser.phone = '';
      }

      const params: PutItemInput = {
         Item: {
            first_name: {
               S: tempUser.first_name,
            },
            last_name: {
               S: tempUser.last_name,
            },
            email: {
               S: tempUser.email,
            },
            stripe_customer_id: {
               S: tempUser.stripe_customer_id,
            },
            is_validated: {
               BOOL: tempUser.is_validated,
            },
            firebase_uid: {
               S: tempUser.firebase_uid,
            },
            campuses: {
               S: tempUser.campuses, // TODO: tutor should be able to have more than one campus
            },
            profileImage: {
               S: tempUser.profileImage,
            },
            phone: {
               S: tempUser.phone,
            },
         },
         ReturnConsumedCapacity: 'TOTAL',
         TableName: config.tableNames.USER,
      };
      return this.putItem(params);
   };

   /**
    * Retreives a student from the database
    * @param id The firebase user ID
    * @returns A promise.
    */
   public getStudentByFirebaseId = (id: string): Promise<IStudent> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         TableName: config.tableNames.USER,
      };
      return this.getItem(params).then(
         (data: GetItemOutput): Promise<IStudent> => {
            const student: IStudent = {
               email: data.Item.email.S,
               is_validated: data.Item.is_validated.BOOL,
               firebase_uid: data.Item.firebase_uid.S,
               stripe_customer_id: data.Item.stripe_customer_id.S,
               first_name: data.Item.first_name.S,
               last_name: data.Item.last_name.S,
               campus: data.Item.campus.S,
               profileImage: data.Item.profileImage.S,
               phone: data.Item.phone.S,
            };
            return Promise.resolve(student);
         },
      );
   };

   /**
    * Retreives a tutor from the database
    * @param id The firebase user ID
    * @returns A promise.
    */
   public getTutorByFirebaseId = (id: string): Promise<ITutor> => {
      const params: GetItemInput = {
         Key: {
            firebase_uid: {
               S: id,
            },
         },
         TableName: config.tableNames.USER,
      };
      return this.getItem(params).then(
         (data: GetItemOutput): Promise<ITutor> => {
            const tutor: ITutor = {
               email: data.Item.email.S,
               is_validated: data.Item.is_validated.BOOL,
               firebase_uid: data.Item.firebase_uid.S,
               stripe_customer_id: data.Item.stripe_customer_id.S,
               first_name: data.Item.first_name.S,
               last_name: data.Item.last_name.S,
               campuses: data.Item.campuses.S,
               profileImage: data.Item.profileImage.S,
               phone: data.Item.phone.S,
            };
            return Promise.resolve(tutor);
         },
      );
   };

   /**
    * Creates a table if it doesn't already exist.
    * Note that dynamo only needs KEY attributes to create a table, other
    * non-key attributes can be added during queries.
    * @param params The table create parameters.
    * @returns A promise.
    */
   public createTable = (params: CreateTableInput): Promise<CreateTableOutput | AWSError> => {
      return this.dynamo
         .createTable(params)
         .promise()
         .catch((err: AWSError) => {
            if (err.code == 'ResourceInUseException') {
               // skip error if table already exists
               console.warn('Table already exists');
               const createTableResponse: CreateTableOutput = {
                  TableDescription: {},
               };
               return Promise.resolve(createTableResponse);
            } else {
               console.error('Failed creating table');
               return Promise.reject(err);
            }
         });
   };

   /**
    * Add an item to a table in dynamo.
    * @param params
    * @returns A promise.
    */
   public putItem = (params: PutItemInput): Promise<PutItemOutput> => {
      return this.dynamo
         .putItem(params)
         .promise()
         .catch((err: AWSError) => {
            console.error('Could not put item in', params.TableName);
            return Promise.reject(err);
         });
   };

   /**
    * Retreive an item from a table in dynamo.
    * @param params
    * @returns A promise.
    */
   public getItem = (params: GetItemInput): Promise<GetItemOutput> => {
      return this.dynamo
         .getItem(params)
         .promise()
         .catch((err: AWSError) => {
            console.error('Could not get item from', params.TableName);
            return Promise.reject(err);
         });
   };
}
