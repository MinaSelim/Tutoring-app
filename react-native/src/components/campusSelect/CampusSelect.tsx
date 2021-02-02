import 'react-native-gesture-handler';
import {Text, Button, Icon} from '@ui-kitten/components';
import {
  View,
  TouchableOpacity,
  Modal,
  Alert,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles/CampusSelectStyles';
import buttonStyles from '../sideBar/styles/styles';
import 'react-native-gesture-handler';
import background from '../../assets/images/icons/signUpBackground.png';
import TutorCampusSearch from './TutorCampusSearch';

const CampusSelect = (): JSX.Element => {
  const [isCampusSelectVisible, setCampusSelectVisibility] = useState(false);
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
          <TutorCampusSearch />
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
