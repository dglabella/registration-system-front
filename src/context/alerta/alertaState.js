import React, {useReducer} from 'react';
import alertaReducer from './alertaReducer';
import AlertaContext from './alertaContext';
import {MOSTRAR_ALERTA, OCULTAR_ALERTA} from '../../types';

const AlertaState = (props) => {

    const initialState={
        alerta:null
    }

    const [state,dispatch]=useReducer(alertaReducer, initialState);

    const mostrarAlerta = (msg, categoria)=>{
        dispatch ({
                    type:MOSTRAR_ALERTA,
                    payload: {
                        msg:msg,
                        categoria:categoria
                    }
                });
        //Limpia la alerta despues de 2 segundos
        setTimeout(()=>{
                dispatch({
                    type:OCULTAR_ALERTA
                });    
        }, 2000);
    }    
                
    return(
        <AlertaContext.Provider
            value={{
                alerta:state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    );    
}

export default AlertaState
