import React from 'react';
import { TouchableOpacity,Linking } from 'react-native';
import {DARK_COLOR_ICONS, LIGHT_COLOR, RATING_IMAGE} from './Static';
import Image from 'react-native-fast-image';
// import { NoFlickerImage } from 'react-native-no-flicker-image';
import data from '../../app.json'

const onClick =()=>{
    let appID = data.android.package;
   StoreLink = `https://play.google.com/store/apps/details?id=${appID}`;
   Linking.openURL(StoreLink);
}

const ShareButton = (props) => {
    let color = LIGHT_COLOR
    if (props.theme==='light'){
        color=DARK_COLOR_ICONS
    }

    return(
        <TouchableOpacity style={[styles.TOStyling, {backgroundColor:color}]} onPress={() => {onClick()}}>
            <Image style={styles.ImageStyling} 
            source={RATING_IMAGE}/>
        </TouchableOpacity>
    )
}

const styles = {
    TOStyling:{
        height:42,
        width:42,
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        elevation:7
    },
    ImageStyling:{
        height:26,
        width:26,
        marginBottom:5
    }
}

export default ShareButton;