import IUser from '../../model/common/IUser';

export default class UserUpdate {
  public static updateUserInfo = async (user: IUser): Promise<IUser> => {
    //send user for update
    return user;
  };
}
