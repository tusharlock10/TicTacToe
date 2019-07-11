import React, {Component} from 'react';
import { View } from 'react-native';
import Grid from './Grid'

class Main extends Component{
    render(){
        return (
            <View style={{flex:1}}>
                <Grid/>
            </View>
        )
    }
}

export default Main;

