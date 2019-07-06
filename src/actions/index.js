import {
    PLAYER_PLAYED
} from './types'

export const PlayedAction=(index)=>{
    return {
        type:PLAYER_PLAYED,
        payload: index
    }
}