import IChat from './IChat';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';

export default interface IChatItem extends NavigationInjectedPropsConfigured {
  item: IChat;
}
