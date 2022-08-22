import {OBTENER_USUARIOS, AGREGAR_USUARIO, EDITAR_USUARIO, ELIMINAR_USUARIO, SELECCIONAR_USUARIO, DESELECCIONAR_USUARIO, VER_USUARIO, ERROR_USUARIO, REINICIAR_MENSAJE } from '../../types'

export default (state, action)=>{
    
    //console.log(`ENTRANDO ...MOSTRAR: ${state.mostrar} `);    
    //console.log("ENTRANDO: " + action.payload );

    switch(action.type){
        
        case AGREGAR_USUARIO: return{
            ...state,
            mensaje:null,
            usuarios:[...state.usuarios, action.payload],
        } 
        case EDITAR_USUARIO: return{
            ...state,
            usuarios: state.usuarios.map(usuario => usuario.usuarioId===action.payload.usuarioId ? action.payload : usuario ),
        }
        case ELIMINAR_USUARIO: return {
            ...state,
            usuarios: state.usuarios.filter( usuario => usuario.usuarioId!==action.payload.idEliminado ),
            mensaje:action.payload.alerta,
        }  
        case OBTENER_USUARIOS: return{
            ...state,
            mensaje:null,
            usuarios: action.payload,
            cantidadUsuarios:action.payload.length
        }  
        case VER_USUARIO: return {
            ...state,
            usuarioSeleccionado:action.payload.usuario,
            mostrar:action.payload.estado
        }
        case SELECCIONAR_USUARIO: return{
            ...state,
            usuarioSeleccionado:action.payload    
        }
        case DESELECCIONAR_USUARIO: return {
            ...state,  
        }
        case ERROR_USUARIO: return{
            ...state,
            mensaje:action.payload.msg 
        }
        case REINICIAR_MENSAJE: return{
            ...state,
            mensaje:null
        }
        default:
            return state;
    }
}