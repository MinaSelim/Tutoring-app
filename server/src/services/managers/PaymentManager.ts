import Stripe from 'stripe';
import StripeApi from '../StripeApi';
import TutorDatabase from '../../database/tutorDatabaseFunctions';
import ITutor from '../../models/ITutor';

/**
 * Class that manages payment
 */
export default class PaymentManager {
   private database: TutorDatabase;
   private stripe: Stripe;
   private serverLink: string;

   /**
    *Constructor
    */
   constructor() {
      this.stripe = StripeApi.getInstance();
      this.database = new TutorDatabase();
      this.serverLink = process.env.SERVER_LINK;
   }

   /**
    * Creates a restricted provider account
    */
   public createStripeProviderAccount = async (): Promise<string> => {
      const account = await this.stripe.accounts.create({
         type: 'standard',
         country: 'CA',
      });
      return account.id;
   };

   /**
    * Connect the service account with the tutor's personal information and returns link to do operation
    * @param firebaseId
    */
   public connectStripeProviderAccount = async (firebaseId: string): Promise<Stripe.AccountLink> => {
      const tutor = (await this.database.getUserByFirebaseId(firebaseId)) as ITutor;
      const accountLinks = await this.stripe.accountLinks.create({
         account: tutor.tutor_info.stripe_account_id,
         refresh_url: this.serverLink + '/message/refresh',
         return_url: this.serverLink + '/message/success',
         type: 'account_onboarding',
      });
      return accountLinks;
   };

   /**
    * Verify is a service account with the tutor's personal information is connected
    * @param firebaseId
    */
   public isConnectedTutorStripeAccount = async (firebaseId: string): Promise<boolean> => {
      const tutor = (await this.database.getUserByFirebaseId(firebaseId)) as ITutor;
      const account = await this.stripe.accounts.retrieve(tutor.tutor_info.stripe_account_id);

      return account.payouts_enabled;
   };
}
