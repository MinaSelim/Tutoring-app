import genericChatroom from './genericChatroom';
import chatHelper from './chatHelper';
import constants from './chatConstants';

export default class directChatroom extends genericChatroom {
  /**
   * Creates a groupchat with multiple users (more than 2)
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsToken An array of users firebase UID's
   * @param roomName The name of the chatroom
   */
  public createChatroom = (
    currentUserToken: string,
    participantsToken: string,
    roomName: string,
  ): void => {
    // eslint-disable-next-line new-cap
    const chatroomHelper: chatHelper = new chatHelper();
    chatroomHelper
      .getOneOnOneChat(currentUserToken, participantsToken)
      .then(
        (
          res: firebase.firestore.QueryDocumentSnapshot<
            firebase.firestore.DocumentData
          >[],
        ) =>
          chatroomHelper.generateChat(
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
