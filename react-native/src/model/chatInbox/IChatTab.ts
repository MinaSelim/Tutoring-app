import IChat from '../../api/chatroom/components/IChat';
import NavigationInjectedPropsConfigured from '../navigation/NavigationInjectedPropsConfigured';

export default interface IChatTab extends NavigationInjectedPropsConfigured {
  source: IChat[] | undefined;
  isLoadingChats: boolean;
}
