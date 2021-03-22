/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import {Avatar, Text, Layout, Card, Icon} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const SearchIcon = (props): JSX.Element => (
  <Icon {...props} name="search-outline" />
);
const test = (): void => console.log('Pressed');
const TutorRow = ({item, index}): JSX.Element => {
  return (
    <SafeAreaView style={{paddingBottom: 15}}>
      <Card onPress={test} style={{}}>
        <Layout style={{flexDirection: 'row'}}>
          <Layout
            style={{
              flex: 1,
            }}>
            <Text>{item.first_name}</Text>
            <Text>${item.tutor_info.personRate}</Text>
            <Text>${item.tutor_info.groupRate}</Text>
            <Text>{item.tutor_info.numberOfReviews} Reviews</Text>
          </Layout>
          <Layout
            style={{alignItems: 'center', flex: 1, backgroundColor: 'green'}}>
            <Avatar
              size="large"
              source={require('../../assets/icons/profile2.png')}
            />
            <Text>{item.tutor_info.overallRating}</Text>
          </Layout>
        </Layout>
      </Card>
    </SafeAreaView>
  );
};
export default TutorRow;
