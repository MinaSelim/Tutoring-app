import express from 'express';
import TutorDatabaseFunctions from '../database/tutorDatabaseFunctions';

export default class LastSeenMiddlware {
   private static tutorDatabase: TutorDatabaseFunctions = new TutorDatabaseFunctions();

   public static updateLastSeenTutor(request: express.Request, response: express.Response, next: any): void {
      if (request.session.isLoggedInAsTutor) {
         LastSeenMiddlware.tutorDatabase.updateLastSeen(request.session.firebase_uid, new Date());
      }
      next();
   }
}
