import {View, TouchableOpacity, TextInput} from 'react-native';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import React, {useState} from 'react';
import styles from './styles';
import {colors} from '../../styles/appColors';
import BackButton from '../../components/common/backButton/index';
import 'react-native-gesture-handler';
import firebase from '../../api/authentication/Fire';
import {Text} from '@ui-kitten/components';
import constants from '../../constants';
import errorConstants from '../../constants/errors';
import {Alert} from 'react-native';
import {Image} from 'react-native';

interface IPasswordReset extends INavigation {}

const PasswordReset: React.FunctionComponent<IPasswordReset> = ({
  navigate,
  navigation,
  toggleDrawer,
}: IPasswordReset) => {
  // Hooks
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const forgotPassword = (): void => {
    if (!email.match(constants.passwordReset.regexString)) {
      Alert.alert(errorConstants.passwordReset.provideEmail);
      return;
    }

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .catch(() => {
        Alert.alert(errorConstants.passwordReset.provideARegisteredEmail);
        setEmailSent(false);
      });

    setEmailSent(true);
  };

  return (
    <View style={styles.container}>
      <BackButton
        navigate={navigate}
        toggleDrawer={toggleDrawer}
        goBack={navigation.goBack}
        navigation={navigation}
      />
      <View style={styles.inputView}>
        <View style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText} category="label">
            {constants.signin.forgotPassword}
          </Text>
        </View>
        {!emailSent && (
          <>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="email"
              placeholderTextColor={colors.appSilver}
              autoCapitalize="none"
              onChangeText={(text): void => setEmail(text)}
            />
            <TouchableOpacity
              style={styles.resetButton}
              onPress={(): void => forgotPassword()}>
              <Text style={styles.signInText} category="label">
                {' ' + constants.passwordReset.reset + ' '}
              </Text>
              <Image
                source={require('../../assets/images/icons/nextArrow.png')}
                style={styles.nextArrow}
              />
            </TouchableOpacity>
          </>
        )}
        {emailSent && (
          <View style={styles.emailSentContainer}>
            <Text style={styles.emailSentText} category="label">
              {constants.passwordReset.resetLinkSent}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default PasswordReset;
