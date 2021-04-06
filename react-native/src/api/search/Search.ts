import env from '../../../env';

export default class Search {
  public static getCampuses = async (): Promise<any> => {
    try {
      const response = await fetch(`${env.SERVER_LINK}/search/campuses`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  public static getClasses = async (campus: string): Promise<any> => {
    try {
      const response = await fetch(`${env.SERVER_LINK}/search/classes`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: {campus},
      });
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}
