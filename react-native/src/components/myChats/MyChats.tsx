import {View, TouchableOpacity, Image} from 'react-native';
import 'react-native-gesture-handler';
import {Text} from '@ui-kitten/components';
import React from 'react';

const MyChats = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={{position: 'absolute'}}
        onPress={() => props.navigation.goBack()}>
        <Image
          source={require('../../assets/images/icons/backBtn.png')}
          // style={styles.goBackButton}
        />
      </TouchableOpacity>
      <Text>My Chats: Coming Soon!</Text>
    </View>
  );
};

export default MyChats;
