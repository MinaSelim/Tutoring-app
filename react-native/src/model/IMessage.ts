import {ImageProps} from 'react-native';

export default interface IMessage {
  key: string;
  userName: string;
  createdAt: Date;
  content: string;
  profile: ImageProps;
}
