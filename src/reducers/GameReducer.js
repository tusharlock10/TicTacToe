import { PLAYER_PLAYED } from "../actions/types";

const BLANK_PIECE = require("../../assets/images/blank.png");
const X_PIECE = require("../../assets/images/x.png");
const O_PIECE = require("../../assets/images/o.png");

const BLANK_PIECE_FADED = require("../../assets/images/blank_faded.png");
const X_PIECE_FADED = require("../../assets/images/x_faded.png");
const O_PIECE_FADED = require("../../assets/images/o_faded.png");

var INITIAL_STATE = {
  player: "X",
  gridState: [
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE
  ],
  won: false
};

const WINNING_COMBOS = [
  [0, 1,2], [3, 4,5], [6, 7,8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

const change_player = player => {
  if (player === "X") {
    return "O";
  }

  return "X";
};

const update_gridState = (index, gridState, player) => {
  // Replace the BLANK_PIECE with the specific player's piece
  var new_piece, playable;
  if (player === "X") {
    new_piece = X_PIECE;
  } else {
    new_piece = O_PIECE;
  }

  if (gridState[index] === BLANK_PIECE){
    gridState[index] = new_piece
    
    // Check if player won
    obj = check_win(gridState, new_piece)
    gridState = obj.gridState
    won = obj.won
    if (won){
      playable = false
    }
    else{
      playable = true
    }
  }
  else{

    return {gridState: gridState, playable:false, won: false}
  }

  

  return {gridState: gridState, playable:playable, won:won}
};

const convert_to_faded =(gridState, combo) => {
  var new_gridState = [], new_piece;
  gridState.forEach(
    (piece, index) => {
      if (combo.includes(index)){
        new_piece = piece

      }
      else if (piece === BLANK_PIECE){
        new_piece = BLANK_PIECE_FADED
      }

      else if(piece===X_PIECE){
        new_piece=X_PIECE_FADED
      }
      else{
        new_piece = O_PIECE_FADED
      }

      new_gridState.push(new_piece)
    }
  )

  return new_gridState

}

const check_win=(gridState, piece)=>{
  var won = false;
  WINNING_COMBOS.forEach(
    (combo) => {
      index1 = combo[0]
      index2 = combo[1]
      index3 = combo[2]
      
      check1 = gridState[index1] === piece
      check2 = gridState[index2] === piece
      check3 = gridState[index3] === piece

      if (check1 && check2 && check3) {

        gridState = convert_to_faded(gridState, combo)
        won= true

      }

    }
  )

  return {gridState: gridState, won: won} 

}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case PLAYER_PLAYED:
        
      var new_player = state.player, new_gridState, playable, won;

      // Update the gridState with the player symbol
      obj = update_gridState(action.payload, state.gridState, state.player);
      new_gridState = obj.gridState
      playable = obj.playable 
      won = obj.won    

      // Change the player to the other symbol
      if (playable)
        {
          new_player = change_player(state.player);
        }
      
        if (won) {
          INITIAL_STATE.player = change_player(state.player);
        }

      return {player: new_player, gridState: new_gridState, won:won}

      


    default:
      return state;
  }
};
