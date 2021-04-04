import firebase from 'firebase-admin';
import FirebaseAuth from '../FirebaseAuth';
import ITutor from '../../models/ITutor';
import PaymentManager from './PaymentManager';
import tutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';

/**
 * The service that manages tutor authenthication
 */
export default class TutorAuthManager {
   private firebase_auth: firebase.auth.Auth;
   private tutorDatabaseFunctions: tutorDatabaseFunctions;
   private stripeManager: PaymentManager;

   /**
    * @param firebase_auth this parameter should be only passed in testing injections, otherwise, use default
    */
   constructor(firebase_auth = FirebaseAuth.getInstance()) {
      this.firebase_auth = firebase_auth;
      this.tutorDatabaseFunctions = new tutorDatabaseFunctions();
      this.stripeManager = new PaymentManager();
   }

   /**
    * registers the tutor by adding them to the database.
    * @param tutor The tutor to add to the database
    */
   public registerTutor = async (tutor: ITutor): Promise<void> => {
      if (await this.tutorDatabaseFunctions.userIsRegisteredAsTutor(tutor.firebase_uid)) {
         return Promise.reject('error: user is already registered as a tutor');
      } else if (await this.tutorDatabaseFunctions.userIsRegisteredAsStudent(tutor.firebase_uid)) {
         this.tutorDatabaseFunctions.addTutorInfoToUser(tutor);
      } else {
         await this.tutorDatabaseFunctions.addUserToDatabase(tutor);
      }
   };

   /**
    * Logs in and returns the tutor fetched from the db on success. TODO: strip information considered confidential.
    * @param token Validation Token sent from firebase frontend
    */
   public loginTutor = async (token: string): Promise<ITutor> => {
      const decodedToken = await this.firebase_auth.verifyIdToken(token);
      const tutor: ITutor = (await this.tutorDatabaseFunctions.getUserByFirebaseId(decodedToken.uid)) as ITutor;
      return tutor;
   };
}
