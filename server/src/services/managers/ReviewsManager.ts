import ReviewsDatabaseFunctions from '../../database/reviewsDatabaseFunctions';
import IReview from '../../models/IReview';

export default class StudentProfileManager {
   private reviewsDatabaseFunctions: ReviewsDatabaseFunctions;

   constructor() {
      this.reviewsDatabaseFunctions = new ReviewsDatabaseFunctions();
   }

   public addReview = (review: IReview): void => {
      this.reviewsDatabaseFunctions.addReviewToDatabase(review)
   };
}
