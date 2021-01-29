import 'react-native-gesture-handler';
import {Text, Button, Icon} from '@ui-kitten/components';
import {View, TouchableOpacity, Modal, Alert, Image} from 'react-native';
import React, {useState} from 'react';
import styles from './styles/CampusSelectStyles';
import buttonStyles from '../sideBar/styles/styles';
import campuses from './../../assets/mockData/campuses';
import SearchableDropdown from 'react-native-searchable-dropdown';
import 'react-native-gesture-handler';

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
        <View style={styles.modal}>
          <View>
            <View style={styles.campusSelectHeader}>
              <Button
                appearance="ghost"
                accessoryLeft={CloseButtonIcon}
                onPress={(): void => setCampusSelectVisibility(false)}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={(): Promise<void> => updateCampus()}>
                <Text style={styles.title}>Save</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Find Your Campus</Text>
            <View
              style={{
                flex: 1,
                marginBottom: 10,
                marginLeft: 25,
                marginRight: 25,
                justifyContent: 'space-between',
              }}>
              <Text style={styles.selectYourCampus}>Select your campus</Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  height: 200,
                  marginBottom: 100,
                }}>
                <Image
                  source={require('../../assets/images/icons/university.png')}
                  style={[
                    {alignSelf: 'center'},
                    selectedCampus.length > 0 ? {opacity: 1} : {opacity: 0.25},
                  ]}
                />
                <Text style={styles.universityText}>{selectedCampus}</Text>
                <View>
                  <SearchableDropdown
                    onItemSelect={(item): void => {
                      let campuses: string[] = [];
                      let campus = JSON.stringify(item.name);
                      campus = JSON.parse(
                        campus.replace(/(\{|,)\s*(.+?)\s*:/g, '$1 "$2":'),
                      );
                      campuses.push(campus);
                      setSelectedCampus(campuses);
                    }}
                    containerStyle={{padding: 5}}
                    itemStyle={styles.listText}
                    itemTextStyle={{color: '#222'}}
                    itemsContainerStyle={{maxHeight: 150}}
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
              <View>
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={(): Promise<void> => updateCampus()}>
                  <Text style={styles.finishText}> Finish </Text>
                </TouchableOpacity>
                <Text style={styles.footer}> go.study </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CampusSelect;
