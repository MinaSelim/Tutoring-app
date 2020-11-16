import {Avatar} from '@ui-kitten/components';
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import IMessage from '../../model/IMessage';
import {chatStyles} from './styles/chatStyles';

export default function MesageRow(props: IMessage) {
  return (
    <View style={chatStyles.messageContainer}>
      <View>
        <Text style={chatStyles.date}>{`${props.createdAt}`}</Text>
        <View style={{flexDirection: 'row'}}>
          <Avatar size="medium" style={{margin: 10}} source={props.profile} />
          <View
            style={{
              width: 0,
              flexGrow: 1,
              flex: 1,
            }}>
            <Text style={chatStyles.memberName}>{`${props.userName}`}</Text>
            <Text style={chatStyles.chatText}>{props.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
