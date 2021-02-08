import {Request} from 'express';

export default class Guards {
   /**
    * throws an error if user is not logged as tutor
    * @param req request
    */
   public static loggedInTutorGuard(req: Request): void {
      if (req.session.isLoggedInAsTutor == false) {
         throw 'Tutor is not logged in';
      }
   }

   /**
    * throws an error if user is not logged as a student
    * @param req request
    */
   public static loggedInStudentGuard(req: Request): void {
       if (req.session.isLoggedInAsStudent == false) {
           throw 'Student is not logged in';
       }
   }

}