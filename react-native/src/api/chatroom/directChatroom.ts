import chatHandler from './chatHandler';
import chatHelper from './chatHelper';
import constants from './chatConstants';

export default class directChatroom extends chatHandler {
  /**
   * Creates a groupchat with multiple users (more than 2)
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsToken An array of users firebase UID's
   * @param roomName The name of the chatroom
   */
  public static createOneonOneChatroom = (
    currentUserToken: string,
    participantsToken: string,
    roomName: string,
  ): void => {
    chatHelper
      .getOneOnOneChat(currentUserToken, participantsToken)
      .then(
        (
          res: firebase.firestore.QueryDocumentSnapshot<
            firebase.firestore.DocumentData
          >[],
        ) =>
          chatHelper.generateChat(
            res,
            currentUserToken,
            [currentUserToken, participantsToken],
            roomName,
            null,
            constants.directChatString,
          ),
      );
  };
}
