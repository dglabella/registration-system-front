import React, { useState, useContext } from 'react';
import { Button, Modal, Card, Row, Col, Image, Accordion, Table } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import PersonalContext from "../../context/personal/personalContext";
import logo from "../../assets/img/misImagenes/logoazul.png";


const ConfirmationDialog = (props) => {
    
    const {show, setShow, functionToExecute, parameter, message}=props; 
    
    const [showDefault, setShowDefault] = useState(false);
    //const handleClose = () => setShowDefault(false);

    return (
        <Modal className="sm" centered show={show} >
            <Modal.Body>
                <Card>
                    <Card.Body>
                        <div className="btn-toolbar justify-content-center d-lg-flex  flex-wrap flex-md-nowrap  ">
                            <span className='small'> {message} </span>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <div className="btn-toolbar justify-content-center d-lg-flex  flex-wrap flex-md-nowrap  ">
                            <Button className="m-2" variant="instagram" size="sm" onClick={() => { functionToExecute(parameter); setShow(false) }} >
                                <FontAwesomeIcon icon={faCheck} className="" /> <span className='small'> Aceptar </span>
                            </Button>
                            <Button className="m-2" variant="primary" size="sm" onClick={() => {  setShow(false)  }} > 
                                <FontAwesomeIcon icon={faTimesCircle} className="" /> <span className='small'> Volver </span>
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmationDialog;