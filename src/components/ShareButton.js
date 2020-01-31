import React from 'react';
import { TouchableOpacity, Share } from 'react-native';
import {SHARE_LIGHT, SHARE_DARK} from './Static';
import Image from 'react-native-fast-image';
// import { NoFlickerImage } from 'react-native-no-flicker-image';


const onClick = () => {
    Share.share({
      message: 'Hey, checkout this cool game of Tic Tac Toe. You\'ll surely love playing it.\nhttps://play.google.com/store/apps/details?id=com.tjproductions.tictactoe',
      url: 'https://play.google.com/store/apps/details?id=com.tjproductions.tictactoe',
      title: 'Hey, Checkout this new game'
    }, {
      dialogTitle: 'Hey, Checkout this new game'
    })
}

const ShareButton = (props) => {
    let image = SHARE_LIGHT;
    if (props.theme==='light'){
        image = SHARE_DARK
    }

    return(
        <TouchableOpacity style={[styles.TOStyling]} onPress={() => {onClick()}}>
            <Image style={styles.ImageStyling} 
            source={image}/>
        </TouchableOpacity>
    )
}

const styles = {
    TOStyling:{
        height:40,
        width:40,
        justifyContent:'center',
        alignItems:'center'
    },
    ImageStyling:{
        height:42,
        width:42
    }
}

export default ShareButton;