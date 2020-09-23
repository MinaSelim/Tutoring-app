import {AppRegistry, View} from 'react-native';
import React, {Component} from 'react';
import styles from './src/styles/parentLayoutStyles'
import TopButton from './src/components/randomButtons/TopButton';
import BottomButton from './src/components/randomButtons/BottomButton';
import MiddleButton from './src/components/randomButtons/MiddleButton';


class App extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <View style={styles.container}>
                <TopButton/>
                <BottomButton/>
                <MiddleButton/>
            </View>
        );
    }
}
AppRegistry.registerComponent('GoStudy', () => App);
