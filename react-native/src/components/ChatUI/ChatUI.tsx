import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import 'react-native-gesture-handler';
import {styles} from './styles/styles';
import MessageList from './MessageList';
import MessageRow from './MessageRow';
import IMessage from '../../model/IMessage';

const DATA: IMessage[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    userName: 'Alex',
    content: 'Go for it. Anything in particular you’d like to go oveffr JHJ',
    createdAt: new Date(),
    profile: require('../../assets/icons/profile2.png'),
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    userName: 'Jessie',
    content:
      'Let me know if you need any help  ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    createdAt: new Date(),
    profile: require('../../assets/icons/profile1.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    userName: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: new Date(),
    profile: require('../../assets/icons/profile2.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    userName: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: new Date(),
    profile: require('../../assets/icons/profile2.png'),
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    userName: 'Alex',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    createdAt: new Date(),
    profile: require('../../assets/icons/profile2.png'),
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
            height: 'auto',
          }}>
          <View style={styles.topLeftContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => {}}>
              <Image
                style={styles.tinyIcon}
                source={require('../../assets/icons/arrow-back-outline.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.topCenterContainer}>
            <View style={styles.topCenterInnerContainer}>
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <Image
                  style={styles.onlineStatus}
                  source={require('../../assets/icons/online.png')}
                />

                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.title}>Jessie Allen</Text>
                </TouchableOpacity>
              </View>

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
        <View style={{flex: 1, flexGrow: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            {DATA.map((message: IMessage) => (
              <MessageRow {...message} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              flex: 1,
            }}
            // submitAction={this.sendMessage}
            underlineColorAndroid="transparent"
            placeholder="Say something"
            placeholderTextColor="#8B9CB3"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
            <Image
              style={styles.tinySendIcon}
              source={require('../../assets/icons/send-arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default ChatUI;
