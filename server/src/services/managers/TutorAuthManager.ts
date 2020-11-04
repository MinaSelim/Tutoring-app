import firebase from 'firebase-admin';
import FirebaseAuth from '../FirebaseAuth';
import ITutor from '../../models/ITutor';
import Database from '../../database/database';

/**
 * The service that manages tutor authenthication
 */
export default class TutorAuthManager {
   private firebase_auth: firebase.auth.Auth;
   private database: Database;

   /**
    * @param firebase_auth this parameter should be only passed in testing injections, otherwise, use default
    */
   constructor(firebase_auth = FirebaseAuth.getInstance()) {
      this.firebase_auth = firebase_auth;
      this.database = new Database();
   }

   /**
    * registers the tutor by adding them to the database.
    * @param tutor The tutor to add to the database
    */
   public registerTutor = async (tutor: ITutor): Promise<void> => {
      await this.database.addTutorInUserCollection(tutor);
   };

   /**
    * Logs in and returns the tutor fetched from the db on success. TODO: strip information considered confidential.
    * @param token Validation Token sent from firebase frontend
    */
   public loginTutor = async (token: string): Promise<ITutor> => {
      const decodedToken = await this.firebase_auth.verifyIdToken(token);
      const student: ITutor = await this.database.getTutorByFirebaseId(decodedToken.uid);
      return student;
   };
}
