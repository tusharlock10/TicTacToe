import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux'
import {
    PlayedAction
} from '../actions'
import Piece from './Piece';

class Grid extends Component{

    Play(index){
        this.props.PlayedAction(index)
    }
    

    getRow(indexList){
        const screenWidth = Dimensions.get('window').width
        // indexList = [0, 1, 2] for eg.
        const {gridState} = this.props

        return (
            <View style={{flex:1, width:screenWidth, justifyContent:'space-around',
            alignItems:'center', flexDirection:'row'}}>

                <Piece image={gridState[indexList[0]]}
                height={110}
                onPress={this.Play.bind(this, indexList[0])}/>

                <Piece image={gridState[indexList[1]]}
                height={110}
                onPress={this.Play.bind(this, indexList[1])}/>

                <Piece image={gridState[indexList[2]]}
                height={110}
                onPress={this.Play.bind(this, indexList[2])}/>

            </View>
        )
    }
    

    renderGrid(){
        return (
        <View
        style={{justifyContent:'center', alignItems:'center', flex:1}}>
            <View style={{flex:1}}/>
            <View style={{flex:3.1}}>
                {this.getRow([0, 1, 2])}
                {this.getRow([3, 4, 5])}
                {this.getRow([6, 7, 8])}
            </View>
            <View style={{flex:1}}/>
 
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

const mapStateToProps = (state) => {
    return {
        player: state.grid.player,
        gridState: state.grid.gridState
    }
}

export default connect( mapStateToProps, {
    PlayedAction
})(Grid);