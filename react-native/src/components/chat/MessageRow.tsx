import {Avatar, Divider, Text} from '@ui-kitten/components';
import React from 'react';
import {View} from 'react-native';
import moment from 'moment';

import IMessage from '../../model/IMessage';
import {chatStyles} from './styles/chatStyles';
import 'moment-timezone';
interface IMessagerow {
  message: IMessage;
}
const MesageRow: React.FunctionComponent<IMessagerow> = ({
  message,
}: IMessagerow): JSX.Element => {
  return (
    <View style={chatStyles.messageContainer}>
      <View>
        <Divider />
        <View style={chatStyles.rowDirection}>
          <Avatar
            size="medium"
            style={chatStyles.avatar}
            source={require('../../assets/icons/profile3.png')}
          />
          <View style={chatStyles.messageContentContainer}>
            <View style={chatStyles.rowDirection}>
              <Text style={chatStyles.memberName}>{`${message.sender}`}</Text>
              <Text appearance="hint">{`\t${moment
                .unix(message.createdAt / 1000)
                .format('LT')}`}</Text>
            </View>

            <Text style={chatStyles.chatText}>{message.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default MesageRow;
