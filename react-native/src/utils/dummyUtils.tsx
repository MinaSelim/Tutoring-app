import {AppRegistry} from 'react-native';
import React from 'react';
import {Component} from 'react';
import {View, Text} from 'react-native';

class DummyUtils extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <View>
                <Text>Hello World!</Text>
            </View>
        );
    }
}
export default DummyUtils;
