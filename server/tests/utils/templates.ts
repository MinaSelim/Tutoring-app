import {AWSError} from 'aws-sdk';
import {
   CreateTableInput,
   CreateTableOutput,
   GetItemInput,
   GetItemOutput,
   PutItemInput,
   PutItemOutput,
   UpdateItemInput,
   UpdateItemOutput,
} from 'aws-sdk/clients/dynamodb';
import IStudent from '../../src/models/IStudent';
import ITutor from '../../src/models/ITutor';
/*
 * A file with all variable templates to be reused through multiple tests.
 * Please keep template ordered based on origin of variables
 */

// --------------------------------------------
// Databse config variables
// --------------------------------------------
export const databaseConfig = {
   tableNames: {
      USER: 'User',
      REVIEWS: 'Reviews',
   },
};

// --------------------------------------------
// Student variables
// --------------------------------------------

export const studentDefined: IStudent = {
   first_name: 'string',
   last_name: 'string',
   email: 'string',
   profileImage: 'string',
   firebase_uid: 'string',
   stripe_customer_id: 'string',
   is_validated: true,
   phone: 'string',
   student_info: {
      campus: 'string',
      chatrooms: ['string'],
   },
};

export const studentStripeUndefined: IStudent = {
   first_name: 'string',
   last_name: 'string',
   email: 'string',
   profileImage: 'string',
   firebase_uid: 'string',
   is_validated: true,
   phone: 'string',
   student_info: {
      campus: 'string',
      chatrooms: ['string'],
   },
};

export const studentValidUndefined: IStudent = {
   first_name: 'string',
   last_name: 'string',
   email: 'string',
   profileImage: 'string',
   firebase_uid: 'string',
   phone: 'string',
   student_info: {
      campus: 'string',
      chatrooms: ['string'],
   },
};

export const studentIncomplete: IStudent = {
   first_name: 'string',
   last_name: 'string',
   email: 'string',
   firebase_uid: 'string',
   student_info: {
      campus: 'string',
      chatrooms: ['string'],
   },
};

// --------------------------------------------
// Tutor variables
// --------------------------------------------
export const tutorDefined: ITutor = {
   first_name: 'string',
   last_name: 'string',
   email: 'string',
   profileImage: 'string',
   firebase_uid: 'string',
   stripe_customer_id: 'string',
   is_validated: true,
   phone: 'string',
   tutor_info: {
      campuses: ['string'],
      chatrooms: ['string'],
      overallRating: 0,
      numberOfReviews: 0,
      classes: ['string'],
      last_seen: 'string',
   },
};

export const tutorIncomplete: ITutor = {
   first_name: 'string',
   last_name: 'string',
   email: 'string',
   firebase_uid: 'string',
   tutor_info: {
      campuses: ['string'],
      chatrooms: ['string'],
      overallRating: 0,
      numberOfReviews: 0,
      classes: ['string'],
      last_seen: 'string',
   },
};

// --------------------------------------------
// AWS error variables
// --------------------------------------------

export const awsError: AWSError = {
   code: 'badRequest',
   message: 'bad request',
   retryable: false,
   statusCode: 1,
   time: new Date(),
   name: '',
   hostname: '',
   region: '',
   retryDelay: 1,
   requestId: '',
   extendedRequestId: '',
   cfId: '',
};

export const awsErrorTableExists: AWSError = {
   code: 'ResourceInUseException',
   message: 'ResourceInUseException',
   retryable: false,
   statusCode: 1,
   time: new Date(),
   name: '',
   hostname: '',
   region: '',
   retryDelay: 1,
   requestId: '',
   extendedRequestId: '',
   cfId: '',
};

// --------------------------------------------
// AWS create table variables
// --------------------------------------------

// INPUT
export const createTableInputTemplate: CreateTableInput = {
   AttributeDefinitions: [{AttributeName: 'test', AttributeType: 'S'}],
   KeySchema: [{AttributeName: 'test', KeyType: 'HASH'}],
   ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
   TableName: databaseConfig.tableNames.USER,
};

// --------------------------------------------
// OUTPUT
export const createTableOutput: CreateTableOutput = {
   TableDescription: {
      TableName: databaseConfig.tableNames.USER,
   },
};

