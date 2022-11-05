import React, {useReducer, useContext, useEffect, useState} from 'react';
import PersonalContext from './personalContext';
import PersonalReducer from './personalReducer';
import clienteAxios from '../../config/axios';
import {GET_PERSONS, ADD_PERSON, EDIT_PERSON, DELETE_PERSON, SELECT_PERSON, UNSELECT_PERSON, INFO_PERSONS, SHOW_PERSON, SET_ACTIVE_PAGE_PERSONS} from '../../types'

const PersonalState = (props) => {
    
    const initialState = {
        personal:[],
        activePage:0,
        //cantidadPersonla:0,
        showCredential:false,
        selectedPerson:null,
        mensaje:null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(PersonalReducer, initialState);

    const getPersonById = async (person) => {
        try {
            const result = await clienteAxios.get(`/persons/${person.id}`);
            dispatch({
                type:SELECT_PERSON,
                payload:result.data
            });
            
        } catch (error) {
            //console.log(error)
            const alert = {
                msg: 'Error solicitando Información de Personal', //error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:INFO_PERSONS,
                payload:alert
            });
        }
    }

    const getPersonal = async () => {
        try {
            const result = await clienteAxios.get('/persons');
            //console.log(result)
            dispatch({
                type: GET_PERSONS,
                payload: result.data
            });
        } catch (error) {
            const alert = {
                msg: 'Error solicitando Personal', //error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:INFO_PERSONS,
                payload:alert
            });
        }
    }

    const findPersonal = async (paginationData) => {
        //GET: localhost:8080/persons/paged?page=0&quantity=5
        const {size, page} = paginationData;
        try {
            console.log("findPersonal");
            console.log("size: " + size + " page:" + page);
            const result = await clienteAxios.get(`/persons/paged?page=${page}&quantity=${size}`);
            console.log(result);
            
            dispatch({
                type: GET_PERSONS,
                payload: result.data.resouces
            });

            dispatch({
                type: SET_ACTIVE_PAGE_PERSONS,
                payload: page
            });

        } catch (error) {
            const alert = {
                msg: 'Error solicitando Personal', //error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:INFO_PERSONS,
                payload:alert
            });
        }
    }

    const addPersonal = async (person) => {
        try {
            const response = await clienteAxios.post('/persons', person);
            const info = {msg:`${response.data.personName} ${response.data.personLastName} Ingresado`, categoria:"secondary"};
            dispatch({
                type:INFO_PERSONS,
                payload:info 
            });
            /*console.log(response.data);
            dispatch({
                type:ADD_PERSON,
                payload:response.data 
            });*/
        } catch (error) {
            //console.log(error);
            const alerta = {
                msg:error.response.data.error,
                categoria:"danger"
            }
            dispatch({
                type:INFO_PERSONS,
                payload: alerta
            });    
        }
    }

    const editPersonal = async (person) => {
        try {
            const response = await clienteAxios.put(`/persons/${person.id}`, person);
            const info = {msg:`${response.data.personName} ${response.data.personLastName} Actualizado`, categoria:"secondary"};
            const multiplePayloadResponseAndInfo={data:response.data,info:info}

            dispatch({
                type:EDIT_PERSON,
                payload:multiplePayloadResponseAndInfo
                //payload:response.data 
            });
            
            /*dispatch({
                type:INFO_PERSONS,
                payload:info 
            });*/

        } catch (error) {
            //console.log(error);
            const alerta = {
                msg:error.response.data.error,
                categoria:"danger"
            }
            dispatch({
                type:INFO_PERSONS,
                payload: alerta
            });    
        }
    }

    const deletePersonal = async (person) => {
        try {
            const response = await clienteAxios.delete(`/persons/`,person);
            const info = {msg:`${person.personName} ${person.personLastName} Eliminado`, categoria:"secondary"};
            const multiplePayloadResponseAndInfo={data:person,info:info}

            dispatch({
                type:DELETE_PERSON,
                payload:multiplePayloadResponseAndInfo
                //payload:response.data 
            });      
             
        } catch (error) {
            const alerta = {
                msg:error.response.data.error,
                categoria:"danger"
            }
            dispatch({
                type:INFO_PERSONS,
                payload: alerta
            });
        }
    }

    const showPerson = (show)=>{
        dispatch({
            type:SHOW_PERSON,
            payload:show   
        });
    }

    const getQRImage = (dataImg)=>{
        if(dataImg){
             //const buffer = dataImg;
             //const img = new Buffer.from(buffer).toString("base64");
             const foto = `data:image/png;base64,${dataImg}`;
             return(foto);
        }
         return(null);
     }


    return(
        <PersonalContext.Provider
            value={{
                personal:state.personal,
                selectedPerson:state.selectedPerson,
                mensaje:state.mensaje,
                showCredential:state.showCredential,
                activePage:state.activePage,
                addPersonal: addPersonal,
                editPersonal:editPersonal,
                deletePersonal:deletePersonal,
                findPersonal:findPersonal,
                getPersonal: getPersonal,
                getPersonById:getPersonById,
                showPerson:showPerson,
                getQRImage:getQRImage
            }}
        >
            {props.children}    
        </PersonalContext.Provider>    
    );


}

export default PersonalState;