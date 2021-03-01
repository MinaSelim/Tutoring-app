import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TopTabBar from './SignInTabBar';
import SignIn from './index';
import StudentAuth from '../../api/authentication/StudentAuth';
import TutorAuth from '../../api/authentication/TutorAuth';
import NavigationInjectedPropsConfigured from '../../model/navigation/NavigationInjectedPropsConfigured';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';

const {Navigator, Screen} = createMaterialTopTabNavigator();

//The Sign in page parent component, Renders SignIn page
const SignInMenu: React.FC<NavigationInjectedPropsConfigured> = ({
  navigation,
}): JSX.Element => (
  <ImageBackground
    source={require('../../assets/images/icons/signInBackground.png')}
    style={styles.background}>
    <SafeAreaView style={[styles.safeArea]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.component}>
          <View style={styles.logo}>
            <Image
              source={require('../../assets/images/icons/logo.png')}
              style={styles.title}
            />
          </View>
          <View style={styles.container}>
            <ScrollView>
              <Navigator
                tabBar={(props): JSX.Element => <TopTabBar {...props} />}>
                <Screen
                  name="Student"
                  children={(): JSX.Element => (
                    <SignIn
                      userType={'student'}
                      userAuth={new StudentAuth()}
                      navigation={navigation}
                    />
                  )}
                />
                <Screen
                  name="Tutor"
                  children={(): JSX.Element => (
                    <SignIn
                      userType={'tutor'}
                      userAuth={new TutorAuth()}
                      navigation={navigation}
                    />
                  )}
                />
              </Navigator>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  </ImageBackground>
);

export default SignInMenu;
