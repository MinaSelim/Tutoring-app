import IChat from './IChat';

export default class Chat implements IChat {
  id: string;

  participants: string[];

  createdAt: number;

  roomName: string;

  associatedClass: string;

  chatType: string;

  viewedChat: Object;

  latestMessage: any[];

  constructor(
    id,
    participants,
    createdAt,
    roomName,
    associatedClass,
    chatType,
    viewedChat,
    latestMessage,
  ) {
    this.id = id;
    this.participants = participants;
    this.createdAt = createdAt;
    this.roomName = roomName;
    this.associatedClass = associatedClass;
    this.chatType = chatType;
    this.viewedChat = viewedChat;
    this.latestMessage = latestMessage;
  }
}
