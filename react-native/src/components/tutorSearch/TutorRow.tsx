/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import {Avatar, Text, Layout, Card, Icon} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
const SearchIcon = (props): JSX.Element => (
  <Icon {...props} name="search-outline" />
);
const test = (): void => console.log('Pressed');
const TutorRow = ({item, index}): JSX.Element => {
  return (
    <Layout style={{padding: 10}}>
      <Card onPress={test}>
        <Layout style={{flexDirection: 'row'}}>
          <Layout
            style={{
              flex: 1,
            }}>
            <Text style={{paddingBottom: 8, fontWeight: 'bold'}} category="h5">
              {item.first_name}
            </Text>
            <Layout style={{flexDirection: 'row'}}>
              <Icon name="person" width={25} height={25} />
              <Text>${item.tutor_info.personRate}</Text>
            </Layout>
            <Layout style={{flexDirection: 'row'}}>
              <Icon name="people" width={25} height={25} />
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
              style={{height: 75, width: 75}}
              source={require('../../assets/icons/profile2.png')}
            />
          </Layout>
        </Layout>
        <Layout style={{flexDirection: 'row', paddingTop: 8}}>
          <Layout style={{flex: 1}}>
            <Text>{item.tutor_info.numberOfReviews} Reviews</Text>
          </Layout>
          <Layout style={{flex: 1, alignItems: 'center'}}>
            <Layout style={{flex: 1, flexDirection: 'row'}}>
              <Icon name="star" width={25} height={25} />
              <Text>{item.tutor_info.overallRating}</Text>
            </Layout>
          </Layout>
        </Layout>
      </Card>
    </Layout>
  );
};
export default TutorRow;
