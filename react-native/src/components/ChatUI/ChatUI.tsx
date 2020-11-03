import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image, ScrollView, SafeAreaView } from 'react-native'
import 'react-native-gesture-handler';




class ChatUI extends Component {

    

    constructor(props){
        super(props);
   } 

    render() {

        const renderItem = (info) => (
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged.
              </Text>
          );

        
        return (

            <View style={{
                flex: 1,
                padding: 10,
              }}>
                        <View style={{
                                flexDirection: 'row',
                                borderBottomColor: '#BFBFBF'
                            }}>
                                    <View style={{
                                        flex: 1,
                                        width: 100,
                                        height: 100,
                                        backgroundColor: 'red',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center'
                                    }} >
                                        <TouchableOpacity style = {styles.backButton} onPress = {() => {}}>
                                            {/* <Image
                                                style={styles.tinyIcon}
                                                //source={require('../../assets/icons/arrow-back-outline.png')}
                                            /> */}
                                        </TouchableOpacity> 
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        width: 100,
                                        height: 100,
                                        alignContent: 'center',
                                        padding: 5,
                                        marginBottom: 10,
                                        flexGrow: 2,
                                        backgroundColor: 'blue',
                                        justifyContent: 'center'
                                        }}>

                                        <View style={{
                                            flex: 1,
                                            alignContent: 'center',
                                            flexGrow: 1,
                                            backgroundColor: 'orange',
                                            justifyContent: 'center',
                                            }}>
                                                
                                                 
                                                <TouchableOpacity>
                                                    <Text style ={styles.title}> 
                                                        {/* <Image
                                                            style={styles.onlineStatus}
                                                            source={require('../../assets/icons/online.png')}
                                                        /> */}
                                                        Jessie Allen 
                                                    </Text>
                                                </TouchableOpacity>

                                                <TouchableOpacity>
                                                
                                                    <Text style ={styles.detailText}> view details </Text>
                                                </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        width: 100,
                                        height: 100,
                                        flexGrow: 1.7,
                                        backgroundColor: 'purple',
                                        justifyContent: 'center'
                                        }}>
                                         <TouchableOpacity
                                            style = {styles.bookButton}
                                            onPress = {() => {}}>
                                            <Text style = {{color: 'white'}}> Book </Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>

                                <View style={{
                                    flex: 1,
                                    height: '100%',
                                    flexGrow: 1,
                                    
                                    }}>
                                        <View style={styles.message}>
                                            <Text style={styles.memberName}>
                                                Alex Rodriguez
                                            </Text>
                                            <Text style={styles.chatText}>
                                                {/* <Image
                                                    style={styles.profileIcon}
                                                    source={require('../../assets/icons/Profile1.png')}
                                                /> */}
                                                fsdfffasdfeeeeeeeeeeedffffffffffffffffffffffffffdffffffffffffff
                                            </Text>
                                        </View>


                                        <View style={styles.message}>
                                            <Text style={styles.chatText}>
                                                fsdfffasdfgadesfgdfsdfffasdfgadesfgd
                                                fsd
                                            </Text>
                                        </View>
                                        
                                </View>

                                <View style={{
                                flex: 0,
                                height: 100,
                                backgroundColor: 'darkred'
                                }}>
                                    <TextInput
                                        //submitAction={this.sendMessage}
                                        underlineColorAndroid = "transparent"
                                        placeholder = "Say something"
                                        placeholderTextColor = "#8B9CB3"
                                        autoCapitalize = "none"
                                    /> 
                            </View>
            </View>
      )
   }
}
export default ChatUI

const styles = StyleSheet.create({


    tinyIcon:{
        width: 24,
        height: 24,
        
    },

    profileIcon:{
        width: 50,
        height: 50,
    },

    onlineStatus:{
        width: 10,
        height: 10,
    },

    message:{
        borderBottomColor: '#BFBFBF',
        borderBottomWidth: 1,
        backgroundColor: 'green',
        height: '25%'
    },

    backButton:{
        margin: 5,
        height: 50,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    container: {
    
    },
    title: {
        fontSize: 18,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },

    memberName: {
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },

    detailText: {
        fontSize: 16,
        backgroundColor: 'skyblue',
        alignItems: 'center',
        justifyContent: 'center'
    },

    chatText:{
        fontSize:16,
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: 'pink'
    },
    bookButton: {
        backgroundColor: '#E86D2C',
        margin: 15,
        height: 35,
        width: '75%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    }
})