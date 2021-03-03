import * as universitiesData from '../../universityInformation/universities.json';

export default class UniversityInformation {
   private static instance: UniversityInformation;
   private static universities: string[];
   private static classes: Record<string, string[]>;

   public static getInstance = (): UniversityInformation => {
      if (!UniversityInformation.instance) {
         UniversityInformation.instance = new UniversityInformation();

         UniversityInformation.universities = universitiesData.universities;
         UniversityInformation.universities.forEach((university) => {
            const filepath = '../../universityInformation/classes/' + university + '.json';
            UniversityInformation.classes[university] = require(filepath);
         });
      }

      return UniversityInformation.instance;
   };

   public getUniversities = (): string[] => {
      return UniversityInformation.universities;
   };

   public getClasses = (university: string): string[] => {
      return UniversityInformation.classes[university];
   };
}
