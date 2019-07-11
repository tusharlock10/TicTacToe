import React from 'react';
import { TouchableOpacity, Image, StatusBar } from 'react-native';

const SUN = require('../../assets/images/sun.png')
const MOON = require('../../assets/images/moon.png')


const getImage = (theme) => {
    if (theme==='light'){
        return SUN
    }
    return MOON 
}

const ThemeButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Image source={getImage(props.theme)} style={{width:30, height:30}}/>
        </TouchableOpacity>
    )

}


export default ThemeButton;