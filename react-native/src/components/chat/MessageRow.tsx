/* eslint-disable react/no-unescaped-entities */
import {Avatar, Divider, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';

import IMessage from '../../model/IMessage';
import {chatStyles} from './styles/chatStyles';
import 'moment-timezone';
let currentDay = '';
let newDay = false;
let first = true;
const MesageRow = (props: IMessage): JSX.Element => {
  const rowDate = moment.unix(props.createdAt / 1000).format('MMM Do');
  if (first) {
    newDay = false;
    first = false;
    currentDay = rowDate;
  } else if (rowDate !== currentDay) {
    currentDay = rowDate;
    newDay = true;
  } else {
    newDay = false;
  }

  return (
    <View style={chatStyles.messageContainer}>
      <View>
        <Divider />
        <View style={{flexDirection: 'row'}}>
          <Avatar
            size="medium"
            style={chatStyles.avatar}
            source={require('../../assets/icons/profile2.png')}
          />
          <View style={chatStyles.messageContentContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={chatStyles.memberName}>{`${props.sender}`}</Text>
              <Text appearance="hint">{`\t${moment
                .unix(props.createdAt / 1000)
                .format('LT')}`}</Text>
            </View>

            <Text style={chatStyles.chatText}>{props.content}</Text>
          </View>
        </View>
        {newDay && (
          <Text style={chatStyles.date}>
            {moment
              .unix(props.createdAt / 1000)
              .add(1, 'day')
              .format('MMM Do')}
          </Text>
        )}
      </View>
    </View>
  );
};
export default MesageRow;
