import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import IMessage from '../../model/IMessage';
import {styles} from './styles/styles';

export default function MesageRow(props: IMessage) {
  return (
    <View style={styles.messageContainer}>
      <View>
        <Text style={styles.memberName}>{`${props.createdAt}`}</Text>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.profileIcon} source={`${props.profile}`} />
          <View
            style={{
              width: 0,
              flexGrow: 1,
              flex: 1,
            }}>
            <Text style={styles.memberName}>{`${props.userName}`}</Text>
            <Text style={styles.chatText}>{props.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
