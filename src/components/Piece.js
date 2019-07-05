import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const Piece = (props) => {
    console.log('Here')
    return (
        <TouchableOpacity onPress={props.onPress}
        activeOpacity={1}>
            <Image 
                source={props.image}
                style={{height:props.height, width:props.height}}/>
        </TouchableOpacity>

    )
}

export default Piece;