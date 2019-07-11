import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {LIGHT_COLOR, DARK_COLOR} from './Static'


const ClearButton = (props) => {
    var color=LIGHT_COLOR;
    if (props.theme==='light'){
        color = DARK_COLOR
    }

    return(
        <TouchableOpacity style={[styles.TOStyling, {backgroundColor:color}]} onPress={props.onPress}>
            <Image style={styles.ImageStyling} 
            source={require('../../assets/images/ResetCross.png')}/>
        </TouchableOpacity>
    )
}

const styles = {
    TOStyling:{
        height:50,
        width:50,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center'
    },
    ImageStyling:{
        height:24,
        width:24
    }
}

export default ClearButton;