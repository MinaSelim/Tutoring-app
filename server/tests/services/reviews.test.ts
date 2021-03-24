import StudentProfileManager from '../../src/services/managers/ReviewsManager';
import Sinon from 'sinon';
import {assert} from 'chai';
import {
   getItemReviewResolves,
   putItemInputReviews,
   putItemOutputReviewsResolves,
   queryReviewsResovles,
   review0Rating,
   tutorDefined,
   updateItemOutputReviewsResolves,
   updateItemReview,
} from '../utils/templates';
import Dynamo from '../../src/database/dynamo';
import databaseUtils from '../../src/database/databaseUtils';

describe('Reviews functions', () => {
   let sandbox: Sinon.SinonSandbox;
   let studentManager: StudentProfileManager;
   let dynamo: AWS.DynamoDB;
   let dbUtils: databaseUtils;

   before(() => {
      sandbox = Sinon.createSandbox();
      dynamo = Dynamo.getInstance();
      dbUtils = databaseUtils.getInstance();
      studentManager = new StudentProfileManager();
   });
   after(() => {
      sandbox.restore();
   });

   it('Should add a new review', () => {
      sandbox.stub(dynamo, 'putItem').returns(putItemOutputReviewsResolves);
      const putItemSpy = sandbox.spy(dbUtils, 'putItem');

      sandbox.stub(dynamo, 'getItem').returns(getItemReviewResolves);

      sandbox.stub(dynamo, 'updateItem').returns(updateItemOutputReviewsResolves);
      const updateItemSpy = sandbox.spy(dbUtils, 'updateItem');

      return studentManager.addReview(review0Rating).then(() => {
         assert(putItemSpy.calledWith(putItemInputReviews));
         assert(updateItemSpy.calledWith(updateItemReview));
      });
   });

   it('Should get reviews of a tutor', () => {
      sandbox.stub(dynamo, 'query').returns(queryReviewsResovles);

      return studentManager.getTutorReviews(tutorDefined.firebase_uid).then((res) => {
         assert.equal(res.length, 1);
         assert.equal(res[0].studentId, review0Rating.studentId);
         assert.equal(res[0].tutorId, review0Rating.tutorId);
         assert.equal(res[0].reviewText, review0Rating.reviewText);
         assert.equal(res[0].communicationRating, review0Rating.communicationRating);
         assert.equal(res[0].knowledgeRating, review0Rating.knowledgeRating);
         assert.equal(res[0].wouldTakeAgainRating, review0Rating.wouldTakeAgainRating);
         assert.equal(res[0].timestamp, review0Rating.timestamp);
      });
   });
});
