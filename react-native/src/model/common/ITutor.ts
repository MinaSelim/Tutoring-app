import IUser from './IUser';

export default interface ITutor extends IUser {
  tutor_info: {
    campuses?: string[];
    chatrooms: string[];
  };
}
