import React, {useState} from 'react';
import {Linking, View} from 'react-native';
import {Button, Text} from '@ui-kitten/components';
import BackButton from '../../components/common/backButton';
import Style from './styles';
import {colors} from '../../styles/appColors';
import NavigationInjectedPropsConfigured from 'model/navigation/NavigationInjectedPropsConfigured';
import useAuthUser from '../../hooks/authUser';
import styles from './styles';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import constants from '../../constants';
import env from '../../../env';
import {useEffect} from 'react';

interface IPaymentPage extends NavigationInjectedPropsConfigured {}

const PaymentOptions: React.FunctionComponent<IPaymentPage> = ({
  navigation,
  toggleDrawer,
  navigate,
}: IPaymentPage): JSX.Element => {
  const verifyExistenceOfConnectedStripeAccount = async (): Promise<
    boolean
  > => {
    const response = await fetch(
      `${env.SERVER_LINK}/payment/is-tutor-account-connected`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      },
    );

    let responseBody = await response.json();
    return responseBody.isEnabled;
  };

  const authUser = useAuthUser()[0];
  const isTutor = authUser!.hasOwnProperty('tutor_info');
  const [
    tutorHasConnectedStripeAccount,
    setTutorHasConnectedStripeAccount,
  ] = useState(false);

  useEffect(() => {
    verifyExistenceOfConnectedStripeAccount().then((result) =>
      setTutorHasConnectedStripeAccount(result),
    );
  });

  const openIAB = async (): Promise<void> => {
    try {
      const response = await fetch(
        `${env.SERVER_LINK}/payment/connect-stripe-account`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        },
      );
      let responseBody = await response.json();

      console.log('url', responseBody.url);
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(responseBody.url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: colors.appStripeBlack,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: colors.appStripeBlack,
          secondaryToolbarColor: colors.appStripeBlack,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'Connect to your STRIPE account',
          },
        });
      } else Linking.openURL(responseBody.url);
    } catch (error) {}
  };

  const openStripePortal = async (): Promise<void> => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(constants.paymentOptions.dashBoardUrl, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: colors.appStripeBlack,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: colors.appStripeBlack,
          secondaryToolbarColor: colors.appStripeBlack,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'Connect to your STRIPE account',
          },
        });
      } else Linking.openURL(constants.paymentOptions.dashBoardUrl);
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <BackButton
        navigate={navigate}
        toggleDrawer={toggleDrawer}
        goBack={navigation.goBack}
        navigation={navigation}
      />
      <Text style={Style.titleText}>{constants.paymentOptions.title}</Text>
      {isTutor && !tutorHasConnectedStripeAccount ? (
        <>
          <Text style={Style.subTitleText}>
            {constants.paymentOptions.paymentMethod}
          </Text>
          <Button
            style={Style.connectWithStripeButton}
            onPress={(): void => {
              openIAB();
            }}>
            {constants.paymentOptions.connectStripe}
          </Button>
        </>
      ) : (
        <>
          <Text style={Style.subTitleText}>
            {constants.paymentOptions.paymentMethod}
          </Text>
          <Button
            style={Style.connectWithStripeButton}
            onPress={(): void => {
              openStripePortal();
            }}>
            {constants.paymentOptions.accessStripe}
          </Button>
        </>
      )}
    </View>
  );
};

export default PaymentOptions;
