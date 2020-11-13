import {Application, Request, Response} from 'express';
import StudentAuthManager from '../../services/managers/StudentAuthManager';
import IRouteComponent from '../IRouteComponent';

/**
 * Class that handles all the routes related to authenthication
 */
export class StudentAuthRoutes implements IRouteComponent {
   private authManager = new StudentAuthManager();

   /**
    * This is the function that adds the auth routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      /**
       *  Register the user and sends success, or the error to the front end
       */
      app.post('/auth/student/register', async (req: Request, res: Response) => {
         try {
            await this.authManager.registerStudent(req.body);
            res.sendStatus(200);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      /**
       * Logs in, and store the user unique ID in the session
       */
      app.post('/auth/student/login', async (req: Request, res: Response) => {
         try {
            const user = await this.authManager.loginStudent(req.body.idToken);
            req.session.firebase_uid = user.firebase_uid;
            req.session.isLoggedIn = true;
            req.session.isLoggedInAsStudent = true;
            res.status(200);
            res.send(user);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
