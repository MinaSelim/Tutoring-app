import {ImageProps} from 'react-native';

export default interface IMessage {
  id: string;
  sender: string;
  createdAt: Date;
  content: string;
  profileImage: ImageProps;
}
