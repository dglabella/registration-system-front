import React, {useReducer} from 'react';
import DependenciesContext from './dependenciesContex';
import DependenciesReducer from './dependenciesReducer';
import {GET_DEPENDENCIES, ERROR_DEPENDENCIE} from '../../types'
import clienteAxios from '../../config/axios';


const DependenciesState = (props) => {
    
    const initialState = {
                dependencies:[],
                message:null,
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(DependenciesReducer, initialState);

    const getDependencies = async () => {
        try {
            const result = await clienteAxios.get('/dependencies');
            //console.log(result.data);
            dispatch({
                type: GET_DEPENDENCIES,
                payload: result.data
            });
        } catch (error) {
            const alert = {
                msg: 'Error solicitando Dependencias', //error.response.data.msg,
                categoria:"danger"
            }
            dispatch({
                type:ERROR_DEPENDENCIE,
                payload:alert
            });
        }
    }

    return(
        <DependenciesContext.Provider
            value={{
                dependencies:state.dependencies,
                getDependencies: getDependencies,
            }}
        >
            {props.children}    
        </DependenciesContext.Provider>    
    );

}

export default DependenciesState;