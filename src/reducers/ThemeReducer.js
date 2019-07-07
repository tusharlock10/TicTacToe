import { CHNAGE_THEME } from '../actions/types'


const LIGHT_COLOR = 'rgb(255,255,255)';
const DARK_COLOR = 'rgb(50,50,50)'

const INITIAL_STATE = {
    theme: 'dark',
    backgroundColor: DARK_COLOR
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case CHNAGE_THEME:
            if (state.theme==='light'){
                return {backgroundColor:DARK_COLOR, theme:'dark'}
            }

            return {backgroundColor:LIGHT_COLOR, theme:'light'}


        default:
            return state
    }

}