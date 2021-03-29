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
   QueryInput,
   QueryOutput,
   ScanInput,
   ScanOutput,
} from 'aws-sdk/clients/dynamodb';
import IReview from '../../src/models/IReview';
import IStudent from '../../src/models/IStudent';
import ITutor from '../../src/models/ITutor';
import IUser from '../../src/models/IUser';
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
   indexNames: {
      REVIEWS_TUTOR_ID_INDEX: 'tutorId_index',
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
   is_validated: true,
   phone: 'string',
   student_info: {
      campus: 'string',
      chatrooms: ['string'],
      stripe_customer_id: 'string',
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
   is_validated: true,
   phone: 'string',
   tutor_info: {
      campuses: ['string'],
      chatrooms: ['string'],
      overallRating: 0,
      numberOfReviews: 0,
      classes: ['string'],
      last_seen: 'string',
      stripe_account_id: 'string',
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
      stripe_account_id: 'string',
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
      is_validated: {BOOL: studentDefined.is_validated},
      firebase_uid: {S: studentDefined.firebase_uid},
      profileImage: {S: studentDefined.profileImage},
      phone: {S: studentDefined.phone},
      student_info: {
         M: {
            campus: {S: studentDefined.student_info.campus},
            chatrooms: {SS: studentDefined.student_info.chatrooms},
            stripe_customer_id: {S: studentDefined.student_info.stripe_customer_id},
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
      is_validated: {BOOL: studentStripeUndefined.is_validated},
      firebase_uid: {S: studentStripeUndefined.firebase_uid},
      profileImage: {S: studentStripeUndefined.profileImage},
      phone: {S: studentStripeUndefined.phone},
      student_info: {
         M: {
            campus: {S: studentStripeUndefined.student_info.campus},
            chatrooms: {SS: studentStripeUndefined.student_info.chatrooms},
            stripe_customer_id: {S: ''},
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
      is_validated: {BOOL: false},
      firebase_uid: {S: studentValidUndefined.firebase_uid},
      profileImage: {S: studentValidUndefined.profileImage},
      phone: {S: studentValidUndefined.phone},
      student_info: {
         M: {
            campus: {S: studentValidUndefined.student_info.campus},
            chatrooms: {SS: studentValidUndefined.student_info.chatrooms},
            stripe_customer_id: {S: ''},
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
      is_validated: {BOOL: false},
      profileImage: {S: ''},
      phone: {S: ''},
      student_info: {
         M: {
            campus: {S: studentIncomplete.student_info.campus},
            chatrooms: {SS: studentIncomplete.student_info.chatrooms},
            stripe_customer_id: {S: ''},
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
            stripe_account_id: {S: tutorDefined.tutor_info.stripe_account_id},
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
            stripe_account_id: {S: tutorDefined.tutor_info.stripe_account_id},
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
      profileImage: {S: studentDefined.profileImage},
      phone: {S: studentDefined.phone},
      student_info: {
         M: {
            campus: {S: studentDefined.student_info.campus},
            chatrooms: {SS: studentDefined.student_info.chatrooms},
            stripe_customer_id: {S: studentDefined.student_info.stripe_customer_id},
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
            stripe_account_id: {S: tutorDefined.tutor_info.stripe_account_id},
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
// Update student variables
// --------------------------------------------

export const updateUser: IUser = {
   email: 'updateEmail',
   is_validated: true,
   firebase_uid: 'updateFID',
   first_name: 'updateFirst',
   last_name: 'updateLast',
   profileImage: 'updateImg',
   phone: 'updatePhone',
};

export const updateItemInputUpdateUser: UpdateItemInput = {
   TableName: databaseConfig.tableNames.USER,
   Key: {firebase_uid: {S: updateUser.firebase_uid}},
   UpdateExpression: 'SET first_name = :fn, last_name = :ln, profileImage = :pi, phone = :ph',
   ExpressionAttributeValues: {
      ':fn': {S: updateUser.first_name},
      ':ln': {S: updateUser.last_name},
      ':pi': {S: updateUser.profileImage},
      ':ph': {S: updateUser.phone},
   },
   ReturnValues: 'ALL_NEW',
};

export const updateItemOutputUpdateUser: UpdateItemOutput = {
   Attributes: {
      first_name: {S: updateUser.first_name},
      last_name: {S: updateUser.last_name},
      email: {S: updateUser.email},
      is_validated: {BOOL: updateUser.is_validated},
      firebase_uid: {S: updateUser.firebase_uid},
      profileImage: {S: updateUser.profileImage},
      phone: {S: updateUser.phone},
   },
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const updateItemOutputUpdateUserResolves = ({
   promise() {
      return Promise.resolve(updateItemOutputUpdateUser);
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

// --------------------------------------------
// Review variables
// --------------------------------------------

export const review0Rating: IReview = {
   reviewId: 'string',
   studentId: 'string',
   tutorId: 'string',
   reviewText: 'string',
   communicationRating: 0,
   knowledgeRating: 0,
   wouldTakeAgainRating: 0,
   timestamp: 'string',
};

export const putItemInputReviews: PutItemInput = {
   Item: {
      reviewId: {S: review0Rating.studentId + review0Rating.tutorId + review0Rating.timestamp},
      studentId: {S: review0Rating.studentId},
      tutorId: {S: review0Rating.tutorId},
      reviewText: {S: review0Rating.reviewText},
      communicationRating: {N: String(review0Rating.communicationRating)},
      knowledgeRating: {N: String(review0Rating.knowledgeRating)},
      wouldTakeAgainRating: {N: String(review0Rating.wouldTakeAgainRating)},
      timestamp: {S: review0Rating.timestamp},
   },
   ReturnConsumedCapacity: 'TOTAL',
   TableName: databaseConfig.tableNames.REVIEWS,
};

export const updateItemReview: UpdateItemInput = {
   TableName: databaseConfig.tableNames.USER,
   Key: {firebase_uid: {S: review0Rating.tutorId}},
   UpdateExpression: 'SET tutor_info.overallRating = :or, tutor_info.numberOfReviews = :nr',
   ExpressionAttributeValues: {
      ':or': {N: String(0)},
      ':nr': {N: String(tutorDefined.tutor_info.numberOfReviews + 1)},
   },
   ReturnValues: 'NONE',
};

export const getItemInputReviews: GetItemInput = {
   TableName: databaseConfig.tableNames.USER,
   Key: {firebase_uid: {S: review0Rating.tutorId}},
   ProjectionExpression: 'tutor_info.overallRating, tutor_info.numberOfReviews',
};

export const queryReviews: QueryInput = {
   TableName: databaseConfig.tableNames.REVIEWS,
   IndexName: databaseConfig.indexNames.REVIEWS_TUTOR_ID_INDEX,
   KeyConditionExpression: 'tutorId = :tid',
   ExpressionAttributeValues: {':tid': {S: tutorDefined.firebase_uid}},
};

// --------------------------------------------
// OUTPUT
export const putItemOutputReviews: PutItemOutput = {
   ConsumedCapacity: {TableName: databaseConfig.tableNames.REVIEWS, CapacityUnits: 1},
};

export const getItemOutputReviews: GetItemOutput = {
   Item: {
      tutor_info: {
         M: {
            overallRating: {N: String(tutorDefined.tutor_info.overallRating)},
            numberOfReviews: {N: String(tutorDefined.tutor_info.numberOfReviews)},
         },
      },
   },
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const updateItemOutputReview: UpdateItemOutput = {
   Attributes: {
      tutor_info: {
         M: {
            overallRating: {N: String(0)},
            numberOfReviews: {N: String(tutorDefined.tutor_info.numberOfReviews + 1)},
         },
      },
   },
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const queryOutputReviews: QueryOutput = {
   Items: [
      {
         reviewId: {S: review0Rating.reviewId},
         studentId: {S: review0Rating.studentId},
         tutorId: {S: review0Rating.tutorId},
         reviewText: {S: review0Rating.reviewText},
         communicationRating: {N: String(review0Rating.communicationRating)},
         knowledgeRating: {N: String(review0Rating.knowledgeRating)},
         wouldTakeAgainRating: {N: String(review0Rating.wouldTakeAgainRating)},
         timestamp: {S: review0Rating.timestamp},
      },
   ],
   ConsumedCapacity: {TableName: databaseConfig.tableNames.REVIEWS, CapacityUnits: 1},
};
// --------------------------------------------
// PROMISE CONVERSION
export const putItemOutputReviewsResolves = ({
   promise() {
      return Promise.resolve(putItemOutputReviews);
   },
} as unknown) as AWS.Request<PutItemOutput, AWSError>;

export const putItemOutputReviewsRejects = ({
   promise() {
      return Promise.reject(awsError);
   },
} as unknown) as AWS.Request<PutItemOutput, AWSError>;

export const getItemReviewResolves = ({
   promise() {
      return Promise.resolve(getItemOutputReviews);
   },
} as unknown) as AWS.Request<GetItemOutput, AWSError>;

export const updateItemOutputReviewsResolves = ({
   promise() {
      return Promise.resolve(updateItemOutputReview);
   },
} as unknown) as AWS.Request<UpdateItemOutput, AWSError>;

export const queryReviewsResovles = ({
   promise() {
      return Promise.resolve(queryOutputReviews);
   },
} as unknown) as AWS.Request<QueryOutput, AWSError>;

export const queryReviewsRejects = ({
   promise() {
      return Promise.reject(awsError);
   },
} as unknown) as AWS.Request<QueryOutput, AWSError>;

// --------------------------------------------
// SEARCH MANAGER VARIABLES
// --------------------------------------------
export const searchConstants = {CAMPUS: 'campus', CLASSCODE: 'classCode'};

export const scanInputSearchTutor: ScanInput = {
   TableName: databaseConfig.tableNames.USER,
   FilterExpression:
      'attribute_exists(tutor_info) and contains(tutor_info.campuses, :cm) and contains(tutor_info.classes, :cl)',
   ExpressionAttributeValues: {
      ':cm': {S: searchConstants.CAMPUS},
      ':cl': {S: searchConstants.CLASSCODE},
   },
};

export const scanOutputSearchTutors: ScanOutput = {
   Items: [
      {
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
   ],
   ConsumedCapacity: {TableName: databaseConfig.tableNames.USER, CapacityUnits: 1},
};

export const scanOuputSearchTutorResolves = ({
   promise() {
      return Promise.resolve(scanOutputSearchTutors);
   },
} as unknown) as AWS.Request<ScanOutput, AWSError>;

export const scanOuputSearchTutorRejects = ({
   promise() {
      return Promise.reject(awsError);
   },
} as unknown) as AWS.Request<ScanOutput, AWSError>;
