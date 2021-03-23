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
  List,
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

const renderTutorRow = ({item, index}): JSX.Element => {
  return <TutorRow key={item.id} item={item} index={index} />;
};
let select = false;
const TutorSearch = (): JSX.Element => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(DATA);

  const onSelect = (index): void => {
    console.log('onselect', select);
    select = true;
    console.log('onselect', select);
    setValue(data[index].class);
  };
  const onChangeText = (query): void => {
    setValue(query);
    setData(DATA.filter((item) => filter(item, query)));
  };
  const renderOption = (item, index): JSX.Element => (
    <AutocompleteItem key={index} title={item.class} />
  );

  const renderTitle = (props): JSX.Element => {
    if (select) {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text {...props}>Find a Tutor</Text>
        </View>
      );
    } else {
      return <></>;
    }
  };
  console.log('before render', select);
  return (
    <Layout style={{flexDirection: 'column', flex: 1}}>
      <Layout style={{}}>
        <TopNavigation
          alignment="center"
          accessoryLeft={renderBackAction}
          title={renderTitle}
        />
      </Layout>
      {!select && (
        <Layout
          style={{
            height: 100,
            backgroundColor: 'blue',
            justifyContent: 'center',
          }}>
          <Layout style={{alignSelf: 'center'}}>
            <Text style={TutorSearchStyles.title}>Find a Tutor</Text>
          </Layout>
          <Text
            appearance="hint"
            style={{fontSize: 23, alignSelf: 'center', paddingBottom: 9}}>
            Search for a class by course code
          </Text>
        </Layout>
      )}
      <Layout style={{padding: 10}}>
        <Autocomplete
          placeholder="Class ID (e.g. MATH206)"
          accessoryLeft={SearchIcon}
          onChangeText={onChangeText}
          value={value}
          onSelect={onSelect}>
          {data.map(renderOption)}
        </Autocomplete>
      </Layout>
      <FlatList
        renderItem={renderTutorRow}
        data={tutorData}
        keyExtractor={(item): string => item.firebase_uid.toString()}
      />
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
