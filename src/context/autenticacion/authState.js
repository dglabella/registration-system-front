
import React, {useReducer} from 'react';
import {REGISTRO_EXITOSO, REGISTRO_ERROR, OBTENER_USUARIO, LOGIN_EXITOSO, LOGIN_ERROR, CERRAR_SESION } from '../../types';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = (props) => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado:null,
        usuario:null,
        mensaje:null
    };

    const [state, dispatch]=useReducer(AuthReducer, initialState);   
    

    //Retornar Usuario Autenticado
    const usuarioAutenticado = async ()=>{
        const token = localStorage.getItem('token');
        if(token){
            //coloco el token en el encabezado para enviarlo
            tokenAuth(token);    
        }
        try{
            const respuesta = await clienteAxios.get('/api/auth');
            //console.log(respuesta.data.usuario);
            dispatch({
                type:OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type:LOGIN_ERROR,    
            });    
        }
    }

    //Registrar Usuario
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);
            dispatch({
                type:REGISTRO_EXITOSO,
                payload:respuesta.data 
            });
            
            //Obtener Usuario Autenticado
            //usuarioAutenticado();

        } catch (error) {
            //console.log(error);
            const alerta = {
                msg:error.response.data.msg,
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
            const respuesta = await clienteAxios.post('/usuarios/login', usuario);
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
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
