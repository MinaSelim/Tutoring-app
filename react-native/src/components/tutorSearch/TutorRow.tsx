/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-native/no-inline-styles */
import {Button, useTheme} from '@ui-kitten/components';
import 'react-native-gesture-handler';
import {Avatar, Text, Layout, Card, Icon} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, View, Modal} from 'react-native';
import styles from '../../components/tutorSearch/styles/TutorProfileStyles';
import tutorProfile from '../../constants/tutorProfile';
import useAuthUser from '../../hooks/authUser';
import chatHelper from '../../api/chatroom/chatHelper';
const chevronDownIcon = (props): JSX.Element => (
  <Icon {...props} name="arrow-ios-downward-outline" />
);
const fowardArrowIcon = (props): JSX.Element => (
  <Icon {...props} name="arrow-forward-outline" />
);
const chatBubbleIcon = (props): JSX.Element => (
  <Icon {...props} name="message-square" />
);
const TutorRow = ({item, navigation}): JSX.Element => {
  const user = useAuthUser()[0];
  const userID: string = user!.firebase_uid;
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();

  const createDM = async (): Promise<void> => {
    let dm = new chatHelper();
    let chatID = await dm.getChat(
      userID,
      item.firebase_uid,
      item.first_name,
      'placedholder',
      'direct',
    );
    setVisible(false);
    if (
      user!.hasOwnProperty('student_info') &&
      user!.student_info.chatrooms.includes(chatID) === undefined
    ) {
      user!.student_info.chatrooms.push(chatID);
    }
    navigation.navigate('Chat', {
      chatID: chatID,
    });
  };

  const CloseButtonIcon = (): JSX.Element => {
    return (
      <Icon
        fill={theme['color-basic-1000']}
        name="close-outline"
        style={styles.closeButton}
      />
    );
  };
  return (
    <Layout style={{padding: 10}}>
      <Modal visible={visible}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.background} />
          <View style={styles.modal}>
            <View style={styles.ProfileHeader}>
              <Button
                appearance="ghost"
                accessoryLeft={CloseButtonIcon}
                onPress={(): void => {
                  setVisible(false);
                }}
              />
              <Text style={styles.title}>{item.first_name}</Text>
            </View>
            <View style={styles.row}>
              <Layout style={styles.profileAvatarContainer}>
                <Avatar
                  shape="round"
                  size="large"
                  style={styles.profilePicture}
                  source={require('../../assets/icons/profile3.png')}
                />
              </Layout>

              <Layout style={styles.tutorInfo}>
                <Layout style={styles.safeArea}>
                  <Layout style={styles.row}>
                    <Icon
                      fill={theme['color-primary-500']}
                      name="person"
                      width={25}
                      height={25}
                    />
                    <Text>${item.tutor_info.personRate}</Text>
                  </Layout>
                  <Layout style={styles.row}>
                    <Icon
                      name="people"
                      fill={theme['color-primary-500']}
                      width={25}
                      height={25}
                    />
                    <Text>${item.tutor_info.groupRate}</Text>
                  </Layout>
                </Layout>
                <Layout style={{flexDirection: 'row', flex: 1}}>
                  <Icon
                    name="star"
                    fill={theme['color-primary-500']}
                    width={40}
                    height={40}
                  />
                  <Text category="h3">{item.tutor_info.overallRating}</Text>
                </Layout>
              </Layout>
            </View>

            <View style={styles.description}>
              <Text category="p1">{tutorProfile.profile.desc}</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <Button
                style={styles.navButtons}
                accessoryRight={fowardArrowIcon}>
                {tutorProfile.profile.bookNow}
              </Button>
              <Button
                style={styles.navButtons}
                onPress={createDM}
                accessoryRight={chatBubbleIcon}>
                {tutorProfile.profile.sendMsg}
              </Button>
              <Button
                style={styles.navButtons}
                status="basic"
                appearance="ghost"
                accessoryRight={chevronDownIcon}>
                {tutorProfile.profile.seeReviews}
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <Card onPress={() => setVisible(true)}>
        <Layout style={styles.row}>
          <Layout
            style={{
              flex: 1,
            }}>
            <Text style={styles.cardName} category="h5">
              {item.first_name}
            </Text>
            <Layout style={styles.row}>
              <Icon
                fill={theme['color-primary-500']}
                name="person"
                width={25}
                height={25}
              />
              <Text>${item.tutor_info.personRate}</Text>
            </Layout>
            <Layout style={styles.row}>
              <Icon
                name="people"
                fill={theme['color-primary-500']}
                width={25}
                height={25}
              />
              <Text>${item.tutor_info.groupRate}</Text>
            </Layout>
          </Layout>
          <Layout
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Avatar
              style={styles.cardAvatar}
              source={require('../../assets/icons/profile3.png')}
            />
          </Layout>
        </Layout>
        <Layout style={styles.bottomCard}>
          <Layout style={styles.safeArea}>
            <Text style={{paddingLeft: 3}}>
              {item.tutor_info.numberOfReviews} Reviews
            </Text>
          </Layout>
          <Layout style={styles.reviewContainer}>
            <Layout style={styles.row}>
              <Icon
                name="star"
                fill={theme['color-primary-500']}
                width={25}
                height={25}
              />
              <Text category="h6">{item.tutor_info.overallRating}</Text>
            </Layout>
          </Layout>
        </Layout>
      </Card>
    </Layout>
  );
};
export default TutorRow;
