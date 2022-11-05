import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faUserPlus, faCog, faCheck, faSearch, faSlidersH, faUserCog, faFileContract, faFileCode, faFolder, faDoorOpen, faQrcode } from '@fortawesome/free-solid-svg-icons';
import PersonalContext from "../../context/personal/personalContext";
import AlertaContext from "../../context/alerta/alertaContext";
import { Alert } from '@themesberg/react-bootstrap';
import { QrReader } from 'react-qr-reader';


const Entrance = () => {

    const contextoPersonal = useContext(PersonalContext);
    const { personal, personSelected, getPersonal, showPerson, message } = contextoPersonal;
    const {personName, personLastName, active, dependency } = personSelected;

    const [searchParameter, setSearchParameter] = useState({
        searchType: 0,
        parameter: ''
    });

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const { parameter, searchType } = searchParameter;

    const [qrValue, setQrValue] = useState("Nada aún ... ");

    const today = new Date();

    const onChange = (e) => {
        setSearchParameter({
            ...searchParameter,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        getPersonal();
    }, []);

    useEffect(() => {
        if (message) {
            mostrarAlerta(message.msg, message.categoria);
        }
    }, [message]);

    const onSubmit = (e) => {
        //e.preventDefault();
    }

    const onClickSelectedPerson=(p)=>{
        showPerson(p);
    }

    const handlerScan = (result, error)=>{  
        

        //Unhandled Rejection (TypeError): result is null
        //handlerScan

        if(result!==undefined){ //NULL aparentemente da error cuando se esta usando la camara, Ej en reunión meet por con Danilo
            setQrValue(result.text);
            //camnbiar estado y el useEffect disparar post de registro!!!
            //debería aparecer un modal dando la bienvenida!!!!
        }
    }


    return (
        <Fragment>

            <div className="btn-toolbar d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 pt-4 ">
                <h5 className="">Registro de Personal</h5>
            </div>

            <div className="table-settings mb-4 pb-4">

                {alert ? <Alert variant={alert.categoria}> {alert.msg} </Alert> : null}

                <Row className="align-items-center mb-2"> {/*justify-content-between*/}
                    <Col xs={6} lg={8} className="d-flex">
                        <InputGroup className="me-2 me-lg-3">
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" id="parameter" name="parameter" value={parameter} placeholder="Buscar" onChange={onChange} />
                        </InputGroup>
                        <Form.Select className="w-75" id="tipoBusqueda" name="tipoBusqueda" onChange={onChange} defaultValue="0">
                            <option defaultChecked>All</option>
                            <option value="1">Nombre</option>
                            <option value="2">Apellido</option>
                            <option value="3">DNI</option>
                        </Form.Select>
                    </Col>
                    <Col xs={6} lg={4}>
                        <div className="btn-toolbar d-lg-flex  flex-wrap flex-md-nowrap align-items-center ">
                            <Button variant="primary" size="sm" className="me-2 me-lg-3 " >
                                <FontAwesomeIcon icon={faSearch} className="me-2" /> Buscar
                            </Button>
                            <Button variant="secondary" size="sm" className="me-2 me-lg-3 ">   {/*as={Link} to={Routes.Cliente.path} */}
                                <FontAwesomeIcon icon={faQrcode} className="me-2" /> Ver QR
                            </Button>
                            <Button variant="secondary" size="sm" className="me-2 me-lg-3 ">   {/*as={Link} to={Routes.Cliente.path} */}
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Registrar Acceso
                            </Button>
                        </div>
                    </Col>

                </Row>
                <Row>

                    <Col xs={12} sm={6} xl={4} className="mb-2">
                        <Card border="light" className="shadow-sm">
                            <Card.Header className="border-bottom border-light d-flex justify-content-between">
                                <h6 className="mb-0">Escanne su identificador aquí </h6>
                                <h6>{today.toLocaleDateString()}</h6>
                            </Card.Header>
                            <Card.Body className="mb-0">
                                <QrReader className="align-items-center d-lg-flex" style={{ "height": "50%", "width": "50%" }} delay={500} onResult={(result, error) => { handlerScan(result, error) }} />
                            </Card.Body>
                            <Card.Footer>
                                <h5 className="mb-0">Saludos {qrValue} </h5>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col xs={12} sm={6} xl={8}>
                    <Card className='mb-2'>
                            <Card.Body>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <Form.Group id="firstName">
                                                <Form.Label className="small text-gray" >Nombre</Form.Label>
                                                <Form.Control readOnly type="text" id="personName" name="personName" value={personName } />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Form.Group id="lastName">
                                                <Form.Label className="small text-gray">Apellido</Form.Label>
                                                <Form.Control readOnly type="text" id="personLastName" name="personLastName" value={personLastName} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Form.Group id="lastName">
                                                <Form.Label className="small text-gray">Estado</Form.Label>
                                                <Form.Control readOnly type="text" id="personLastName" name="personLastName" value={active?"ACTIVO":"INACTIVO"} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>

                        <Card border="light" className="table-wrapper table-responsive shadow-sm ">
                            <Card.Body>
                                <Table hover className="user-table align-items-center">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="border-bottom">Nombre y Apellido</th>
                                            <th className="border-bottom">Apellido</th>
                                            <th className="border-bottom">DNI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {personal.map(p => (
                                            <tr key={p.id}>
                                                <td>
                                                    <span className="fw-normal" as={Button} onClick={() => { onClickSelectedPerson(p) }} ><div className="small text-gray">{p.personName}, {p.personLastName}</div></span>
                                                </td>
                                                <td><span className="fw-normal"><div className="small text-gray">{p.dni}</div></span></td>
                                                <td><span className="fw-normal"><div className="small text-gray">{p.dependency.name}</div></span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default Entrance;