import ISignUpCredentials from "./ISignUpCredentials";

export default interface IUser extends ISignUpCredentials {
    avatar: string;
    firebase_uid: string;
    stripe_customer_id?: string;
    is_validated?: boolean;
}