// --------------------------------------------
// PROMISE CONVERSION
export const outputCreateTableResolves: AWS.Request<CreateTableOutput, AWSError> = ({
   promise() {
      return Promise.resolve(createTableOutput);
   },
} as unknown) as AWS.Request<CreateTableOutput, AWSError>;

export const outputCreateTableRejectsBasicError = ({
   promise() {
      return Promise.reject(awsError);
   },
} as unknown) as AWS.Request<CreateTableOutput, AWSError>;

export const outputCreateTableRejectsTableExistError = ({
   promise() {
      return Promise.reject(awsErrorTableExists);
   },
} as unknown) as AWS.Request<CreateTableOutput, AWSError>;

// --------------------------------------------
// AWS put item variables
// --------------------------------------------
// INPUT
export const putItemStudentDefined: PutItemInput = {
   Item: {
      first_name: {S: studentDefined.first_name},
      last_name: {S: studentDefined.last_name},
      email: {S: studentDefined.email},
      stripe_customer_id: {S: studentDefined.stripe_customer_id},
      is_validated: {BOOL: studentDefined.is_validated},
      firebase_uid: {S: studentDefined.firebase_uid},
      profileImage: {S: studentDefined.profileImage},
      phone: {S: studentDefined.phone},
      student_info: {
         M: {
            campus: {S: studentDefined.student_info.campus},
            chatrooms: {SS: studentDefined.student_info.chatrooms},
         },
      },
   },
   ReturnConsumedCapacity: 'TOTAL',
   TableName: databaseConfig.tableNames.USER,
};

export const putItemInputStudentStripeUndefined: PutItemInput = {
   Item: {
      first_name: {S: studentStripeUndefined.first_name},
      last_name: {S: studentStripeUndefined.last_name},
      email: {S: studentStripeUndefined.email},
      stripe_customer_id: {S: ''},
      is_validated: {BOOL: studentStripeUndefined.is_validated},
      firebase_uid: {S: studentStripeUndefined.firebase_uid},
      profileImage: {S: studentStripeUndefined.profileImage},
      phone: {S: studentStripeUndefined.phone},
      student_info: {
         M: {
            campus: {S: studentStripeUndefined.student_info.campus},
            chatrooms: {SS: studentStripeUndefined.student_info.chatrooms},
         },
      },
   },
   ReturnConsumedCapacity: 'TOTAL',
   TableName: databaseConfig.tableNames.USER,
};

export const putItemInputStudentValidUndefined: PutItemInput = {
   Item: {
      first_name: {S: studentValidUndefined.first_name},
      last_name: {S: studentValidUndefined.last_name},
      email: {S: studentValidUndefined.email},
      stripe_customer_id: {S: ''},
      is_validated: {BOOL: false},
      firebase_uid: {S: studentValidUndefined.firebase_uid},
      profileImage: {S: studentValidUndefined.profileImage},
      phone: {S: studentValidUndefined.phone},
      student_info: {
         M: {
            campus: {S: studentValidUndefined.student_info.campus},
            chatrooms: {SS: studentValidUndefined.student_info.chatrooms},
         },
      },
   },
   ReturnConsumedCapacity: 'TOTAL',
   TableName: databaseConfig.tableNames.USER,
};

export const putItemInputStudentIncomplete: PutItemInput = {
   Item: {
      first_name: {S: studentIncomplete.first_name},
      last_name: {S: studentIncomplete.last_name},
      email: {S: studentIncomplete.email},
      firebase_uid: {S: studentIncomplete.firebase_uid},
      stripe_customer_id: {S: ''},
      is_validated: {BOOL: false},
      profileImage: {S: ''},
      phone: {S: ''},
      student_info: {
         M: {
            campus: {S: studentIncomplete.student_info.campus},
            chatrooms: {SS: studentIncomplete.student_info.chatrooms},
         },
      },
   },
   ReturnConsumedCapacity: 'TOTAL',
   TableName: databaseConfig.tableNames.USER,
};

