import React, {Component} from 'react';
import { View, Text } from 'react-native';
import Grid from './Grid'

class Main extends Component{
    render(){
        return (
            <View style={{flex:1, backgroundColor:'rgb(50,50,50)'}}>
                <Grid/>
            </View>
        )
    }
}

export default Main;

