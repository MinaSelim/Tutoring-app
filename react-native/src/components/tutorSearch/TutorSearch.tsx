/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-props-no-spreading */
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
} from '@ui-kitten/components';
import React from 'react';
import DATA from './data/classData';
import tutorData from './data/tutorData';
import TutorRow from './TutorRow';
import {FlatList} from 'react-native-gesture-handler';

const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;
const SearchIcon = (props): JSX.Element => (
  <Icon {...props} name="search-outline" />
);

const renderBackAction = (): JSX.Element => (
  <TopNavigationAction icon={BackIcon} />
);

const filter = (item, query): void =>
  item.class.toLowerCase().includes(query.toLowerCase());

const userFilter = (item, query): void =>
  item.tutor_info.classes.includes(query.toLowerCase());

let select = false;

const TutorSearch = (): JSX.Element => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(DATA);
  const [userData, setUserData] = React.useState(tutorData);

  const renderTutorRow = ({item}): JSX.Element => {
    if (value) {
      return <TutorRow key={item.id} item={item} />;
    } else return <></>;
  };
  const onSelect = (index): void => {
    select = true;
    setValue(data[index].class);
    const queryData = tutorData.filter((item) =>
      userFilter(item, data[index].class),
    );
    setUserData(queryData);
  };

  const onChangeText = (query): void => {
    setValue(query);
    setData(DATA.filter((item) => filter(item, query)));
    const queryData = tutorData.filter((item) => userFilter(item, query));
    setUserData(queryData);
  };

  const renderOption = (item, index): JSX.Element => (
    <AutocompleteItem key={index} title={item.class} />
  );

  const renderTitle = (props): JSX.Element => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text {...props}>Find a Tutor</Text>
      </View>
    );
  };

  return (
    <Layout style={{flexDirection: 'column', flex: 1}}>
      <Layout style={{}}>
        <TopNavigation
          alignment="center"
          accessoryLeft={renderBackAction}
          title={renderTitle}
        />
      </Layout>
      <Layout style={{padding: 10}}>
        <Autocomplete
          placeholder="Class ID (e.g. MATH206)"
          accessoryLeft={SearchIcon}
          onChangeText={onChangeText}
          value={value}
          onSelect={onSelect}>
          {data.map(renderOption)}
        </Autocomplete>
        <Text
          appearance="hint"
          style={{fontSize: 18, alignSelf: 'center', paddingBottom: 5}}>
          Search for a class by course code
        </Text>
      </Layout>
      <FlatList
        renderItem={renderTutorRow}
        data={userData}
        keyExtractor={(item): string => item.firebase_uid.toString()}
      />
    </Layout>
  );
};

export default TutorSearch;
