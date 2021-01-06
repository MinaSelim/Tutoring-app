import GenericChat from './GenericChat';
import chatHelper from './chatHelper';
import constants from './chatConstants';

export default class GroupChat extends GenericChat {
  /**
   * Creates a groupchat with multiple users (more than 2)
   * @param currentUserToken The firebase UID of the current logged in user
   * @param participantsTokens An array of users firebase UID's
   * @param roomName The name of the chatroom
   * @param associatedClass The course that will be associiated with this chatroom   */
  public createChatroom = (
    currentUserToken: string,
    participantsTokens: Array<string>,
    roomName: string,
    associatedClass: string,
  ): number => {
    // eslint-disable-next-line new-cap
    const chatroomHelper: chatHelper = new chatHelper();
    const creationResult: number = chatroomHelper.generateChat(
      {},
      currentUserToken,
      participantsTokens,
      roomName,
      associatedClass,
      constants.groupChatString,
    );
    return creationResult;
  };
}
