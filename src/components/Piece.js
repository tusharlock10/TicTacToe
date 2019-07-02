import React from 'react';
import {View, Image, TouchableHighlight} from 'react-native';

const Piece = (props) => {
    console.log('Here')
    return (
        <TouchableHighlight onPress={() => {console.log('Hello Pressed')}}
        activeOpacity={1}>
            <Image 
                source={props.image}
                style={{height:props.height, width:props.height}}/>
        </TouchableHighlight>

    )
}

export default Piece;