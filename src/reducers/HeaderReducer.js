import { Text } from 'react-native';
import React from 'react';
import {CHANGE_HEADER_COLOR} from '../actions/types'




const INITIAL_STATE={
    theme:'dark',
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case CHANGE_HEADER_COLOR:
            return {...state, theme:action.payload}

        default:
            return state
    }
}