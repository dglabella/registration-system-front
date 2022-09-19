import React, {useReducer} from 'react';
import AlertaReducer from './alertReducer';
import AlertaContext from './alertContext';
import {SHOW_ALERT, HIDE_ALERT} from '../../types';

const AlertaState = (props) => {

    const initialState={
        alert:null
    }

    const [state,dispatch]=useReducer(AlertaReducer, initialState);

    const showAlert = (msg, categoria)=>{
        dispatch ({
                    type:SHOW_ALERT,
                    payload: {
                        msg:msg,
                        categoria:categoria
                    }
                });
        //Limpia la alerta despues de 2 segundos
        setTimeout(()=>{
                dispatch({
                    type:HIDE_ALERT
                });    
        }, 2000);
    }    
                
    

    return(
        <AlertaContext.Provider
            value={{
                alert:state.alert,
                showAlert:showAlert
            }}
        >
            {props.children}
        </AlertaContext.Provider>
    );    
}

export default AlertaState
