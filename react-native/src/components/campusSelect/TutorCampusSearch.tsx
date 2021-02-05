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
import {Picker} from '@react-native-picker/picker';

const TutorCampusSearch = (): JSX.Element => {
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);

  const SelectedList = (): JSX.Element => {
    return (
      <Picker
        selectedValue={setSelectedCampuses[0]}
        mode={'dropdown'}
        style={{height: 50, width: 150}}
        onValueChange={(item, index): void => {
          const items = selectedCampuses.filter((sitem) => sitem !== item);
          setSelectedCampuses(items);
          console.log(selectedCampuses);
        }}>
        {selectedCampuses.map((campus, i) => {
          return (
            <Picker.Item key={i} value={campus} label={campus + ' (remove)'} />
          );
        })}
      </Picker>
    );
  };

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
      <Text style={styles.universityText}>
        {selectedCampuses.length > 0 ? (
          <SelectedList />
        ) : (
          'Modify your campuses'
        )}
      </Text>
      <View style={dropdownStyles.dropdownView}>
        <SearchableDropdown
          multi={true}
          //selectedItems={selectedCampuses}
          onItemSelect={(item): void => {
            let campus = JSON.stringify(item.name);
            campus = JSON.parse(
              campus.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'),
            );
            setSelectedCampuses((oldList) => [...oldList, campus]);
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
