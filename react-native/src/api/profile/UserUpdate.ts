import IUser from '../../model/common/IUser';
import env from '../../../env';

export default class UserUpdate {
  public static updateUserInfo = async (
    tempUser: IUser | ((user: IUser | null) => void) | null,
  ): Promise<any> => {
    const userType = tempUser!.hasOwnProperty('tutor_info')
      ? 'tutor'
      : 'student';
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
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static updateStudentCampus = async (
    idToken: string,
    campus: string,
  ): Promise<any> => {
    try {
      const response = await fetch(
        `${env.SERVER_LINK}/profile/student/updateCampus`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({idToken, campus}),
        },
      );
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static addTutorCampus = async (
    idToken: string,
    campus: string,
  ): Promise<any> => {
    try {
      const response = await fetch(
        `${env.SERVER_LINK}/profile/tutor/addCampus`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({idToken, campus}),
        },
      );
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static removeTutorCampus = async (
    idToken: string,
    campus: string,
  ): Promise<any> => {
    try {
      const response = await fetch(
        `${env.SERVER_LINK}/profile/tutor/removeCampus`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({idToken, campus}),
        },
      );
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