export const putItemInputTutorDefined: PutItemInput = {
   Item: {
      first_name: {S: tutorDefined.first_name},
      last_name: {S: tutorDefined.last_name},
      email: {S: tutorDefined.email},
      stripe_customer_id: {S: tutorDefined.stripe_customer_id},
      is_validated: {BOOL: tutorDefined.is_validated},
      firebase_uid: {S: tutorDefined.firebase_uid},
      profileImage: {S: tutorDefined.profileImage},
      phone: {S: tutorDefined.phone},
      tutor_info: {
         M: {
            campuses: {SS: tutorDefined.tutor_info.campuses},
            chatrooms: {SS: tutorDefined.tutor_info.chatrooms},
            last_seen: {S: tutorDefined.tutor_info.last_seen},
            overallRating: {N: String(tutorDefined.tutor_info.overallRating)},
            numberOfReviews: {N: String(tutorDefined.tutor_info.numberOfReviews)},
            classes: {SS: tutorDefined.tutor_info.classes},
         },
      },
   },
   ReturnConsumedCapacity: 'TOTAL',
   TableName: databaseConfig.tableNames.USER,
};

export const putItemInputTutorIncomplete: PutItemInput = {
   Item: {
      first_name: {S: tutorIncomplete.first_name},
      last_name: {S: tutorIncomplete.last_name},
      email: {S: tutorIncomplete.email},
      firebase_uid: {S: tutorIncomplete.firebase_uid},
      stripe_customer_id: {S: ''},
      is_validated: {BOOL: false},
      profileImage: {S: ''},
      phone: {S: ''},
      tutor_info: {
         M: {
            campuses: {SS: tutorDefined.tutor_info.campuses},
            chatrooms: {SS: tutorDefined.tutor_info.chatrooms},
            last_seen: {S: tutorDefined.tutor_info.last_seen},
            overallRating: {N: String(tutorDefined.tutor_info.overallRating)},
            numberOfReviews: {N: String(tutorDefined.tutor_info.numberOfReviews)},
            classes: {SS: tutorDefined.tutor_info.classes},
         },
      },
   },
   ReturnConsumedCapacity: 'TOTAL',
   TableName: databaseConfig.tableNames.USER,
};

