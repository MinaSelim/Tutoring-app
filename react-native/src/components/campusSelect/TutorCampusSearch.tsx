import 'react-native-gesture-handler';
import {Text} from '@ui-kitten/components';
import {View, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles/CampusSelectStyles';
import dropdownStyles from './../../styles/CampusDropdownSearchStyles';
import campuses from './../../assets/mockData/campuses';
import SearchableDropdown from 'react-native-searchable-dropdown';
import 'react-native-gesture-handler';
import {colors} from '../../styles/appColors';

const TutorCampusSearch = (): JSX.Element => {
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);

  return (
    <View style={styles.middleArea}>
      <Image
        source={require('../../assets/images/icons/university.png')}
        style={[
          {alignSelf: 'center'},
          selectedCampuses.length > 0
            ? {tintColor: colors.appOrange}
            : {tintColor: '#D8D8D8'},
        ]}
      />
      <Text
        style={[
          styles.universityText,
          selectedCampuses.length > 0 ? {height: 0} : {},
        ]}>
        {selectedCampuses.length > 0 ? selectedCampuses : 'Find Your Campus'}
      </Text>
      <View style={dropdownStyles.dropdownView}>
        <SearchableDropdown
          multi={true}
          onItemSelect={(item): void => {
            const items = selectedCampuses;
            let campus = JSON.stringify(item.name);
            campus = JSON.parse(
              campus.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'),
            );
            items.push(campus);
            setSelectedCampuses(items);
            console.log(selectedCampuses);
          }}
          containerStyle={dropdownStyles.containerStyle}
          onRemoveItem={(item): void => {
            const items = selectedCampuses.filter((sitem) => sitem !== item);
            setSelectedCampuses(items);
          }}
          itemStyle={dropdownStyles.listText}
          itemTextStyle={dropdownStyles.itemTextStyle}
          itemsContainerStyle={dropdownStyles.itemsContainerStyle}
          items={campuses}
          chip={true}
          resetValue={false}
          textInputProps={{
            placeholder: 'Search your campus...',
            underlineColorAndroid: 'transparent',
            style: dropdownStyles.inputBox,
          }}
          listProps={{
            nestedScrollEnabled: true,
          }}
        />
      </View>
    </View>
  );
};

export default TutorCampusSearch;
