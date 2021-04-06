import {assert} from 'chai';
import {Request} from 'express';
import Guards from '../../src/routes/common/Guards';

describe('Login guards', () => {
   it('Should throw error when tutor is not logged in', () => {
      const req = ({
         session: {
            isLoggedInAsTutor: false,
         },
      } as unknown) as Request;

      try {
         Guards.loggedInTutorGuard(req);
      } catch (err) {
         assert.equal(err, 'Tutor is not logged in');
      }
   });

   it('Should throw error when student is not logged in', () => {
      const req = ({
         session: {
            isLoggedInAsStudent: false,
         },
      } as unknown) as Request;

      try {
         Guards.loggedInStudentGuard(req);
      } catch (err) {
         assert.equal(err, 'Student is not logged in');
      }
   });
});
