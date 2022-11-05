import {GET_PERSONS, ADD_PERSON, EDIT_PERSON, DELETE_PERSON, SELECT_PERSON, UNSELECT_PERSON, INFO_PERSONS, SHOW_PERSON, SET_ACTIVE_PAGE_PERSONS} from '../../types'

export default (state, action)=>{
    
    //console.log(`ENTRANDO ...MOSTRAR: ${state.mostrar} `);    
    //console.log("ENTRANDO: " + action.payload );
    console.log(action.payload);

    switch(action.type){
        case GET_PERSONS: return{
            ...state,
            mensaje:null,
            personal: action.payload,
            cantidadPersonal:action.payload.length
        }
        case ADD_PERSON: return{
            ...state,
            //mensaje:null,
            //personal:[...state.personal, action.payload],
            mensaje:action.payload
        } 
        case EDIT_PERSON: return{
            ...state,
            //personal: state.personal.map(person => person.id===action.payload.id ? action.payload : person ),
            personal: state.personal.map(person => person.id===action.payload.data.id ? action.payload.data : person ),
            mensaje:action.payload.info
        } 
        case DELETE_PERSON: return{
            ...state,
            personal: state.personal.filter( person => person.id!==action.payload.data.id ),
            mensaje:action.payload.info,
        }
        case SELECT_PERSON: return{
            ...state,
            selectedPerson:action.payload    
        }
        case UNSELECT_PERSON: return{
            ...state,
            selectedPerson:null   
        }
        case SHOW_PERSON: return{
            ...state,
            showCredential:action.payload
        }
        case SET_ACTIVE_PAGE_PERSONS: return{
            ...state,
            activePage:action.payload
        }
        case INFO_PERSONS: return{
            ...state,
            selectedPerson:null,
            mensaje:action.payload
        }
        default:
            return state;
    }
}