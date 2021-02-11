import IUser from '../../model/common/IUser';
import {env} from '../../../env';

export default class UserUpdate {
  public static updateUserInfo = async (
    tempUser: IUser | ((user: IUser | null) => void) | null,
    userType: string,
  ): Promise<any> => {
    try {
      const response = await fetch(
        `${env.SERVER_LINK}/profile/${userType}/update`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(tempUser),
        },
      );
      //const responseBody = await response.json();
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

//Note: what is returned in normal response?
