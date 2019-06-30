import React from 'react';
import { View } from 'react-native';
import TicTacToe from './src/components/TicTacToe';

export default function App() {
  return (
    <View style={{flex:1}}>
      <TicTacToe/>
    </View>
  );
}