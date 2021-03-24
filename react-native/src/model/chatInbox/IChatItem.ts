import IChat from '../../api/chatroom/components/IChat';
import NavigationInjectedPropsConfigured from '../navigation/NavigationInjectedPropsConfigured';

export default interface IChatItem extends NavigationInjectedPropsConfigured {
  item: IChat;
}
