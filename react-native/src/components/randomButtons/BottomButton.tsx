import React from 'react';
import {Component} from 'react';
import {View, Text, Button, Alert} from 'react-native';

class BottomButton extends Component {
    constructor(props){
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);

    }

    handleOnClick(){
        Alert.alert(
            'Bottom Button!',
            'I am two option alert. Do you want to cancel me ?',
            [
              {text: 'Yes', onPress: () => console.log('Yes Pressed')},
              {text: 'No', onPress: () => console.log('No Pressed')},
            ],
            {cancelable: false}
            );
    }

    render(){
        return(
            <View>
                <Button title="Bottom Button" onPress={this.handleOnClick}/>
            </View>
        );
    }
}

export default BottomButton;