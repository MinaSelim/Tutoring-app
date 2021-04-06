import {assert} from 'chai';
import UniversityInformation from '../../src/config/UniversityInformation';

describe('University Information', () => {
   it('Should return a list of universtiies', () => {
      const info: UniversityInformation = UniversityInformation.getInstance();
      assert(info.getUniversities().length > 0);
   });

   it('Should return a list of campuses', () => {
      const info: UniversityInformation = UniversityInformation.getInstance();
      assert(info.getCampuses().length > 0);
   });

   it('Should return a list of classes', () => {
      const info: UniversityInformation = UniversityInformation.getInstance();
      assert(info.getClasses('concordia').length > 0);
   });
});
