import React from 'react';
import {TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';
// import { NoFlickerImage } from 'react-native-no-flicker-image';

const Piece = props => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
      <Image
        source={props.image}
        style={[
          {height: props.height, width: props.height},
          {borderRadius: props.borderRadius},
        ]}
      />
    </TouchableOpacity>
  );
};

export default Piece;
