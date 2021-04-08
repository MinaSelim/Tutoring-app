import IUser from './IUser';

/**
 * the model for the tutor
 */
export default interface ITutor extends IUser {
   tutor_info: {
      campuses?: string[];
      chatrooms: string[];
      last_seen?: string;
      overallRating?: number;
      numberOfReviews?: number;
      classes?: string[];
      stripe_account_id: string;
      personRate?: number;
      groupRate?: number;
   };
}
