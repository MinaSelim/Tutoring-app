import env from '../../../../env';

export default class RequestUserChatrooms {
  constructor() {}
  public getUserChatrooms = async (userID: string): Promise<string[]> => {
    const userChatsPost = await fetch(
      `${env.SERVER_LINK}/profile/student/getChatrooms`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({idToken: userID}),
        credentials: 'include',
      },
    )
      .then((response) => response.json())
      .then((data) => {
        return data.body;
      });
    return [];
  };
}
