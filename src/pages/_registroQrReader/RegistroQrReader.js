import React, {Fragment, useState, useContext, useEffect, Component} from 'react';
import { Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faUserPlus, faCog, faCheck, faSearch, faSlidersH, faUserCog, faFileContract, faFileCode, faFolder, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { QrReader } from 'react-qr-reader';

const RegistroQrReader = () => {

    const today = new Date();
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
    
    const handlerScan = (result, error)=>{
        
        if(result!==undefined){
            setLectura(result.text);
            //debería aparecer un modal dando la bienvenida!!!!
        }
        
        /*if (result!==null) {
            console.log(result);
            setLectura(result ? result.text : "Esperando...");
        }*/

          /*if (!!error) {
            console.info(error);
            console.log("eeeeeeeeee");
          }*/
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
                          <Form.Control type="text" id="parametro" name="parametro" value={parametro} placeholder="Search" onChange={onChange} />
                      </InputGroup>
                      <Form.Select className="w-75" id="tipoBusqueda" name="tipoBusqueda" onChange={onChange} defaultValue="0">
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

              <Row className="justify-content-md-center">
                  <Col xs={12} sm={6} xl={4} className="mb-2">
                      <Card border="light" className="shadow-sm">
                          <Card.Header className="border-bottom border-light d-flex justify-content-between">
                              <h6 className="mb-0">Escanne su identificador aquí </h6>
                              <h6>{today.toLocaleDateString()}</h6>
                          </Card.Header>
                          <Card.Body className="mb-0">
                              <QrReader className="align-items-center d-lg-flex" style={{"height": "50%", "width": "50%" }} delay={500} onResult={(result, error) => { handlerScan(result, error) }} />
                          </Card.Body>
                          <Card.Footer>
                              <h5 className="mb-0">Saludos {lectura} </h5>
                          </Card.Footer>
                      </Card>
                  </Col>
                  <Col xs={12} sm={6} xl={8} className="mb-2">
                      <Card border="light" className="table-wrapper table-responsive shadow-sm">
                          <Card.Body>
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
                          </Card.Body>
                      </Card>
                  </Col>
              </Row>  
            </div>
        </Fragment>
  )
}

export default RegistroQrReader;