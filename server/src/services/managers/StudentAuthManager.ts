import firebase from 'firebase-admin';
import FirebaseAuth from '../FirebaseAuth';
import IStudent from '../../models/IStudent';
import IUser from '../../models/IUser';
import ITutor from '../../models/ITutor';
import studentDatabaseFunctions from '../../database/studentDatabaseFunctions';
import {exception} from 'console';

/**
 * The service that manages student authenthication
 */
export default class StudentAuthManager {
   private firebase_auth: firebase.auth.Auth;
   private database: studentDatabaseFunctions;

   /**
    * @param firebase_auth this parameter should be only passed in testing injections, otherwise, use default
    */
   constructor(firebase_auth = FirebaseAuth.getInstance()) {
      this.firebase_auth = firebase_auth;
      this.database = new studentDatabaseFunctions();
   }

   /**
    * registers the student by adding them to the database.
    * @param student The student to add to the database
    */
   public registerStudent = async (student: IStudent): Promise<void> => {
      if (await this.database.userIsRegisteredAsStudent(student.firebase_uid)) {
         return Promise.reject('error: user is already registered as a student');
      } else if (await this.database.userIsRegisteredAsTutor(student.firebase_uid)) {
         this.database.addStudentInfoToUser(student);
      } else {
         await this.database.addUserToDatabase(student);
      }
   };

   /**
    * Logs in and returns the student fetched from the db on success. TODO: strip information considered confidential.
    * @param token Validation Token sent from firebase frontend
    */
   public loginStudent = async (token: string): Promise<IStudent> => {
      const decodedToken = await this.firebase_auth.verifyIdToken(token);
      const student: IStudent = (await this.database.getUserByFirebaseId(decodedToken.uid)) as IStudent;
      return student;
   };
}
