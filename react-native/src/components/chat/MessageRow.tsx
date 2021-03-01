/* eslint-disable react/no-unescaped-entities */
import {Avatar, Divider} from '@ui-kitten/components';
import React from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';

import IMessage from '../../model/IMessage';
import {chatStyles} from './styles/chatStyles';
import 'moment-timezone';

const MesageRow = (props: IMessage): JSX.Element => {
  return (
    <View style={chatStyles.messageContainer}>
      <View>
        <Text style={chatStyles.date}>
          {moment.unix(props.createdAt).format('MMM Do')}
        </Text>
        <Divider />
        <View style={{flexDirection: 'row'}}>
          <Avatar
            size="medium"
            style={chatStyles.avatar}
            source={require('../../assets/icons/profile2.png')}
          />
          <View style={chatStyles.messageContentContainer}>
            <Text style={chatStyles.memberName}>{`${props.sender}`}</Text>
            <Text style={chatStyles.chatText}>{props.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default MesageRow;
