import React, {Component} from 'react';
import {FlatList, Text, ListRenderItem} from 'react-native';
import MessageRow from './MessageRow';
import IMessage from '../../model/IMessage';

const ITEM_HEIGHT = 50;

interface IMessageListState {
  messages: IMessage[];
}

interface IMessageListProps {
  messages: IMessage[];
}

class MessageList extends Component<IMessageListProps, IMessageListState> {
  constructor(props: IMessageListProps) {
    super(props);
    this.state = {
      messages: [],
    };
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem: any = (item: IMessage) => {
    <MessageRow {...item} />;
  };

  itemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  render() {
    return (
      <FlatList
        data={this.props.messages}
        keyExtractor={(item) => item.key}
        renderItem={this.renderItem}
        inverted
      />
    );
  }
}
export default MessageList;
