import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';
import Guards from '../common/Guards';
import ReviewsManager from '../../services/managers/ReviewsManager';
import IReview from '../../models/IReview';

export class ReviewsRoutes implements IRouteComponent {
   private reviewsManager: ReviewsManager;

   constructor() {
      this.reviewsManager = new ReviewsManager();
   }

   /**
    * This is the function that adds the profile routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      
        app.post('/reviews/addReview', async (req: Request, res: Response) => {
            try {
                // Guards.loggedInStudentGuard(req);
                const review: IReview = req.body;
                review.studentId = '123' // get from session
                this.reviewsManager.addReview(review);

                // update tutor rating 
                res.status(200);
            } catch (error) {
                res.status(500);
                res.send(error);
            }
        });
   }
}
