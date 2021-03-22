/* eslint-disable react-native/no-inline-styles */
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
  List,
} from '@ui-kitten/components';
import React from 'react';
import DATA from './data/classData';
import tutorData from './data/tutorData';
import TutorRow from './TutorRow';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;
const SearchIcon = (props): JSX.Element => (
  <Icon {...props} name="search-outline" />
);

const renderBackAction = (): JSX.Element => (
  <TopNavigationAction icon={BackIcon} />
);
const filter = (item, query): void =>
  item.class.toLowerCase().includes(query.toLowerCase());

const renderTutorRow = ({item, index}): JSX.Element => {
  return <TutorRow key={item.id} item={item} index={index} />;
};
const TutorSearch = (): JSX.Element => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(DATA);
  const onSelect = (index): void => {
    console.log('index', index);
    console.log('data', data);
    setValue(data[index].class);
    console.log('onSelect value', value);
  };
  const onChangeText = (query): void => {
    setValue(query);
    setData(DATA.filter((item) => filter(item, query)));
  };
  const renderOption = (item, index): JSX.Element => (
    <AutocompleteItem key={index} title={item.class} />
  );
  // const selectedClassExists = (item): boolean => (

  // )
  return (
    <Layout style={{flexDirection: 'column', flex: 1}}>
      <Layout style={{}}>
        <TopNavigation alignment="center" accessoryLeft={renderBackAction} />
      </Layout>
      <Layout
        style={{
          height: 100,
          backgroundColor: 'blue',
          justifyContent: 'center',
        }}>
        <Layout style={{alignSelf: 'center'}}>
          <Text style={TutorSearchStyles.title}>Find a Tutor</Text>
        </Layout>
      </Layout>
      <Layout style={{padding: 20}}>
        <Text
          appearance="hint"
          style={{fontSize: 23, alignSelf: 'center', paddingBottom: 9}}>
          Search for a class by course class
        </Text>
        <Autocomplete
          placeholder="Class ID (e.g. MATH206)"
          accessoryLeft={SearchIcon}
          onChangeText={onChangeText}
          value={value}
          onSelect={onSelect}>
          {data.map(renderOption)}
        </Autocomplete>
        <List renderItem={renderTutorRow} data={tutorData} />
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
