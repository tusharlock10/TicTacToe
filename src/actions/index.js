import {
    CHANGE_PLAYER
} from './types'

export const changePlayerAction=()=>{
    console.log('Hi dear')
    return {
        type:CHANGE_PLAYER
    }
}