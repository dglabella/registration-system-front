import React, {useReducer, useEffect, useState} from 'react';
import UsuariosContext from './usuariosContext';
import UsuariosReducer from './usuariosReducer';
import {OBTENER_USUARIOS, AGREGAR_USUARIO, EDITAR_USUARIO, ELIMINAR_USUARIO, SELECCIONAR_USUARIO, DESELECCIONAR_USUARIO, VER_USUARIO, ERROR_USUARIO, REINICIAR_MENSAJE } from '../../types'
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

 
    //useEffect(()=>{
        //obtenerUsuarios();
        //console.log("USE EFFECT clienteState");    
    //},[state.usuarios]);

    

    const obtenerUsuarios = async () => {
        
        try {
            console.log('.....1....');
            const resultado = await clienteAxios.get(`/usuarios`);
            console.log(resultado);
            console.log('....FIN 1.....');
            
            dispatch({
                type: OBTENER_USUARIOS,
                payload: resultado.data
            });
        } catch (error) {
            const alerta = {
                msg: 'Error solicitando Usuarios', //error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_USUARIO,
                payload:alerta
            });
        }
    }

    /*const buscarUsuarios = async (parametro='', tipoBusqueda=0, page=0, size=15) => {
        try {

            const resultado = await clienteAxios.get(`api/clientes/search?tipo=${tipoBusqueda}&parametro=${parametro}&page=${page}&size=${size}`);
          
            dispatch({
                type: OBTENER_CLIENTES,
                payload: resultado.data
            });
            
            console.log(resultado);
            console.log('++++++ /// 2 /// +++++++');   
            
        } catch (error) {
            const alerta = {
                msg:error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:CLIENTE_ERROR,
                payload:alerta
            });
        }
    }*/

    const agregarUsuario = async (usuario) => {
        //console.log(cliente);
        //console.log('..............................................................');
        try {
            const resultado = await clienteAxios.post('/api/usuarios', usuario);
            //console.log(resultado);
            dispatch({
                type:AGREGAR_USUARIO,
                payload:resultado.data
            });

        } catch (error) {
            const alerta = {
                msg:error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_USUARIO,
                payload:alerta
            });
        }
    }

    const editarUsuario = async (usuario) => {
        try {
            const resultado = await clienteAxios.put(`/api/usuarios/${usuario.id}`, usuario);
            //console.log(resultado);
            dispatch({
                type:EDITAR_USUARIO,
                payload:resultado.data
            });

        } catch (error) {
            const alerta = {
                msg:error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_USUARIO,
                payload:alerta
            });
        }
    }

    const eliminarUsuario = async (usuario, activeItem) => {
        try {
            const resultado = await clienteAxios.delete(`/api/usuarios/${usuario.usuarioId}`);
            const idEliminado=usuario.usuarioId;
            const alerta = {
                msg:"Cliente Eliminado",
                categoria:"secondary"
            }
            if(resultado.status==200){
                
                //let clientesResultantes=state.clientes.filter( (cliente) => cliente.clienteId!==idEliminado );    
                dispatch({
                    type:ELIMINAR_USUARIO,
                    payload:{idEliminado, alerta}
                });

                //const resultado=state.clientes.slice( ((15*activeItem)-15), (15*activeItem) );
                //console.log(resultado);
                /*dispatch({
                    type:MOSTRAR_PAGINA,
                    payload:clientesResultantes
                });*/
                
            }

               
        } catch (error) {
            const alerta = {
                msg:error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_USUARIO,
                payload:alerta
            });    
        } 
    }


    const verUsuario = (usuario, estado) => { 
        dispatch({
            type:VER_USUARIO,
            payload:{usuario,estado}
        });
    }

    const seleccionarUsuario = (usuario)=>{
        dispatch({
            type:SELECCIONAR_USUARIO,
            payload:usuario    
        });
    }

    const deseleccionarUsuario = ()=>{
        dispatch({
            type:DESELECCIONAR_USUARIO   
        });
    }

    const reiniciarMensaje = () =>{
        setTimeout(()=>{
            dispatch({
                type:REINICIAR_MENSAJE
            });    
        }, 1000);
    }

    return(
        <UsuariosContext.Provider
            value={{
                mostrar: state.mostrar,
                usuarioSeleccionado: state.usuarioSeleccionado,
                usuarios:state.usuarios,
                mensaje:state.mensaje,
                cantidadUsuarios:state.cantidadUsuarios,
                agregarUsuario: agregarUsuario,
                editarUsuario:editarUsuario,
                obtenerUsuarios: obtenerUsuarios,
                //buscarUsuarios: buscarUsuarios,
                verUsuario: verUsuario,
                seleccionarUsuario: seleccionarUsuario,
                deseleccionarUsuario: deseleccionarUsuario,
                eliminarUsuario: eliminarUsuario,
                reiniciarMensaje:reiniciarMensaje,  
            }}
        >
            {props.children}    
        </UsuariosContext.Provider>    
    );


}

export default UsuariosState;