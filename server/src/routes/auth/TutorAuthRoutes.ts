import {Application, Request, Response} from 'express';
import TutorAuthManager from '../../services/managers/TutorAuthManager';
import IRouteComponent from '../IRouteComponent';

/**
 * Class that handles all the routes related to authenthication
 */
export class TutorAuthRoutes implements IRouteComponent {
   private authManager = new TutorAuthManager();

   /**
    * This is the function that adds the auth routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      /**
       *  Register the user and sends success, or the error to the front end
       */
      app.post('/auth/tutor/register', async (req: Request, res: Response) => {
         try {
            await this.authManager.registerTutor(req.body);
            res.sendStatus(200);
         } catch (error) {
            console.error(error);
            res.status(500);
            res.send(error);
         }
      });

      /**
       * Logs in, and store the user unique ID in the session
       */
      app.post('/auth/tutor/login', async (req: Request, res: Response) => {
         try {
            const user = await this.authManager.loginTutor(req.body.idToken);
            req.session.firebase_uid = user.firebase_uid;
            req.session.isLoggedIn = true;
            req.session.isLoggedInAsTutor = true;
            res.status(200);
            res.send(user);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
