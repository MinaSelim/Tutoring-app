import TutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';
import ITutor from '../../models/ITutor';

export default class SearchManager {
   private tutorDatabaseFunctions: TutorDatabaseFunctions;

   constructor() {
      this.tutorDatabaseFunctions = new TutorDatabaseFunctions();
   }

   public getAllTutors = async (): Promise<ITutor[]> => {
      return await this.tutorDatabaseFunctions.getAllTutors();
   };
}
