import {View, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import {
  Text,
  Layout,
  Autocomplete,
  AutocompleteItem,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import React from 'react';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;

const SearchIcon = (props): JSX.Element => (
  <Icon {...props} name="search-outline" />
);

const renderBackAction = (): JSX.Element => (
  <TopNavigationAction icon={BackIcon} />
);

const TutorSearch = (): JSX.Element => {
  return (
    <Layout style={{flexDirection: 'column', flex: 1}}>
      <Layout style={{}}>
        <TopNavigation alignment="center" accessoryLeft={renderBackAction} />
      </Layout>
      <Layout
        style={{
          flex: 0.2,
          backgroundColor: '#FF0000',
          justifyContent: 'center',
        }}>
        <Layout style={{alignSelf: 'center'}}>
          <Text style={TutorSearchStyles.title}>Find a Tutor</Text>
        </Layout>
      </Layout>
      <Layout style={{padding: 20}}>
        <Autocomplete
          placeholder="Class ID (e.g. MATH206)"
          accessoryLeft={SearchIcon}
        />
      </Layout>
    </Layout>
  );
};

const TutorSearchStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default TutorSearch;
