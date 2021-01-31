import 'react-native-gesture-handler';
import {Text, Button, Icon} from '@ui-kitten/components';
import {
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles/CampusSelectStyles';
import buttonStyles from '../sideBar/styles/styles';
import campuses from './../../assets/mockData/campuses';
import SearchableDropdown from 'react-native-searchable-dropdown';
import 'react-native-gesture-handler';
import {colors} from '../../styles/appColors';
import background from '../../assets/images/icons/signUpBackground.png';

const CampusSelect = (): JSX.Element => {
  const [isCampusSelectVisible, setCampusSelectVisibility] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState<string[]>([]);
  const CampusIcon = (props): JSX.Element => (
    <Icon {...props} name="person-outline" />
  );
  const CloseButtonIcon = (): JSX.Element => {
    return (
      <Icon fill="#363636" name="close-outline" style={styles.closeButton} />
    );
  };
  const updateCampus = async (): Promise<void> => {
    try {
      //CampusUpdate.updateUserInfo();
      setCampusSelectVisibility(false);
    } catch (error) {
      Alert.alert(`${error}`);
    }
  };
  return (
    <View>
      <Button
        onPress={(): void => setCampusSelectVisibility(true)}
        style={buttonStyles.button}
        appearance="ghost"
        status="control"
        accessoryLeft={CampusIcon}
        size="giant">
        Select Campus
      </Button>
      <Modal
        visible={isCampusSelectVisible}
        transparent={true}
        animationType="fade">
        <View style={styles.background} />
        <ImageBackground
          source={background}
          imageStyle={styles.modalImage}
          style={styles.modal}>
          <View>
            <View style={styles.campusSelectHeader}>
              <Button
                appearance="ghost"
                accessoryLeft={CloseButtonIcon}
                onPress={(): void => setCampusSelectVisibility(false)}
              />
              <Text style={styles.title}>Campus</Text>
              <Text style={styles.placeholder}>empty</Text>
            </View>
            <Text style={styles.selectYourCampus}>Select your campus</Text>
          </View>
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
            <Text style={styles.universityText}>{selectedCampus}</Text>
            <View style={{height: 250}}>
              <SearchableDropdown
                onItemSelect={(item): void => {
                  let selectedCampuses: string[] = [];
                  let campus = JSON.stringify(item.name);
                  campus = JSON.parse(
                    campus.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'),
                  );
                  selectedCampuses.push(campus);
                  setSelectedCampus(selectedCampuses);
                }}
                containerStyle={{padding: 5}}
                itemStyle={styles.listText}
                itemTextStyle={{color: '#222'}}
                itemsContainerStyle={{maxHeight: 200}}
                items={campuses}
                resetValue={false}
                textInputProps={{
                  placeholder: 'Search your campus...',
                  underlineColorAndroid: 'transparent',
                  style: styles.inputBox,
                }}
                listProps={{
                  nestedScrollEnabled: true,
                }}
              />
            </View>
          </View>
          <View style={styles.bottomArea}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={(): Promise<void> => updateCampus()}>
              <Text style={styles.finishText}> Save </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={(): Promise<void> => updateCampus()}>
              <Text style={styles.cancelText}> Cancel </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Modal>
    </View>
  );
};

export default CampusSelect;
