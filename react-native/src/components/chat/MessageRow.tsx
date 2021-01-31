/* eslint-disable react/no-unescaped-entities */
import {Avatar, Divider, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View} from 'react-native';
import moment from 'moment';

import IMessage from '../../model/IMessage';
import {chatStyles} from './styles/chatStyles';
import 'moment-timezone';
interface IMessagerow {
  message: IMessage;
  newDay: boolean;
}
const MesageRow: React.FunctionComponent<IMessagerow> = ({
  message,
  newDay,
}: IMessagerow): JSX.Element => {
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
              <Text style={chatStyles.memberName}>{`${message.sender}`}</Text>
              <Text appearance="hint">{`\t${moment
                .unix(message.createdAt / 1000)
                .format('LT')}`}</Text>
            </View>

            <Text style={chatStyles.chatText}>{message.content}</Text>
          </View>
        </View>
        {newDay && (
          <>
            <Text style={chatStyles.date}>
              {moment
                .unix(message.createdAt / 1000)
                .add(1, 'day')
                .format('MMM Do')}
            </Text>
            <Divider />
          </>
        )}
      </View>
    </View>
  );
};
export default MesageRow;
