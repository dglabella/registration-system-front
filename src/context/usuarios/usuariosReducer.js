import {GET_USERS, ADD_USER, SHOW_USER, SELECT_USER, UNSELECT_USER, ERROR_USER, DELETE_USER, EDIT_USER} from '../../types'

export default (state, action)=>{
    
    //console.log(`ENTRANDO ...MOSTRAR: ${state.mostrar} `);    
    //console.log("ENTRANDO: " + action.payload );

    switch(action.type){
        
        case ADD_USER: return{
            ...state,
            mensaje:null,
            usuarios:[...state.usuarios, action.payload],
        } 
        case EDIT_USER: return{
            ...state,
            usuarios: state.usuarios.map(usuario => usuario.usuarioId===action.payload.usuarioId ? action.payload : usuario ),
        }
        case DELETE_USER: return {
            ...state,
            usuarios: state.usuarios.filter( usuario => usuario.usuarioId!==action.payload.idEliminado ),
            mensaje:action.payload.alerta,
        }  
        case GET_USERS: return{
            ...state,
            mensaje:null,
            usuarios: action.payload,
            cantidadUsuarios:action.payload.length
        }  
        case SHOW_USER: return {
            ...state,
            usuarioSeleccionado:action.payload.usuario,
            mostrar:action.payload.estado
        }
        case SELECT_USER: return{
            ...state,
            usuarioSeleccionado:action.payload    
        }
        case UNSELECT_USER: return {
            ...state,  
        }
        case ERROR_USER: return{
            ...state,
            mensaje:action.payload.msg 
        }
        default:
            return state;
    }
}