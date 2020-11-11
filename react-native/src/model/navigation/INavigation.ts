import {NavigationInjectedProps} from 'react-navigation';

interface NavigationInjectedPropsConfigured extends NavigationInjectedProps {
  navigate(...args: any[]): any;
  goBack(): any;
}

export default interface INavigation {
  navigation: NavigationInjectedPropsConfigured;
}
