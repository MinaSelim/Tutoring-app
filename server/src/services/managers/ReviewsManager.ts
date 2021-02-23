import ReviewsDatabaseFunctions from '../../database/reviewsDatabaseFunctions';
import TutorDatabaseFunctions from '../../database/tutorDatabaseFunctions';
import IReview from '../../models/IReview';

export default class StudentProfileManager {
   private reviewsDatabaseFunctions: ReviewsDatabaseFunctions;
   private tutorDatabaseFunctions: TutorDatabaseFunctions;

   constructor() {
      this.reviewsDatabaseFunctions = new ReviewsDatabaseFunctions();
      this.tutorDatabaseFunctions = new TutorDatabaseFunctions();
   }

   public addReview = async (review: IReview): Promise<void> => {
      await this.reviewsDatabaseFunctions.addReviewToDatabase(review);
      await this.tutorDatabaseFunctions.updateOverallRating(review);
   };

   public getTutorReviews = async (tutorId: string): Promise<IReview[]> => {
      return await this.reviewsDatabaseFunctions.getTutorReviews(tutorId);
   };
}
