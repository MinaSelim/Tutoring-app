import TutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';
import ITutor from '../../models/ITutor';
import fs from 'fs';
import util from 'util';

export default class SearchManager {
   private tutorDatabaseFunctions: TutorDatabaseFunctions;

   constructor() {
      this.tutorDatabaseFunctions = new TutorDatabaseFunctions();
   }

   public getTutorsForClass = async (campus: string, classCode: string): Promise<ITutor[]> => {
      return await this.tutorDatabaseFunctions.getTutorsForClass(campus, classCode);
   };

   public getUniversityClasses = async (campus: string): Promise<string[]> => {
      const filepath = './universityInformation/classes/' + campus.toLowerCase() + '.json';
      const readFile = util.promisify(fs.readFile);
      const buf = await readFile(filepath);
      const universityClassData = JSON.parse(buf.toString('utf-8'));
      return universityClassData.classes;
   };
}
