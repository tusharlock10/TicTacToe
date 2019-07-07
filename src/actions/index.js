import {
    PLAYER_PLAYED,
    CLEAR_GRID,
    CHNAGE_THEME,
    CHANGE_HEADER_COLOR
} from './types'

export const PlayedAction=(index)=>{
    return {
        type:PLAYER_PLAYED,
        payload: index
    }
}

export const ClearGridAction = () =>{
    return {
        type: CLEAR_GRID
    }
}

export const ChangeThemeAction = () =>{
    return {
        type:CHNAGE_THEME
    }
}

export const ChangeHeaderColorAction = (theme) => {
    return {
        type: CHANGE_HEADER_COLOR,
        payload: theme
    }
}