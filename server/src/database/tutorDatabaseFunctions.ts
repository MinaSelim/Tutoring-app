import ITutor from '../models/ITutor';
import {GetItemOutput, PutItemInput, UpdateItemInput, UpdateItemOutput} from 'aws-sdk/clients/dynamodb';
import IUser from 'src/models/IUser';
import UserDatabaseFunctions from './userDatabaseFunctions';

export default class TutorDatabaseFunctions extends UserDatabaseFunctions {
   protected fillSpecificUserData = (user: IUser): IUser => {
      const tutor: ITutor = user as ITutor;

      if (!tutor.tutor_info.campuses) {
         tutor.tutor_info.campuses = [];
      }

      if (!tutor.tutor_info.chatrooms) {
         tutor.tutor_info.chatrooms = []
      }

      return tutor;
   };

   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const tutor: ITutor = user as ITutor;

      params.Item.tutor_info = {
         M: {
            campus: {
               SS: tutor.tutor_info.campuses,
            },
            chatrooms: {
               SS: tutor.tutor_info.chatrooms
            }
         }
      };

      return params;
   };

   protected addSpecificUserProperties = (user: IUser, data: GetItemOutput): IUser => {
      const tutor: ITutor = user as ITutor;

      tutor.tutor_info = {
         campuses: data.Item.tutor_info.M.campus.SS,
         chatrooms: data.Item.tutor_info.M.chatrooms.SS,
      }
      
      return tutor;
   };

   // update template methods 
   protected addSpecificUserUpdateParams = (user: IUser, params: UpdateItemInput): UpdateItemInput => {
      return params;
   };

   protected mapSpecificUpdateAttributes = (user: IUser, returnData: UpdateItemOutput): IUser => {
      return user;
   };


}
