/* eslint-disable @typescript-eslint/no-var-requires */
import * as universitiesData from '../../universityInformation/universities.json';

export default class UniversityInformation {
   private static instance: UniversityInformation;
   private universities: string[];
   private classes: Record<string, string[]>;

   private constructor() {
      this.universities = universitiesData.universities;
      this.classes = {};
      this.universities.forEach((university) => {
         const filepath = '../../universityInformation/classes/' + university + '.json';
         this.classes[university] = require(filepath).classes;
      });
   }

   public static getInstance = (): UniversityInformation => {
      if (!UniversityInformation.instance) {
         UniversityInformation.instance = new UniversityInformation();
      }
      return UniversityInformation.instance;
   };

   public getUniversities = (): string[] => {
      return this.universities;
   };

   public getClasses = (university: string): string[] => {
      return this.classes[university];
   };
}
