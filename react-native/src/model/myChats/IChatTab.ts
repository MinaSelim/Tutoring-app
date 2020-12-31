import IChat from './IChat';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';

export default interface IChatTab extends NavigationInjectedPropsConfigured {
  source: IChat[];
}
