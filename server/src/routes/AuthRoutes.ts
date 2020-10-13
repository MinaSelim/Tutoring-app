import { Application, Request, Response } from 'express';
import AuthManager from '../services/managers/AuthManager';

/**
 * Class that handles all the routes related to authenthication
 */
export class AuthRoutes {
   private authManager = new AuthManager();

   public route(app: Application) {
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
            req.session.userId = user.id;
            req.session.isLoggedIn = true;
            res.sendStatus(200);
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
