import React, {useReducer} from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from './alertaContext';
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
        <alertaContext.Provider
            value={{
                alerta:state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    );    
}

export default AlertaState
