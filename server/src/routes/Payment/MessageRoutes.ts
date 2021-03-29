import {Application, Request, Response} from 'express';
import IRouteComponent from '../IRouteComponent';

/**
 * Class that handles all the routes to sending payment messages
 */
export class MessageRoutes implements IRouteComponent {
   /**
    * This is the function that adds the payment message routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      /**
       * Display success of connecting account to user
       */
      app.get('/message/success', async (req: Request, res: Response) => {
         try {
            res.status(200);
            res.send('Success. Please close the in app browser.');
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      /**
       * Display Failure/need to refresh of connecting account to user
       */
      app.get('/message/refresh', async (req: Request, res: Response) => {
         try {
            res.status(408);
            res.send('The Stripe Connection timed out. Please close the in app browser and try again.');
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
