import TutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';
import ITutor from '../../models/ITutor';
import UniversityInformation from '../../config/UniversityInformation';

export default class SearchManager {
   private tutorDatabaseFunctions: TutorDatabaseFunctions;
   private universityInformation: UniversityInformation;

   constructor() {
      this.tutorDatabaseFunctions = new TutorDatabaseFunctions();
      this.universityInformation = UniversityInformation.getInstance();
   }

   public getTutorsForClass = async (campus: string, classCode: string): Promise<ITutor[]> => {
      return await this.tutorDatabaseFunctions.getTutorsForClass(campus, classCode);
   };

   public getUniversityClasses = async (campus: string): Promise<string[]> => {
      return this.universityInformation.getClasses(campus);
   };
}
