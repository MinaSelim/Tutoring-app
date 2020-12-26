/* eslint-disable no-useless-constructor */
import firebase from 'firebase-admin';

/**
 * The singleton class that manages the firebase auth API
 */
class FirebaseAuth {
   private static instance: typeof firebase;

   /**
    * The Singleton's constructor.
    */
   // eslint-disable-next-line @typescript-eslint/no-empty-function
   private constructor() {}

   /**
    * Function that returns the instance of the firebase API to use.
    * @returns An instance of the firebase auth api.
    */
   public static getInstance(): firebase.auth.Auth {
      if (!FirebaseAuth.instance) {
         this.instance = firebase;
         this.instance.initializeApp({
            credential: this.instance.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
         });
      }
      return this.instance.auth();
   }
}

export default FirebaseAuth;
