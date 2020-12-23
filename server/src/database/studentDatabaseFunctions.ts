import IStudent from '../models/IStudent';
import {GetItemInput, GetItemOutput, PutItemInput, PutItemOutput} from 'aws-sdk/clients/dynamodb';
import * as config from '../config/DatabaseConfigInfo.json';
import DatabaseUtils from './databaseUtils';

export default class studentDatabaseFunctions {
    private dbUtils: DatabaseUtils = DatabaseUtils.getInstance();

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
       return this.dbUtils.putItem(params);
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
       return this.dbUtils.getItem(params).then(
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
 }
 