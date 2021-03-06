import _ from 'lodash';
import {PLAYER_PLAYED, CLEAR_GRID} from '../actions/types';

const BLANK_PIECE = 0;
const O_PIECE = 1,
  O2_PIECE = 2,
  O3_PIECE = 3;
const X_PIECE = 4,
  X2_PIECE = 5,
  X3_PIECE = 6;

const O_PIECE_LIST = [O_PIECE, O2_PIECE, O3_PIECE];
const X_PIECE_LIST = [X_PIECE, X2_PIECE, X3_PIECE];

const FADED_ADDER = 7;

const INITIAL_STATE = {
  player: _.sample(['X', 'O']),
  gridState: [
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
    BLANK_PIECE,
  ],
  won: false,
};

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const change_player = player => {
  if (player === 'X') {
    return 'O';
  }

  return 'X';
};

const update_gridState = (index, gridState, player) => {
  // Replace the BLANK_PIECE with the specific player's piece
  let new_piece, playable;
  if (player === 'X') {
    new_piece = _.sample(O_PIECE_LIST);
  } else {
    new_piece = _.sample(X_PIECE_LIST);
  }

  if (gridState[index] === BLANK_PIECE) {
    gridState[index] = new_piece;

    // Check if player won or its a draw
    obj = check_win(gridState, new_piece);
    gridState = obj.gridState;
    won = obj.won;
    if (won) {
      playable = false;
    } else {
      playable = true;
    }
  } else {
    return {gridState: gridState, playable: false, won: false};
  }

  return {gridState: gridState, playable: playable, won: won};
};

const convert_to_faded = (gridState, combo) => {
  let new_gridState = [],
    new_piece;
  gridState.map((piece, index) => {
    if (combo.includes(index)) {
      new_piece = piece;
    } else {
      new_piece = piece + FADED_ADDER;
    }

    new_gridState.push(new_piece);
  });

  return new_gridState;
};

const check_draw = gridState => {
  won = 'draw';
  // returns 'draw' if no BLANK_PIECES are left

  gridState.map(piece => {
    if (piece == BLANK_PIECE) {
      won = false;
    }
  });
  return won;
};

const checker_helper = (gridState_index, piece_list) => {
  let check = false;
  piece_list.map(piece => {
    if (gridState_index === piece) {
      check = true;
    }
  });
  return check;
};

const check_win = (gridState, piece) => {
  let won = false;
  let piece_list;
  if (O_PIECE_LIST.includes(piece)) {
    piece_list = O_PIECE_LIST;
  } else {
    piece_list = X_PIECE_LIST;
  }

  WINNING_COMBOS.map(combo => {
    index1 = combo[0];
    index2 = combo[1];
    index3 = combo[2];

    check1 = checker_helper(gridState[index1], piece_list);
    check2 = checker_helper(gridState[index2], piece_list);
    check3 = checker_helper(gridState[index3], piece_list);

    if (check1 && check2 && check3) {
      gridState = convert_to_faded(gridState, combo);
      won = true;
    }
  });

  if (!won) {
    won = check_draw(gridState);
  }
  return {gridState: gridState, won: won};
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PLAYER_PLAYED:
      let new_player = state.player,
        new_gridState = state.gridState;
      let playable,
        won = state.won;

      // Update the gridState with the player symbol
      if (!won) {
        obj = update_gridState(action.payload, state.gridState, state.player);
        new_gridState = obj.gridState;
        playable = obj.playable;
        won = obj.won;

        // Change the player to the other symbol
        if (playable) {
          new_player = change_player(state.player);
        }
      }

      return {player: new_player, gridState: new_gridState, won: won};

    case CLEAR_GRID:
      return {
        player: _.sample(['X', 'O']),
        gridState: [
          BLANK_PIECE,
          BLANK_PIECE,
          BLANK_PIECE,
          BLANK_PIECE,
          BLANK_PIECE,
          BLANK_PIECE,
          BLANK_PIECE,
          BLANK_PIECE,
          BLANK_PIECE,
        ],
        won: false,
      };

    default:
      return state;
  }
};
