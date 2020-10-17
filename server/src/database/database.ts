import IUser from '../models/IUser';

export default class Database {
   public addUserInUserCollection = async (user: IUser) => {
      //TODO: Implement DB
   };

   public getUserByFirebaseId = async (id: string) => {
      //TODO Fetch user from db
      const user: IUser = {
         id: 0,
         email: 'test@hotmail.com',
         firebase_uid: 'aaaa',
         name: 'Mina',
      };
      return user;
   };
}
