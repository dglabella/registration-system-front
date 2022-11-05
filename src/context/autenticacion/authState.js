
import React, {useReducer} from 'react';
import {REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION, SET_PAGINA_ACTUAL } from '../../types';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = (props) => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado:null,
        usuario:null,
        mensaje:null,
        paginaActual:''
    };

    const [state, dispatch]=useReducer(AuthReducer, initialState);   
    

    //Retornar Usuario Autenticado
    /*const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            //coloco el token en el encabezado para enviarlo
            tokenAuth(token);    
        }
        try{
            const respuesta = await clienteAxios.get('/api/auth');
            console.log(respuesta.data.user);
            dispatch({
                type:OBTENER_USUARIO,
                payload: respuesta.data.user
            });
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type:LOGIN_ERROR,    
            });    
        }
    }*/

    //Registrar Usuario
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/users', datos);
            console.log(respuesta.data);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data 
            });

            //console.log(respuesta.data.user);
            
            //Obtener Usuario Autenticado
            //usuarioAutenticado();

        } catch (error) {
            console.log(error);
            const alerta = {
                //msg:error.response.data.msg,
                msg:error.message,
                categoria:"danger"
            }
            dispatch({
                type:REGISTRO_ERROR,
                payload: alerta
            });    
        }
    }

    //Cuando el usuario inicia sesión
    const iniciarSesion = async (usuario)=>{
        try {
            const respuesta = await clienteAxios.post('/login', usuario);
            console.log(respuesta.data);    
            /*dispatch({
                type:LOGIN_EXITOSO,
                payload:respuesta.data 
            });

            //Obtener Usuario Autenticado
            usuarioAutenticado();*/

        } catch (error) {
            //console.log(error.response.data.msg);
            const alerta = {
                //msg:error.response.data.msg,
                msg:"Error en Inicio se Sesión",
                categoria:"danger"
            }
            dispatch({
                type:LOGIN_ERROR,
                payload: alerta
            });    
        }
    }

    const setPaginaActual=(nombre)=>{
        dispatch({
            type:SET_PAGINA_ACTUAL,
            payload:nombre
        })
    }

    //Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type:CERRAR_SESION
        })
    }
    
    return (
        <AuthContext.Provider
            value={{
                token:state.token,
                autenticado:state.autenticado,
                usuario:state.usuario,
                mensaje:state.mensaje,
                paginaActual:state.paginaActual,
                registrarUsuario:registrarUsuario,
                iniciarSesion:iniciarSesion,
                //usuarioAutenticado,
                setPaginaActual:setPaginaActual,
                cerrarSesion:cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
