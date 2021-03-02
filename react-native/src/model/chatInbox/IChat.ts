export default interface IChat {
  id: string;
  participants: Array<string>;
  createdAt: number;
  roomName: string;
  associatedClass: string;
  chatType: string;
  viewedChat: Array<string>;
  latestMessage: latestMessage;
}

interface latestMessage {
  content : string;
  sender : string;
  date : number;
}