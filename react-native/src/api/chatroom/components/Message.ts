import IMessage from './IMessage';

export default class Message implements IMessage {
  id: string;

  content: string;

  sender: string;

  createdAt: number;

  constructor(id, content, sender, createdAt) {
    this.id = id;
    this.content = content;
    this.sender = sender;
    this.createdAt = createdAt;
  }
}
