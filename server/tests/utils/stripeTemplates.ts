/*
 * A File with stripe variables templates to be used for testing
 */

import Stripe from 'stripe';

export const stripeAccount = {id: '', payouts_enabled: false} as Stripe.Response<Stripe.Account>;

export const stripeAccountLink = {url: 'url'} as Stripe.Response<Stripe.AccountLink>;
