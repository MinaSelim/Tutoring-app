import firebase from 'firebase-admin';
import IUser from '../../models/IUser';
import Database from '../../database/database';

/**
 * The service that manages authenthication
 */
export default class AuthManager {
   private admin: typeof firebase;
   private database: Database;

   /**
    * @param admin this parameter should be only passed in testing injections, otherwise, use default
    */
   constructor(admin = firebase) {
      this.admin = admin;
      this.admin.initializeApp({
         credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
      });
      this.database = new Database(); //TODO properly implement this.
   }

   /**
    * registers the user by adding them to the database.
    * @param user The user to add to the database
    */
   public registerUser = async (user: IUser): Promise<void> => {
      await this.database.addUserInUserCollection(user);
   };

   /**
    * Logs in and returns the user fetched from the db on success. TODO: strip information considered confidential.
    * @param token Validation Token sent from firebase frontend
    */
   public loginUser = async (token: string): Promise<IUser> => {
      const decodedToken = await this.admin.auth().verifyIdToken(token);
      const user: IUser = await this.database.getUserByFirebaseId(decodedToken.uid);
      return user;
   };
}
