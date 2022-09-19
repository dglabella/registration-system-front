import {GET_PERSONAL, ADD_PERSONAL, EDIT_PERSONAL, DELETE_PERSONAL, SELECT_PERSONAL, UNSELECT_PERSONAL, SHOW_PERSON, ERROR_PERSONAL, RESET_MESSAGE} from '../../types'

export default (state, action)=>{
    
    //console.log(`ENTRANDO ...MOSTRAR: ${state.mostrar} `);    
    //console.log("ENTRANDO: " + action.payload );

    switch(action.type){
                
        case GET_PERSONAL: return{
            ...state,
            message:null,
            personal: action.payload,
            cantidadPersonal:action.payload.length
        }
        case ADD_PERSONAL: return{
            ...state,
            mensaje:null,
            personal:[...state.personal, action.payload],
        } 
        case EDIT_PERSONAL: return{
            ...state,
            personal: state.personal.map(person => person.id===action.payload.id ? action.payload : person ),
        } 
        case DELETE_PERSONAL: return{
            ...state,
            personal: state.personal.filter( person => person.Id!==action.payload.deletedId ),
            message:action.payload.alert,
        }
        case SELECT_PERSONAL: return{
            ...state,
            personSelected:action.payload    
        }
        case SHOW_PERSON: return{
            ...state,
            personSelected: action.payload.person,

        } 
        case ERROR_PERSONAL: return{
            ...state,
            message:action.payload.msg 
        }
        case RESET_MESSAGE: return{
            ...state,
            message:null
        }
        default:
            return state;
    }
}