import IUser from './IUser';

export default interface ITutor extends IUser {
  tutor_info: {
    campuses?: string[];
    chatrooms: string[];
    last_seen?: string;
    overallRating?: number;
    numberOfReviews?: number;
    stripe_account_id: string;
  };
}
