import React, {Component} from 'react';
import {View, Text} from 'react-native';

class TicTacToe extends Component{
    render(){
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>This is a TTT</Text>
            </View>
        )
    }
}

export default TicTacToe;