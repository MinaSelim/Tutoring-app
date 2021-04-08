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
import DATA from '../tutorSearch/data/concordia';
//import tutorData from './data/tutorData';
import TutorRow from './TutorRow';
import {BaseButton, FlatList} from 'react-native-gesture-handler';
import styles from '../tutorSearch/styles/TutorProfileStyles';
import tutorProfile from '../../constants/tutorProfile';
import env from '../../../env';
import ITutor from 'model/common/ITutor';
import INavigation from '../../model/navigation/NavigationInjectedPropsConfigured';
import BackButton from '../../components/common/backButton';
const BackIcon = (props): JSX.Element => <Icon {...props} name="arrow-back" />;
const SearchIcon = (props): JSX.Element => (
  <Icon {...props} name="search-outline" />
);

const filter = (item, query): void =>
  item.class.toLowerCase().includes(query.toLowerCase());

const userFilter = (item, query): void =>
  item.tutor_info.classes.includes(query.toLowerCase());

let select = false;

const TutorSearch = (props): JSX.Element => {
  const [value, setValue] = React.useState('');
  const [data, setData] = React.useState(DATA);
  const [userData, setUserData] = React.useState<ITutor[]>([]);

  // const renderBackAction = (): JSX.Element => (
  //   <TopNavigationAction icon={BackIcon} onPress={props.navigation.goBack} />
  // );

  const renderTutorRow = ({item}): JSX.Element => {
    if (value) {
      return (
        <TutorRow key={item.id} item={item} navigation={props.navigation} />
      );
    } else return <></>;
  };
  const onSelect = async (index): Promise<void> => {
    select = true;
    setValue(data[index].class);
    const queryData = await fetch(`${env.SERVER_LINK}/search/tutorsForClass`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({campus: 'concordia', class: value}),
      credentials: 'include',
    });
    console.log(queryData);
    const responseTutorArray = await queryData.json();
    if (responseTutorArray !== undefined) {
      setUserData(responseTutorArray);
    }
  };

  const onChangeText = async (query): Promise<void> => {
    setValue(query);
    const queryData = await fetch(`${env.SERVER_LINK}/search/classes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({campus: 'concordia'}),
      credentials: 'include',
    });
    const responseClassesArray = await queryData.json();
    setData(responseClassesArray.filter((item) => filter(item, query)));
    setUserData(responseClassesArray);
  };

  const renderOption = (item, index): JSX.Element => (
    <AutocompleteItem key={index} title={item.class} />
  );

  const renderTitle = (props): JSX.Element => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text {...props} style={styles.title}>
          {tutorProfile.search.title}
        </Text>
      </View>
    );
  };

  return (
    <Layout style={{flexDirection: 'column', flex: 1}}>
      <Layout style={{}}>
        {/* <TopNavigation
          alignment="center"
          accessoryLeft={renderBackAction}
          title={renderTitle}
        /> */}
        <BackButton
          navigate={props.navigate}
          toggleDrawer={props.toggleDrawer}
          goBack={props.navigation.goBack}
          navigation={props.navigation}
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
          {tutorProfile.search.searchSubtitle}
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
