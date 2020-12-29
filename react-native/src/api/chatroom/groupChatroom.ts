import chatHandler from './chatHandler';
import chatHelper from './chatHelper';
import constants from './chatConstants';

export default class groupChatroom extends chatHandler {
  /**
   * Creates a groupchat with multiple users (more than 2)
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsToken An array of users firebase UID's
   * @param roomName The name of the chatroom
   * @param associatedClass The course that will be associiated with this chatroom   */
  public static createGroupChatroom = (
    currentUserToken: string,
    participantsToken: Array<string>,
    roomName: string,
    associatedClass: string,
  ): void => {
    chatHelper.generateChat(
      undefined,
      currentUserToken,
      participantsToken,
      roomName,
      associatedClass,
      constants.groupChatString,
    );
  };
}