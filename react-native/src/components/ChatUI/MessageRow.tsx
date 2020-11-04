import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IMessage from '../../model/IMessage';
import {styles} from './styles/styles';

export default function MesageRow(props: IMessage) {
  return (
    <View style={styles.messageContainer}>
      <View>
        <Text style={styles.memberName}>
          {`${props.createdAt}${props.userName}`}
        </Text>
        <Text style={styles.chatText}>{props.content}</Text>
      </View>
    </View>
  );
}
