import React from 'react';
import {Image, TouchableOpacity} from 'react-native';



const Piece = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}
        activeOpacity={1}>
            <Image 
                source={props.image}
                style={{height:props.height, width:props.height, borderRadius:45}}/>
        </TouchableOpacity>

    )
}

export default Piece;