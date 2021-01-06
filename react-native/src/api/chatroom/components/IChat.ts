export default interface IChat {
  id: string;
  participants: Array<string>;
  createdAt: number;
  roomName: string;
  associatedClass: string;
  chatType: string;
  viewedChat: Object;
  latestMessage: Array<string>;
}
