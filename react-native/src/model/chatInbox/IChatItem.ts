import IChat from './IChat';
import NavigationInjectedPropsConfigured from '../navigation/NavigationInjectedPropsConfigured';

export default interface IChatItem extends NavigationInjectedPropsConfigured {
  item: IChat;
}
