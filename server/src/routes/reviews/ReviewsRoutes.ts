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

   public route(app: Application): void {
      app.post('/reviews/addReview', async (req: Request, res: Response) => {
         try {
            Guards.loggedInStudentGuard(req);
            const review: IReview = req.body;
            review.studentId = req.session.firebase_uid;
            await this.reviewsManager.addReview(review);
            res.sendStatus(200);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      app.post('/reviews/getTutorReviews', async (req: Request, res: Response) => {
         try {
            const reviews: IReview[] = await this.reviewsManager.getTutorReviews(req.body.tutorId);
            res.status(200);
            res.send(reviews);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
