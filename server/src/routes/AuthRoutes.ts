import { Application, Request, Response } from 'express';
import AuthManager from '../services/managers/AuthManager';

/**
 * Class that handles all the routes related to authenthication
 */
export class AuthRoutes {
   private authManager = new AuthManager();

   /**
    * This is the function that adds the auth routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      /**
       *  Register the user and sends success, or the error to the front end
       */
      app.post('/auth/register', async (req: Request, res: Response) => {
         try {
            await this.authManager.registerUser(req.body);
            res.sendStatus(200);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      /**
       * Logs in, and store the user unique ID in the session
       */
      app.post('/auth/login', async (req: Request, res: Response) => {
         try {
            const user = await this.authManager.loginUser(req.body.idToken);
            req.session.firebase_uid = user.firebase_uid;
            req.session.isLoggedIn = true;
            res.sendStatus(200);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
