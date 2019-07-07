import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const ClearButton = (props) => {
    return(
        <TouchableOpacity style={styles.TOStyling} onPress={props.onPress}>
            <Image style={styles.ImageStyling} source={require('../../assets/images/ResetCross.png')}/>
        </TouchableOpacity>
    )
}

const styles = {
    TOStyling:{
        height:50,
        width:50,
        backgroundColor:"rgb(255, 255, 255)",
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