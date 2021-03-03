import * as universitiesData from '../../universityInformation/universities.json';
import * as concordiaClasses from '../../universityInformation/classes/concordia.json';

export default class UniversityInformation {
   private static instance: UniversityInformation = new UniversityInformation();
   private universities: string[];
   private classes: Record<string, string[]>;

   private constructor() {
      this.universities = universitiesData.universities;
      this.classes['concordia'] = concordiaClasses.classes;
   }

   public static getInstance = (): UniversityInformation => {
      return UniversityInformation.instance;
   };

   public getUniversities = (): string[] => {
      return this.universities;
   };

   public getClasses = (university: string): string[] => {
      return this.classes[university];
   };
}