// --------------------------------------------
// OUTPUT
export const putItemOutput: PutItemOutput = {
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

// --------------------------------------------
// PROMISE CONVERSION
export const putItemOutputResolves = ({
   promise() {
      return Promise.resolve(putItemOutput);
   },
} as unknown) as AWS.Request<PutItemOutput, AWSError>;

export const putItemOutputRejects = ({
   promise() {
      return Promise.reject(awsError);
   },
} as unknown) as AWS.Request<PutItemOutput, AWSError>;

// --------------------------------------------
// AWS get item variables
// --------------------------------------------
// INPUT
export const getItemInputStudentDefined: GetItemInput = {
   Key: {firebase_uid: {S: studentDefined.firebase_uid}},
   TableName: databaseConfig.tableNames.USER,
};

export const getItemInputTutorDefined: GetItemInput = {
   Key: {firebase_uid: {S: tutorDefined.firebase_uid}},
   TableName: databaseConfig.tableNames.USER,
};
// --------------------------------------------
// OUTPUT
export const getItemStudentDefined: GetItemOutput = {
   Item: {
      first_name: {S: studentDefined.first_name},
      last_name: {S: studentDefined.last_name},
      email: {S: studentDefined.email},
      is_validated: {BOOL: studentDefined.is_validated},
      firebase_uid: {S: studentDefined.firebase_uid},
      stripe_customer_id: {S: studentDefined.stripe_customer_id},
      profileImage: {S: studentDefined.profileImage},
      phone: {S: studentDefined.phone},
      student_info: {
         M: {
            campus: {S: studentDefined.student_info.campus},
            chatrooms: {SS: studentDefined.student_info.chatrooms},
         },
      },
   },
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const getItemTutorDefined: GetItemOutput = {
   Item: {
      first_name: {S: tutorDefined.first_name},
      last_name: {S: tutorDefined.last_name},
      email: {S: tutorDefined.email},
      is_validated: {BOOL: tutorDefined.is_validated},
      firebase_uid: {S: tutorDefined.firebase_uid},
      stripe_customer_id: {S: tutorDefined.stripe_customer_id},
      profileImage: {S: tutorDefined.profileImage},
      phone: {S: tutorDefined.phone},
      tutor_info: {
         M: {
            campuses: {SS: tutorDefined.tutor_info.campuses},
            chatrooms: {SS: tutorDefined.tutor_info.chatrooms},
            last_seen: {S: tutorDefined.tutor_info.last_seen},
            overallRating: {N: String(tutorDefined.tutor_info.overallRating)},
            numberOfReviews: {N: String(tutorDefined.tutor_info.numberOfReviews)},
            classes: {SS: tutorDefined.tutor_info.classes},
         },
      },
   },
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

// --------------------------------------------
// PROMISE CONVERSION
export const getItemStudentDefinedResolves = ({
   promise() {
      return Promise.resolve(getItemStudentDefined);
   },
} as unknown) as AWS.Request<GetItemOutput, AWSError>;

export const getItemTutorDefinedResolves = ({
   promise() {
      return Promise.resolve(getItemTutorDefined);
   },
} as unknown) as AWS.Request<GetItemOutput, AWSError>;

export const getItemRejects = ({
   promise() {
      return Promise.reject(awsError);
   },
} as unknown) as AWS.Request<GetItemOutput, AWSError>;

// --------------------------------------------
// Chatroom variables
// --------------------------------------------
export const getItemInputChatroomStudentDefined: GetItemInput = {
   Key: {firebase_uid: {S: studentDefined.firebase_uid}},
   ProjectionExpression: 'student_info.chatrooms',
   TableName: databaseConfig.tableNames.USER,
};

export const getItemInputChatroomTutorDefined: GetItemInput = {
   Key: {firebase_uid: {S: tutorDefined.firebase_uid}},
   ProjectionExpression: 'tutor_info.chatrooms',
   TableName: databaseConfig.tableNames.USER,
};

export const getItemOutputChatroomStudent: GetItemOutput = {
   Item: {student_info: {M: {chatrooms: {SS: studentDefined.student_info.chatrooms}}}},
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const getItemOutputChatroomTutor: GetItemOutput = {
   Item: {tutor_info: {M: {chatrooms: {SS: tutorDefined.tutor_info.chatrooms}}}},
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const getItemChatroomStudentResolves = ({
   promise() {
      return Promise.resolve(getItemOutputChatroomStudent);
   },
} as unknown) as AWS.Request<GetItemOutput, AWSError>;

export const getItemChatroomTutorResolves = ({
   promise() {
      return Promise.resolve(getItemOutputChatroomTutor);
   },
} as unknown) as AWS.Request<GetItemOutput, AWSError>;

// todo what is chat id?
export const updateItemInputChatroom: UpdateItemInput = {
   TableName: databaseConfig.tableNames.USER,
   Key: {firebase_uid: {S: studentDefined.firebase_uid}},
   UpdateExpression: 'ADD student_info.chatrooms :cr',
   ExpressionAttributeValues: {':cr': {SS: ['chadId']}},
   ReturnValues: 'UPDATED_NEW',
};

export const updateItemInputDeleteChatroom: UpdateItemInput = {
   TableName: databaseConfig.tableNames.USER,
   Key: {firebase_uid: {S: studentDefined.firebase_uid}},
   UpdateExpression: 'DELETE student_info.chatrooms :cr',
   ExpressionAttributeValues: {':cr': {SS: ['chadId']}},
   ReturnValues: 'UPDATED_NEW',
};

export const updateItemOutputStudentChatroom: UpdateItemOutput = {
   Attributes: {
      student_info: {M: {chatrooms: {SS: studentDefined.student_info.chatrooms}}},
   },
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const updateItemOutputTutorChatroom: UpdateItemOutput = {
   Attributes: {
      tutor_info: {M: {chatrooms: {SS: tutorDefined.tutor_info.chatrooms}}},
   },
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const updateItemOutputStudentChatroomResolves = ({
   promise() {
      return Promise.resolve(updateItemOutputStudentChatroom);
   },
} as unknown) as AWS.Request<UpdateItemOutput, AWSError>;

export const updateItemOutputTutorChatroomResolves = ({
   promise() {
      return Promise.resolve(updateItemOutputTutorChatroom);
   },
} as unknown) as AWS.Request<UpdateItemOutput, AWSError>;

export const updateItemOutputRejects = ({
   promise() {
      return Promise.reject(awsError);
   },
} as unknown) as AWS.Request<UpdateItemOutput, AWSError>;

// --------------------------------------------
// Firebase variables
// --------------------------------------------

export const firebaseConfig = {
   apiKey: 'Api Key',
   authDomain: 'Domain',
   databaseURL: 'URL',
   projectId: 'ID',
};
