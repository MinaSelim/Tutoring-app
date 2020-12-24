import {Avatar, Divider} from '@ui-kitten/components';
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import IMessage from '../../model/IMessage';
import {chatStyles} from './styles/chatStyles';

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function MesageRow(props: IMessage) {
  return (
    <View style={chatStyles.messageContainer}>
      <View>
        <Text style={chatStyles.date}>
          {monthNames[props.createdAt.getMonth()]}
          {` ${props.createdAt.getDate()}`}
        </Text>
        <Divider />
        <View style={{flexDirection: 'row'}}>
          <Avatar
            size="medium"
            style={{margin: 10}}
            source={props.profileImage}
          />
          <View
            style={{
              width: 0,
              flexGrow: 1,
              flex: 1,
            }}>
            <Text style={chatStyles.memberName}>{`${props.sender}`}</Text>
            <Text style={chatStyles.chatText}>{props.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
