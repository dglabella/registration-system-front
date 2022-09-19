import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faUserPlus, faCog, faCheck, faSearch, faSlidersH, faUserCog, faFileContract, faFileCode, faFolder, faSave } from '@fortawesome/free-solid-svg-icons';
import PersonalContext from "../../context/personal/personalContext";
import DependenciesContext from '../../context/dependencies/dependenciesContex';
import AlertContext from "../../context/alerta/alertContext";
import { Alert } from '@themesberg/react-bootstrap';
const Personal = () => {

    const contextoPersonal = useContext(PersonalContext);
    const { personal, getPersonal, addPersonal, editPersonal, message } = contextoPersonal;
    //const { personName, personLastName, active, dependency } = personSelected;

    const contextoDependencias = useContext(DependenciesContext);
    const {dependencies, getDependencies}=contextoDependencias;

    const [searchParameter, setSearchParameter] = useState({
        searchType: 0,
        parameter: ''
    });

    const { parameter, searchType } = searchParameter;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const [person, setPerson]=useState({
        id:0,
        personName:'',
        personLastName:'',
        dni:'',
        email:'',
        type:'',
        dependency_id:''
    });

    const {personName, personLastName, dni, email, type, dependency_id}=person;

    useEffect(() => {
        getPersonal();
        getDependencies();
    }, []);

    useEffect(() => {
        if (message) {
            showAlert(message.msg, message.categoria);
        }
    }, [message]);

    const onChange = (e) => {
        setSearchParameter({
            ...searchParameter,
            [e.target.name]: e.target.value
        });
    }

    const onChangeForm = (e) => {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        });
    }

    const onClickEditPerson = (p)=>{
        setPerson({id:p.id, personName:p.personName, personLastName:p.personLastName, dni:p.dni, email:p.email, type:'', dependency_id:p.dependency.id });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //Realizar controles de que el formulario este completo
        person.id==0 ? addPersonal(person):editPersonal(person);
    }


    return (
        <Fragment>

            <div className="btn-toolbar d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 pt-4 ">
                <h5 className="">Administración de Personal</h5>
            </div>

            <div className="table-settings mb-2">

                <Row>
                    <Col xs={12} sm={6} xl={6} className="mb-2">
                        <Card border="light" className="table-wrapper table-responsive shadow-sm">
                            <Card.Header>
                                <Row className="align-items-center mb-2"> {/*justify-content-between*/}
                                    <Col xs={6} lg={9} className="d-flex">
                                        <InputGroup className="me-2 me-lg-3">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </InputGroup.Text>
                                            <Form.Control type="text" id="parametro" name="parametro" value={parameter} placeholder="Search" onChange={onChange} />
                                        </InputGroup>
                                        <Form.Select className="w-75" id="searchType" name="searchType" onChange={onChange} defaultValue="0">
                                            <option defaultChecked>All</option>
                                            <option value="1">Nombre</option>
                                            <option value="2">Apellido</option>
                                            <option value="3">DNI</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <div className="btn-toolbar d-lg-flex  flex-wrap flex-md-nowrap align-items-center ">
                                            <Button variant="primary" size="sm" className="me-2 me-lg-3 " >
                                                <FontAwesomeIcon icon={faSearch} className="me-2" /> Buscar
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Table hover className="user-table align-items-center">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="border-bottom">Nombre y Apellido</th>
                                            <th className="border-bottom">DNI</th>
                                            <th className="border-bottom">Estado</th>
                                            <th className="border-bottom">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {personal.map(p => (
                                            <tr key={p.id}>

                                                <td>
                                                    <span className="fw-normal" as={Button} onClick={() => { /*onClickVerCliente(u)*/ }} ><div className="small text-gray">{p.personName}, {p.personLastName}</div></span>
                                                </td>
                                                <td>
                                                    <span className="fw-normal"><div className="small text-gray">{p.dni}</div></span>
                                                </td>
                                                <td>
                                                    <span className="fw-normal"><div className="small text-gray">{p.active ? "ACTIVO" : "INACTIVO"}</div></span>
                                                </td>
                                                <td>
                                                    <Dropdown as={ButtonGroup}>
                                                        <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                                                            <span className="icon icon-sm">
                                                                <FontAwesomeIcon icon={faUserCog} className="text-gray" />{/*icon-dark*/}
                                                            </span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item as={Button} onClick={() => {/*onClickVerCliente(u)*/ }}  >
                                                                <FontAwesomeIcon icon={faEye} className="me-1" /> Ver
                                                            </Dropdown.Item>
                                                            <Dropdown.Item as={Button} onClick={() => {onClickEditPerson(p)}} >
                                                                <FontAwesomeIcon icon={faEdit} className="me-1" /> Editar
                                                            </Dropdown.Item>
                                                            <Dropdown.Item className="text-secondary" as={Button} onClick={() => { /*onClickEliminarCliente(u)*/ }} >
                                                                <FontAwesomeIcon icon={faTrashAlt} className="me-1" /> Eliminar
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} sm={6} xl={6} className="mb-2">
                        <Card border="light" className="table-wrapper table-responsive shadow-sm">
                            <Card.Body>

                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="firstName">
                                                <Form.Label className="small text-gray" >Nombre</Form.Label>
                                                <Form.Control required type="text" id="personName" name="personName" onChange={onChangeForm} value={personName} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="lastName">
                                                <Form.Label className="small text-gray">Apellido</Form.Label>
                                                <Form.Control required type="text" id="personLastName" name="personLastName" onChange={onChangeForm} value={personLastName} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="firstName">
                                                <Form.Label className="small text-gray" >Documento</Form.Label>
                                                <Form.Control required type="number" id="dni" name="dni" value={dni} onChange={onChangeForm}/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="lastName">
                                                <Form.Label className="small text-gray">Correo</Form.Label>
                                                <Form.Control required type="email" id="email" name="email" value={email} onChange={onChangeForm}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="fgDependencies">
                                                <Form.Label className="small text-gray" >Dependencia</Form.Label>
                                                <Form.Select className="w-75" id="dependency_id" name="dependency_id" onChange={onChangeForm} >
                                                    <option defaultChecked value="0">SELECCIONE</option>
                                                    {dependencies.map(d => (
                                                        <option key={d.id} value={d.id}> {d.name} </option>
                                                    ))}

                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6} className="mb-3">
                                            <Form.Group id="fgType">
                                                <Form.Label className="small text-gray">Tipo</Form.Label>
                                                <Form.Select className="w-75" id="type" name="type" defaultValue="0" onChange={onChangeForm}>
                                                    <option defaultChecked value="0">SELECCIONE</option>
                                                    <option value="1">DOCENTE</option>
                                                    <option value="1">NODOCENTE</option>
                                                    <option value="2">ALUMNO</option>
                                                    <option value="3">VISITANTE</option>
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <Form.Check label="Lunes" id="monday" htmlFor="monday" />
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Form.Check label="Martes" id="tuesday" htmlFor="tuesday" />
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Form.Check label="Miercoles" id="wednesday" htmlFor="wednesday" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={3} className="mb-3">
                                            <Form.Check label="Jueves" id="thursday" htmlFor="thursday" />
                                        </Col>
                                        <Col md={3} className="mb-3">
                                            <Form.Check label="Viernes" id="friday" htmlFor="friday" />
                                        </Col>
                                        <Col md={3} className="mb-3">
                                            <Form.Check label="Sabado" id="saturday" htmlFor="saturday" />
                                        </Col>
                                        <Col md={3} className="mb-3">
                                            <Form.Check label="Sunday" id="sunday" htmlFor="sunday" />
                                        </Col>
                                    </Row>
                                    <Row className='mt-4'>
                                        <div className="btn-toolbar justify-content-between d-lg-flex  flex-wrap flex-md-nowrap align-items-center ">
                                            <Button variant="primary" size="sm" className=" w-25 " >
                                                <FontAwesomeIcon icon={faSave} className="me-2" /> Guardar
                                            </Button>
                                            <Button variant="secondary" size="sm" className=" w-25">   {/*as={Link} to={Routes.Cliente.path} */}
                                                <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Nuevo
                                            </Button>
                                        </div>
                                    </Row>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </div>
        </Fragment >
  )
}

export default Personal;