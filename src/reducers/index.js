import {combineReducers} from 'redux';
import GameReducer from './GameReducer';
import ThemeReducer from './ThemeReducer';
import HeaderReducer from './HeaderReducer';

export default combineReducers({
  grid: GameReducer,
  theme: ThemeReducer,
  header: HeaderReducer,
});
