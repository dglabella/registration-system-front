import React, { useState, useContext } from 'react';
import { Button, Modal, Card, Row, Col, Image, Accordion, Table } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import PersonalContext from "../../context/personal/personalContext";
import logo from "../../assets/img/misImagenes/logoazul.png";


const PersonCredential = (props) => {
    
    const {person}=props; 
    const contextoPersonal = useContext(PersonalContext);
    const { selectedPerson, showCredential, showPerson, getQRImage, error, getPersonById} = contextoPersonal;

    const [showDefault, setShowDefault] = useState(showCredential);
    //const handleClose = () => setShowDefault(false);

    return (
        <Modal className="sm" centered show={showCredential} onHide={() => { /*deseleccionarCliente()*/ }}   >
            <Modal.Body>
                <Card>
                    <Card.Header className="border-bottom border-light d-flex justify-content-between flex-row align-items-center">
                        <Row>
                        
                            <Col md={3} className="">
                                <Image className="w-75" fluid rounded src={logo} />
                            </Col>
                            <Col md={9} className="mt-3">
                                <Row>
                                    {person ? <span className=""> {person.personName} {person.personLastName}  </span> : null}
                                </Row>
                                <Row>
                                    {person ? <span className=""> {person.dni}  </span> : null}   
                                </Row>
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <div className="btn-toolbar justify-content-center d-lg-flex  flex-wrap flex-md-nowrap  ">
                            {person ? <Image className="w-75" fluid rounded src={person.img} /> : null}
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <Button className="w-100" variant="gray" size="sm" onClick={() => { showPerson(false) }}>
                            <FontAwesomeIcon icon={faTimesCircle} className="me-2" /> Cerrar
                        </Button>
                    </Card.Footer>
                </Card>
            </Modal.Body>
        </Modal>
    )
}

export default PersonCredential;