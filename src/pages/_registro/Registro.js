import React, {Fragment, useState, useContext, useEffect, Component} from 'react';
import { Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faUserPlus, faCog, faCheck, faSearch, faSlidersH, faUserCog, faFileContract, faFileCode, faFolder, faQrcode } from '@fortawesome/free-solid-svg-icons';
import QrReader from 'react-qr-scanner';

const Registro = () => {

    const [lectura, setLectura] = useState("Nada aún ... ");

    const [parametroBusqueda, setParametroBusqueda] = useState({
        tipoBusqueda:0,
        parametro:''
    });

    // extraigo los datos para utilizarlos más facil
    const { parametro, tipoBusqueda } = parametroBusqueda;
    
    const onChange = (e) => {
        setParametroBusqueda({
                 ...parametroBusqueda, 
                 [e.target.name] : e.target.value
        });
    }
    
    const onError = (err)=>{
        console.log(err);
    }

    const onScan = (data)=>{
        if(data!==null){
            setLectura(data.text);
            console.log(data);
        }
    }

    useEffect(()=>{
      //console.log("Lectura detectada:" + lectura);
      //console.log("Limpiando lecura...");
      //setLectura("Escanee su identificador...");

    },[]);

  return (
    <Fragment>

            <div className="btn-toolbar d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 pt-4 ">
                <h5 className="">Registro de Presencialidad</h5>
            </div>

            <div className="table-settings mb-2">

                <Row className="align-items-center mb-2"> {/*justify-content-between*/}
                    <Col xs={6} lg={6} className="d-flex">
                        <InputGroup className="me-2 me-lg-3">
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                            <Form.Control type="text" id="parametro" name="parametro"  value={parametro} placeholder="Search" onChange={onChange} />
                        </InputGroup>
                        <Form.Select className="w-75"  id="tipoBusqueda" name="tipoBusqueda"  onChange={onChange} defaultValue="0">
                            <option defaultChecked>All</option>
                            <option value="1">Nombre</option>
                            <option value="2">Apellido</option>
                            <option value="3">DNI</option>
                        </Form.Select>
                    </Col>
                    <Col xs={6} lg={6}>
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

                <Card border="light" className="table-wrapper table-responsive shadow-sm">
                  <Card.Body>
                      <Row className="align-items-center mb-2">
                          <Col xs={6} lg={6} > 
                              <Row className="align-items-center">
                                <Col md={6} className="mb-3">
                                    <p className="d-lg-flex align-items-center">Por favor presente su identificador ... </p>
                                </Col>
                              </Row>
                              <Row>
                                  <Col md={6} className="mb-3">
                                      <QrReader className="align-items-center d-lg-flex" style={{ "height": "350px", "width": "500px" }} delay={1000} onError={onError} onScan={onScan}>

                                      </QrReader>
                                  </Col>
                              </Row>
                              <Row>
                                  <Col md={6} className="mb-3">
                                      <p className="align-items-center"> {lectura} </p>
                                  </Col>
                              </Row>
                          </Col>
                          <Col xs={6} lg={6} className="d-flex">
                              <Table hover className="user-table align-items-center">
                                  <thead className="thead-light">
                                      <tr>
                                          <th className="border-bottom">Nombre y Apellido</th>
                                          <th className="border-bottom">DNI</th>
                                          <th className="border-bottom">Dependencia</th>
                                      </tr>
                                  </thead>
                                  <tbody>

                                  </tbody>
                              </Table>
                          </Col>
                      </Row>
                  </Card.Body>
                </Card>
            </div>
        </Fragment>
  )
}

export default Registro;