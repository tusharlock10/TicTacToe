import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux'
import {
    changePlayerAction
} from '../actions'
import Piece from './Piece';

class Grid extends Component{

    changePlayer(obj){
        console.log('This is the obj: ', obj)
        changePlayerAction()
    }
    

    getRow(){
        const BLANK_PIECE_PATH = '../../assets/images/blank.jpg'
        const O_PIECE_PATH = '../../assets/images/o.jpg'
        const X_PIECE_PATH = '../../assets/images/x.jpg'

        return (
            <View style={{flex:1, justifyContent:'space-between',
            alignItems:'center', flexDirection:'row'}}>
                <Piece image={require(O_PIECE_PATH)}
                height={100}
                obj={12345678}
                onPress={this.changePlayer.bind(this, 1)}/>
                <Piece image={require(X_PIECE_PATH)}
                height={100}/>
                <Piece image={require(BLANK_PIECE_PATH)}
                height={100}/>
            </View>
        )
    }
    

    renderGrid(){
        

        return (
        <View
        style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <View style={{flex:1.2}}/>
            {this.getRow()}
            {this.getRow()}
            {this.getRow()}
            <View style={{flex:1.2}}/>
        </View>
        )
    }
    render(){
        
        return (
        
            <View style={{flex:1}}>
                {this.renderGrid()}
            </View>
        )
    }
}

export default connect(null, {
    changePlayerAction
})(Grid);