import React, {useReducer, useEffect, useState} from 'react';
import PersonalContext from './personalContext';
import PersonalReducer from './personalReducer';
import {GET_PERSONAL, ADD_PERSONAL, EDIT_PERSONAL, DELETE_PERSONAL, SELECT_PERSONAL, UNSELECT_PERSONAL, SHOW_PERSON, ERROR_PERSONAL, RESET_MESSAGE} from '../../types'
import clienteAxios from '../../config/axios';


const PersonalState = (props) => {
    
    const initialState = {
        personal:[],
        //paginaUsuario:[],
        //cantidadPersonla:0,
        //formulario:false,
        //errorFormulario: false,
        //mostrar:false,
        message:null,
        personSelected:{
            /*id:'',
            personLastName:'',
            personName:'',
            dni:'',
            email:'',
            active:false,
            dependency:{
                active: false, 
                description:'', 
                id:'', 
                name:''
            }*/
        },
        //activeItem:0
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(PersonalReducer, initialState);

    const getPersonal = async () => {
        try {
            const result = await clienteAxios.get('/persons');
            dispatch({
                type: GET_PERSONAL,
                payload: result.data
            });
        } catch (error) {
            const alert = {
                msg: 'Error solicitando Personal', //error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_PERSONAL,
                payload:alert
            });
        }
    }

    const addPersonal = async (person) => {
        try {
            const response = await clienteAxios.post('/persons', person);
            console.log(response.data);
            dispatch({
                type:ADD_PERSONAL,
                payload:response.data 
            });
        } catch (error) {
            console.log(error);
            const alerta = {
                msg:error.message,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_PERSONAL,
                payload: alerta
            });    
        }
    }

    const editPersonal = async (person) => {
        try {
            const response = await clienteAxios.put(`/persons/${person.id}`, person);
            console.log(response.data);
            dispatch({
                type:EDIT_PERSONAL,
                payload:response.data 
            });
        } catch (error) {
            console.log(error);
            const alerta = {
                msg:error.message,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_PERSONAL,
                payload: alerta
            });    
        }
    }

    const selectPerson = (person)=>{
        dispatch({
            type:SELECT_PERSONAL,
            payload:person    
        });
    }

    const showPerson = (person) => { 
        dispatch({
            type:SHOW_PERSON,
            payload:{person}
        });
    }


    return(
        <PersonalContext.Provider
            value={{
                //mostrar: state.mostrar,
                //usuarioSeleccionado: state.usuarioSeleccionado,
                personal:state.personal,
                personSelected:state.personSelected,
                //mensaje:state.mensaje,
                //cantidadUsuarios:state.cantidadUsuarios,
                addPersonal: addPersonal,
                editPersonal:editPersonal,
                getPersonal: getPersonal,
                showPerson:showPerson,
                //buscarUsuarios: buscarUsuarios,
                //verUsuario: verUsuario,
                //seleccionarUsuario: seleccionarUsuario,
                //deseleccionarUsuario: deseleccionarUsuario,
                //eliminarUsuario: eliminarUsuario,
            }}
        >
            {props.children}    
        </PersonalContext.Provider>    
    );


}

export default PersonalState;