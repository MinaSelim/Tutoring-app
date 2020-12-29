import ITutor from '../models/ITutor';
import {GetItemOutput, PutItemInput} from 'aws-sdk/clients/dynamodb';
import IUser from 'src/models/IUser';
import UserDatabaseFunctions from './userDatabaseFunctions';

export default class TutorDatabaseFunctions extends UserDatabaseFunctions {
   
   protected fillSpecificUserData = (user: IUser): IUser => {
      const tutor:ITutor = user as ITutor;

      if (!tutor.campuses) {
         tutor.campuses = '';
      }

      return tutor;
   };
   
   protected addSpecificUserParams = (user: IUser, params: PutItemInput): PutItemInput => {
      const tutor:ITutor = user as ITutor;
      params.Item.campuses = {
         S: tutor.campuses
      };
      return params;
   };

   protected addSpecificUserProperties = (user: IUser, data: GetItemOutput): IUser => {
      const tutor:ITutor = user as ITutor;
      tutor.campuses = data.Item.campuses.S;
      return tutor; 
   };
}
