import {AppRegistry} from 'react-native';
import React from 'react';
import {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import io from 'socket.io-client';
const socket = io('http://192.168.0.111:3000');

interface message{
  timeStamp: String,
  userId: String,
  msg: String
}

interface State{
  chatMessage: message,
  chatMessages: message[]
}

interface Props{}

class App extends Component<Props, State> {

  state:State = {
    chatMessage: {
      timeStamp: "adaksjdhakd",
      userId: "user1",
      msg: "hello world"
    },
    chatMessages: []  
  }
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on('chat message', (msg) => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }

  submitChatMessage() {
    let message:message = {
      timeStamp: "adaksjdhakd",
      userId: "user1",
      msg: "hello world"
    }
    socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: message});
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderWidth: 2}}
          autocorrect={false}
          // value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={(chatMessage) => {
            this.setState({chatMessage});
          }}></TextInput>
        {this.state.chatMessages.map((chatMessage) => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ))}
      </View>
    );
  }
}
AppRegistry.registerComponent('GoStudy', () => App);
