import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import IMessage from '../../model/IMessage'

export default function MesageRow(props:IMessage) {
 return(
     <View style={styles.container}>
        <View>
            <Text style={styles.memberName}>{props.createdAt + '' + props.userName}</Text>
            <Text  style={styles.chatText}>{props.content}</Text>
        </View>
    </View>);   
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: '100%',
        flexGrow: 1,
    },
    memberName: {
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    chatText:{
        fontSize:16,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: 'pink'
    }
})
