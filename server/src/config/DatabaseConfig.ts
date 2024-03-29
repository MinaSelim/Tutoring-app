import {CreateTableOutput, CreateTableInput} from 'aws-sdk/clients/dynamodb';
import Dynamo from '../database/dynamo';
import {AWSError} from 'aws-sdk';
import * as config from './DatabaseConfigInfo.json';

export default class DatabaseConfig {
   /**
    * A method that initiates the missing tables of the database on app start.
    */
   public static init = (): Promise<void | (CreateTableOutput | AWSError)[]> => {
      const tablePromises = [] as Promise<CreateTableOutput | AWSError>[];

      for (const table of config.tables) {
         console.log('creating table', table.name);

         const params: CreateTableInput = {
            TableName: table.name,
            KeySchema: [
               {
                  AttributeName: table.partitionKeyName,
                  KeyType: table.partitionKeyType,
               },
            ],
            AttributeDefinitions: [
               {
                  AttributeName: table.partitionKeyName,
                  AttributeType: table.partitionKeyAttributeType,
               },
            ],
            ProvisionedThroughput: {
               // TODO update the RW capacities as needed
               ReadCapacityUnits: 1,
               WriteCapacityUnits: 1,
            },
         };

         if (table.GSI_indexName) {
            params.AttributeDefinitions.push({
               AttributeName: table.GSI_keyName,
               AttributeType: table.GSI_keyAttributeType,
            });

            params.GlobalSecondaryIndexes = [
               {
                  IndexName: table.GSI_indexName,
                  KeySchema: [
                     {
                        AttributeName: table.GSI_keyName,
                        KeyType: table.GSI_keyType,
                     },
                  ],
                  Projection: {
                     ProjectionType: table.GSI_projecttion,
                  },
                  ProvisionedThroughput: {
                     ReadCapacityUnits: 1,
                     WriteCapacityUnits: 1,
                  },
               },
            ];
         }

         tablePromises.push(DatabaseConfig.createTable(params));
      }
      // WARNING - Creates tables in parallel
      return (
         Promise.all(tablePromises)
            // resolves gracefully upon error
            .catch((err: AWSError) => {
               console.error('Initializing of tables failed.\n', err);
               return Promise.resolve();
            })
      );
   };

   /**
    * Creates a table if it doesn't already exist.
    * Note that dynamo only needs KEY attributes to create a table, other
    * non-key attributes can be added during queries.
    * @param params The table create parameters.
    * @returns A promise.
    */
   public static createTable = (params: CreateTableInput): Promise<CreateTableOutput | AWSError> => {
      return Dynamo.getInstance()
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
}
