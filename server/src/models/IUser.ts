export default interface IUser {
    id: number;
    name: string;
    email: string;
    firebase_uid: string;
    stripe_subscription_id ?: string;
    stripe_customer_id ?: string;
    is_validated?: boolean;
}