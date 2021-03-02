import TutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';
import ITutor from '../../models/ITutor';
import fs from 'fs';

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

   public getUniversityClasses =  (campus: string): string[] => {      
      let universityClasses: string[] = [];
      const filepath = './src/universityInformation/classes/' + campus.toLowerCase() + '.json';
      fs.readFile(filepath, 'utf-8', (err, data) => {
         if (err) {
            console.error(err);
            return [];
         } 
         const parsedData = JSON.parse(data);
         universityClasses = parsedData.classes;
      })
      return universityClasses;
   };
}
