import {
    CHANGE_PLAYER
} from '../actions/types'


const BLANK_PIECE = require('../../assets/images/blank.jpg')
const X_PIECE = require('../../assets/images/x.jpg')
const O_PIECE = require('../../assets/images/o.jpg')

const INITIAL_STATE = {
    player: 'X',
    gridState : [
        BLANK_PIECE, BLANK_PIECE, BLANK_PIECE, 
        BLANK_PIECE, BLANK_PIECE, BLANK_PIECE,
        BLANK_PIECE, BLANK_PIECE, BLANK_PIECE
    ]

}


export default (state =INITIAL_STATE , action)=> {
    console.log(state)

    switch(action.type){

    case CHANGE_PLAYER:
        var new_player;
        if( state.player==="X"){
            new_player="O"
        }
        else{
            new_player="X"
        }
        return {...state, player:new_player}
        

    default:
        
        return state
    
    }

}