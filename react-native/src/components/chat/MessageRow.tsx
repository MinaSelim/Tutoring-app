/* eslint-disable react/no-unescaped-entities */
import {Avatar, Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import moment from 'moment';

import IMessage from '../../model/IMessage';
import {chatStyles} from './styles/chatStyles';
import 'moment-timezone';

const MesageRow = (props: IMessage): JSX.Element => {
  return (
    <View style={chatStyles.messageContainer}>
      <View>
        <Text style={chatStyles.date}>
          {moment.unix(props.createdAt / 1000).format('MMM Do')}
        </Text>
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
      </View>
    </View>
  );
};
export default MesageRow;
