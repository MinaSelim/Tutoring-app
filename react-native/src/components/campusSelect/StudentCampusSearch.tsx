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

const StudentCampusSearch = (): JSX.Element => {
  const [selectedCampus, setSelectedCampus] = useState<string[]>([]);

  return (
    <View style={styles.middleArea}>
      <Image
        source={require('../../assets/images/icons/university.png')}
        style={[
          {alignSelf: 'center'},
          selectedCampus.length > 0
            ? {tintColor: colors.appOrange}
            : {tintColor: '#D8D8D8'},
        ]}
      />
      <Text style={styles.universityText}>
        {selectedCampus.length > 0 ? selectedCampus : 'Find Your Campus'}
      </Text>
      <View style={dropdownStyles.dropdownView}>
        <SearchableDropdown
          onItemSelect={(item): void => {
            let selectedCampuses: string[] = [];
            let campus = JSON.stringify(item.name);
            campus = JSON.parse(
              campus.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'),
            );
            selectedCampuses.push(campus);
            //Only one campus??
            setSelectedCampus(selectedCampuses);
          }}
          containerStyle={dropdownStyles.containerStyle}
          itemStyle={dropdownStyles.listText}
          itemTextStyle={dropdownStyles.itemTextStyle}
          itemsContainerStyle={dropdownStyles.itemsContainerStyle}
          items={campuses}
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

export default StudentCampusSearch;
