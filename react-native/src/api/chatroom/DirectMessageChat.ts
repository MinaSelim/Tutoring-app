import GenericChat from './GenericChat';
import chatHelper from './chatHelper';
import constants from './chatConstants';

export default class DirectMessageChat extends GenericChat {
  /**
   * Creates a direct message chat with only two users
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsTokens Another user's firebase UID
   * @param roomName The name of the chatroom
   */
  public createChatroom = (
    currentUserToken: string,
    participantToken: string,
    roomName: string,
  ): number => {
    const chatroomHelper: chatHelper = new chatHelper();
    let creationResult: number = constants.errorValueNotSet;

    chatroomHelper
      .getOneOnOneChat(currentUserToken, participantToken)
      .then((res: firebase.firestore.DocumentData) => {
        creationResult = chatroomHelper.generateChat(
          res,
          currentUserToken,
          [currentUserToken, participantToken],
          roomName,
          constants.directChatString,
          constants.directChatString,
        );
      });
    return creationResult;
  };
}
