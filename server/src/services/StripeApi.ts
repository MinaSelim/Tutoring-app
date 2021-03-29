/* eslint-disable no-useless-constructor */
import Stripe from 'stripe';

/**
 * The singleton class that manages the stripe API
 */
class StripeApi {
   private static instance: Stripe;

   /**
    * The Singleton's constructor.
    */
   // eslint-disable-next-line @typescript-eslint/no-empty-function
   private constructor() {}

   /**
    * Function that returns the instance of the Stripe API to use.
    * @returns An instance of the stripe api.
    */
   public static getInstance(): Stripe {
      if (!StripeApi.instance) {
         this.instance = new Stripe(process.env.STRIPE_SECRET_KEY, null);
      }
      return this.instance;
   }
}

export default StripeApi;
