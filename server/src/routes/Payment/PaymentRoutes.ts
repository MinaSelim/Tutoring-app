import {Application, Request, Response} from 'express';
import PaymentManager from '../../services/managers/PaymentManager';
import Guards from '../common/Guards';
import IRouteComponent from '../IRouteComponent';

/**
 * Class that handles all the routes related to Payment
 */
export class PaymentRoutes implements IRouteComponent {
   private paymentManager: PaymentManager;

   constructor() {
      this.paymentManager = new PaymentManager();
   }

   /**
    * This is the function that adds the payment routes to the function
    * @param app the application to set routes on
    */
   public route(app: Application): void {
      /**
       *  Sends the URL that contains the data to connect the account
       */
      app.get('/payment/connect-stripe-account', async (req: Request, res: Response) => {
         try {
            Guards.loggedInTutorGuard(req);
            const accountLinks = await this.paymentManager.connectStripeProviderAccount(req.session.firebase_uid);
            res.send({url: accountLinks.url});
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });

      /**
       *  Sends the boolean that confirms if a turoe account is connected with stripe
       */
      app.get('/payment/is-tutor-account-connected', async (req: Request, res: Response) => {
         try {
            Guards.loggedInTutorGuard(req);
            const isEnabled = await this.paymentManager.isConnectedTutorStripeAccount(req.session.firebase_uid);
            res.send({isEnabled: isEnabled});
         } catch (error) {
            res.status(500);
            res.send(error);
         }
      });
   }
}
