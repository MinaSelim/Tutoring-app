import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView,FlatList} from 'react-native';
import 'react-native-gesture-handler';
import {styles} from './styles/styles';
import MessageList from './MessageList';
import MessageRow from './MessageRow';
import IMessage from '../../model/IMessage';

const DATA: IMessage[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    userName: 'M1',
    content: 'jcfhbsaijbfchjkascfa jkdb akjscbahsdbckhjlasdb chjkas',
    createdAt: new Date(),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    userName: 'M2',
    content: 'jcfhbsaijbfchjkascfa jkdb akjscbahsdbckhjlasdb chjkas',
    createdAt: new Date(),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    userName: 'M3',
    content: 'jcfhbsaijbfchjkascfa jkdb akjscbahsdbckhjlasdb chjkas',
    createdAt: new Date(),
  },
  
];

class ChatUI extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={styles.topLeftContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => {}}>
              {/* <Image
                    style={styles.tinyIcon}
                    //source={require('../../assets/icons/arrow-back-outline.png')}
                /> */}
            </TouchableOpacity>
          </View>

          <View style={styles.topCenterContainer}>
            <View style={styles.topCenterInnerContainer}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.title}>
                  {/* <Image
                        style={styles.onlineStatus}
                        source={require('../../assets/icons/online.png')}
                        /> */}
                  Jessie Allen
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.detailText}> view details </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.topRightContainer}>
            <TouchableOpacity style={styles.bookButton} onPress={() => {}}>
              <Text style={{color: 'white'}}> Book </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1,height: '100%',flexGrow: 1,}}>
        
        <ScrollView
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
        >        
            {DATA.map((message:IMessage) =>  <MessageRow {...message}/>)}
        </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            // submitAction={this.sendMessage}
            underlineColorAndroid="transparent"
            placeholder="Say something"
            placeholderTextColor="#8B9CB3"
            autoCapitalize="none"
          />
        </View>
      </View>
    );
  }
}
export default ChatUI;
