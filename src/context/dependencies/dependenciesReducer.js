import {GET_DEPENDENCIES, ERROR_DEPENDENCIE } from '../../types';

export default (state, action)=>{
    switch(action.type){
        case GET_DEPENDENCIES : return{
            ...state,
            dependencies: action.payload,
        }
        case ERROR_DEPENDENCIE: return{
            ...state,
            mensaje:action.payload.msg 
        }
    }
}