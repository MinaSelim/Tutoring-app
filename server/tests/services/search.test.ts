import SearchManager from '../../src/services/managers/SearchManager';
import Sinon from 'sinon';
import {assert} from 'chai';
import {
   awsError,
   scanOuputSearchTutorRejects,
   scanOuputSearchTutorResolves,
   searchConstants,
   tutorDefined,
} from '../utils/templates';
import Dynamo from '../../src/database/dynamo';

describe('Search functions', () => {
   let sandbox: Sinon.SinonSandbox;
   let searchManager: SearchManager;
   let dynamo: AWS.DynamoDB;

   beforeEach(() => {
      sandbox = Sinon.createSandbox();
      dynamo = Dynamo.getInstance();
      searchManager = new SearchManager();
   });
   afterEach(() => {
      sandbox.restore();
   });

   it('Should get tutors for a class', () => {
      sandbox.stub(dynamo, 'scan').returns(scanOuputSearchTutorResolves);

      return searchManager.getTutorsForClass(searchConstants.CAMPUS, searchConstants.CLASSCODE).then((res) => {
         assert.equal(res.length, 1);
         assert.equal(res[0].firebase_uid, tutorDefined.firebase_uid);
      });
   });

   it('Should  failt to get tutors for a class', () => {
      sandbox.stub(dynamo, 'scan').returns(scanOuputSearchTutorRejects);

      return searchManager
         .getTutorsForClass(searchConstants.CAMPUS, searchConstants.CLASSCODE)
         .then(() => {
            assert.fail('Should not return any tutors');
         })
         .catch((err) => {
            assert.equal(err, awsError);
         });
   });

   it('Should get classes of a university', () => {
      const res: string[] = searchManager.getUniversityClasses('concordia');
      assert(res.length > 0);
   });

   it('Should fail to get classes of unknown university', () => {
      const res: string[] = searchManager.getUniversityClasses('bad');
      assert.isUndefined(res);
   });
});
