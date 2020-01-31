import React from 'react';
import {TouchableOpacity} from 'react-native';
import {LIGHT_COLOR, DARK_COLOR_ICONS, CROSS_BUTTON} from './Static';
import Image from 'react-native-fast-image';
// import { NoFlickerImage } from 'react-native-no-flicker-image';

const ClearButton = props => {
  let color = LIGHT_COLOR;
  if (props.theme === 'light') {
    color = DARK_COLOR_ICONS;
  }

  return (
    <TouchableOpacity
      style={[styles.TOStyling, {backgroundColor: color}]}
      onPress={props.onPress}
      activeOpacity={1}>
      <Image style={styles.ImageStyling} source={CROSS_BUTTON} />
    </TouchableOpacity>
  );
};

const styles = {
  TOStyling: {
    height: 64,
    width: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 7,
  },
  ImageStyling: {
    height: 36,
    width: 36,
  },
};

export default ClearButton;
