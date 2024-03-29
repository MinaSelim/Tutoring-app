import IUser from './IUser';

export default interface IStudent extends IUser {
  student_info: {
    campus: string;
    chatrooms: string[];
    stripe_customer_id?: string;
  };
}
