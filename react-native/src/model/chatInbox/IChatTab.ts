import IChat from './IChat';
import NavigationInjectedPropsConfigured from '../navigation/NavigationInjectedPropsConfigured';

export default interface IChatTab extends NavigationInjectedPropsConfigured {
  source: IChat[];
}
