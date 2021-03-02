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

   public getTutorsForClass = async (campus: string, classCode: string): Promise<ITutor[]> => {
      return await this.tutorDatabaseFunctions.getTutorsForClass(campus, classCode);
   };
}
