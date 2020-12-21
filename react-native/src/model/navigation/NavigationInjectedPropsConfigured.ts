import {NavigationInjectedProps} from 'react-navigation';

export default interface NavigationInjectedPropsConfigured
  extends NavigationInjectedProps {
  navigate(...args: any[]): any;
  goBack(): any;
}
