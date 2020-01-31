import { CHANGE_THEME } from '../actions/types'
import {
    LIGHT_COLOR,
    DARK_COLOR } from '../components/Static'

const INITIAL_STATE = {
    theme: 'dark',
    backgroundColor: DARK_COLOR
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CHANGE_THEME:
            if (state.theme==='light'){
                return {backgroundColor:DARK_COLOR, theme:'dark'}
            }

            return {backgroundColor:LIGHT_COLOR, theme:'light'}


        default:
            return state
    }

}