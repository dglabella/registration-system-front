import React, {useReducer, useEffect, useState} from 'react';
import UsuariosContext from './usuariosContext';
import UsuariosReducer from './usuariosReducer';
import {GET_USERS, ADD_USER, SHOW_USER, SELECT_USER, UNSELECT_USER, ERROR_USER, DELETE_USER, EDIT_USER} from '../../types'
import clienteAxios from '../../config/axios';


const UsuariosState = (props) => {
    
    const initialState = {
        usuarios:[],
        //paginaUsuario:[],
        cantidadUsuarios:0,
        formulario:false,
        errorFormulario: false,
        mostrar:false,
        usuarioSeleccionado:{},
        mensaje:null,
        activeItem:0
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(UsuariosReducer, initialState);

    const obtenerUsuarios = async () => {
        
        try {
            const result = await clienteAxios.get(`/users`);
            console.log(result);
         
            dispatch({
                type: GET_USERS,
                payload: result.data
            });
        } catch (error) {
            const alert = {
                msg: 'Error solicitando Usuarios', //error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_USER,
                payload:alert
            });
        }
    }


    const verUsuario = (usuario, estado) => { 
        dispatch({
            type:SHOW_USER,
            payload:{usuario,estado}
        });
    }

    const seleccionarUsuario = (usuario)=>{
        dispatch({
            type:SELECT_USER,
            payload:usuario    
        });
    }

    const deseleccionarUsuario = ()=>{
        dispatch({
            type:UNSELECT_USER   
        });
    }

    return(
        <UsuariosContext.Provider
            value={{
                mostrar: state.mostrar,
                usuarioSeleccionado: state.usuarioSeleccionado,
                usuarios:state.usuarios,
                mensaje:state.mensaje,
                cantidadUsuarios:state.cantidadUsuarios,
                //agregarUsuario: agregarUsuario,
                //editarUsuario:editarUsuario,
                obtenerUsuarios: obtenerUsuarios,
                //buscarUsuarios: buscarUsuarios,
                verUsuario: verUsuario,
                seleccionarUsuario: seleccionarUsuario,
                deseleccionarUsuario: deseleccionarUsuario,
                //eliminarUsuario: eliminarUsuario, 
            }}
        >
            {props.children}    
        </UsuariosContext.Provider>    
    );


}

export default UsuariosState;