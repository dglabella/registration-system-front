import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table, Image } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faSearch, faSave, faWindowClose, faPlusSquare, faQrcode } from '@fortawesome/free-solid-svg-icons';
import PersonalContext from "../../context/personal/personalContext";
import DependenciesContext from '../../context/dependencies/dependenciesContex';
import AlertaContext from "../../context/alerta/alertaContext";
import { Alert } from '@themesberg/react-bootstrap';
import logo from "../../assets/img/misImagenes/logoazul.png";
import PersonCredential from './PersonCredential';
import AuthContext from '../../context/autenticacion/authContext';
import CristianPagination from '../_Utils/Pagination';
import ConfirmationDialog from '../_Utils/Confirmation';

const Personal = () => {

    const authContext = useContext(AuthContext);
    const {usuario, setPaginaActual}= authContext;
    
    const alertaContext=useContext(AlertaContext);
    const {alerta, mostrarAlerta}=alertaContext;

    const contextoPersonal = useContext(PersonalContext);
    const { personal, selectedPerson, activePage, mensaje, getPersonById, getPersonal, findPersonal, addPersonal, editPersonal, deletePersonal, showPerson, getQRImage } = contextoPersonal;
    //const { personName, personLastName, active, dependency } = personSelected;

    const contextoDependencias = useContext(DependenciesContext);
    const {dependencies, getDependencies}=contextoDependencias;

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const [formDisabled, setFormDisabled]=useState(true);
    const [actualPage, setActualPage]=useState(0);

    const [show, setShow]=useState(false);
    const [message, setMessage]=useState('');
    //const [functionToExecute, setFunctionToExecute]=useState(null);
    const [paramenterFunctionToExecute, setParamenterFunctionToExecute]=useState(null);
    
    const [searchParameter, setSearchParameter] = useState({
        searchType: 0,
        parameter: ''
    });

    const { parameter, searchType } = searchParameter;

    const [person, setPerson]=useState({
        id:0,
        personName:'',
        personLastName:'',
        dni:'',
        dependency_id:1,
        start:today.toLocaleDateString('sv'),
        docente:false,
        nodocente:false,
        estudiante:false,
        visitante:false,
        lunes:true,
        martes:true,
        miercoles:true,
        jueves:true,
        viernes:true,
        sabado:false,
        domingo:false,
        img:null
    });

    const {id,personName, personLastName, dni, dependency_id, start, 
           docente, nodocente, estudiante, visitante, graduado,
           lunes, martes, miercoles, jueves, viernes, sabado, domingo, img}=person;

    
    const setInitialState = () =>{
        
        setPerson({
            id:0,
            personName:'',
            personLastName:'',
            dni:'',
            dependency_id:1,
            start:today.toLocaleDateString('sv'),
            docente:false,
            nodocente:false,
            estudiante:false,
            graduado:false,
            visitante:false,
            lunes:true,
            martes:true,
            miercoles:true,
            jueves:true,
            viernes:true,
            sabado:false,
            domingo:false,
            img:null
        })

        setFormDisabled(true);   
    }
    
    useEffect(() => {
        //getPersonal();
        findPersonal({size:10, page:0});
        getDependencies();
        setPaginaActual("Administración del Personal");
    }, []);

    useEffect(() => {
        if(mensaje!==null){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    }, [mensaje]);

    /*useEffect(() => {
        if(selectedPerson!==null){
            setPerson({
                id:selectedPerson.id,
                personName:selectedPerson.personName,
                personLastName:selectedPerson.personLastName,
                dni:selectedPerson.dni,
                dependency_id:selectedPerson.dependencyFk,
                start: new Date(selectedPerson.currentWeekly.start).toLocaleDateString('sv'),
                docente: selectedPerson.roles.find( r => r === "TEACHER") ? true:false,
                nodocente:selectedPerson.roles.find( r => r === "NO_TEACHER") ? true:false,
                estudiante:selectedPerson.roles.find( r => r === "STUDENT") ? true:false,
                graduado:selectedPerson.roles.find( r => r === "GRADUATED") ? true:false,
                visitante:selectedPerson.roles.find( r => r === "VISITOR") ? true:false,
                lunes:selectedPerson.currentWeekly.monday,
                martes:selectedPerson.currentWeekly.tuesday,
                miercoles:selectedPerson.currentWeekly.wednesday,
                jueves:selectedPerson.currentWeekly.thursday,
                viernes:selectedPerson.currentWeekly.friday,
                sabado:selectedPerson.currentWeekly.saturday,
                domingo:selectedPerson.currentWeekly.sunday,
                img: getQRImage(selectedPerson.credential.img)
            })
        }
        else{
            setInitialState();
        }
    }, [selectedPerson]);*/

    const selectPerson = (person)=>{
        //getPersonById(person);
        setFormDisabled(true);
        setPerson({
            id:person.id,
            personName:person.personName,
            personLastName:person.personLastName,
            dni:person.dni,
            dependency_id:person.dependencyFk,
            start: new Date(person.currentWeekly.start).toLocaleDateString('sv'),
            docente: person.roles.find( r => r === "TEACHER") ? true:false,
            nodocente:person.roles.find( r => r === "NO_TEACHER") ? true:false,
            estudiante:person.roles.find( r => r === "STUDENT") ? true:false,
            graduado:person.roles.find( r => r === "GRADUATED") ? true:false,
            visitante:person.roles.find( r => r === "VISITOR") ? true:false,
            lunes:person.currentWeekly.monday,
            martes:person.currentWeekly.tuesday,
            miercoles:person.currentWeekly.wednesday,
            jueves:person.currentWeekly.thursday,
            viernes:person.currentWeekly.friday,
            sabado:person.currentWeekly.saturday,
            domingo:person.currentWeekly.sunday,
            img: getQRImage(person.credential.img)
        })
    }   
    
    const onClickNuevo = () =>{
        setFormDisabled(false);
        setInitialState();
    }

    const onClickEditar = (p)=>{
        selectPerson(p);
        setFormDisabled(false);
    }

    const onClickEliminar = (p)=>{
        setMessage(`Seguro de eliminar a: ${p.personName} ${p.personLastName}`);
        setParamenterFunctionToExecute(p);
        setShow(true);
        setInitialState();
        findPersonal({size:10, page:0});
    }

    const onClickGuardar = ()=>{
        let personToPersist = {};
        const roles = [];
        
        if (estudiante) roles.push(0);
        if (nodocente) roles.push(1);
        if (docente) roles.push(2);
        if (graduado) roles.push(3);
        if (visitante) roles.push(4);
        
        if(personName.trim().length===0 || personLastName.trim().length===0 || dni.trim().length===0 || roles.length===0){
            mostrarAlerta("Campos requeridos vacios", "danger" );
            return;
        }
        personToPersist={
            personName:personName,
            personLastName:personLastName,
            dni:dni,
            dependencyFk:dependency_id,
            currentWeekly:{
                start:start,
                monday:lunes,
                tuesday:martes,
                wednesday:miercoles,
                thursday:jueves,
                friday:viernes,
                saturday:sabado,
                sunday:domingo
            },
            roles
        }
        //console.log(personToPersist);
        if(id===0){
            addPersonal(personToPersist);
        }
        else{
            personToPersist={id, ...personToPersist};
            editPersonal(personToPersist);
        }
        setInitialState();
    }

    const onClickCancelar = ()=>{
        setInitialState();
    }

    const onChange = (e) => {
        setSearchParameter({
            ...searchParameter,
            [e.target.name]: e.target.value
        });
    }

    const onChangeForm = (e) => {
        const target = e.target;
        let value = e.target.type === 'checkbox' ? target.checked : target.value;
        const name = e.target.name;
        setPerson({
            ...person,
            [name]: value
        });
    }

    return (
        <Fragment>
            
            <PersonCredential person={person}/>
            <ConfirmationDialog show={show} setShow={setShow} functionToExecute={deletePersonal}  parameter={paramenterFunctionToExecute} message={message} />

            {alerta ? <Alert variant={alerta.categoria}> {alerta.msg} </Alert> : null}
            {/*<div className="btn-toolbar d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 pt-4 ">
                <h5 className="">Administración de Personal</h5>
            </div>*/}
            <div className="table-settings mb-2">
                <Row>
                    <Col xs={12} sm={6} xl={6} className="mb-2">
                        <Card border="light" className="table-wrapper table-responsive shadow-sm">
                            <Card.Header>
                                <Row className="align-items-center "> {/*justify-content-between*/}
                                    <Col xs={6} lg={9} className="d-flex">
                                        <InputGroup className="me-2 me-lg-3 ">
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSearch} />
                                            </InputGroup.Text>
                                            <Form.Control className="small-font" type="text" id="parameter" name="parameter" value={parameter} placeholder="Search" onChange={onChange} />
                                        </InputGroup>
                                        <Form.Select className="w-75 small-font" id="searchType" name="searchType" onChange={onChange} defaultValue="0">
                                            <option defaultChecked>Todos</option>
                                            <option value="1">Nombre</option>
                                            <option value="2">Apellido</option>
                                            <option value="3">DNI</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <div className="btn-toolbar d-lg-flex  flex-wrap flex-md-nowrap align-items-center ">
                                            <Button variant="primary" size="sm" className="me-2 me-lg-3 " >
                                                <FontAwesomeIcon icon={faSearch} className="me-2" /> <span className='small'>Buscar</span>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                               
                                <div className="table-wrapper-scroll-y my-custom-scrollbar-utilidades mt-0">
                                    <Table hover className="user-table align-items-center ">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="border-bottom">Nombre y Apellido</th>
                                                <th className="border-bottom">DNI</th>
                                                <th className="border-bottom">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {personal.map(p => (
                                                <tr key={p.id}>
                                                    <td>
                                                        <span className="fw-normal" as={Button} onClick={() => { selectPerson(p) }} ><div className="button-small-font text-gray">{p.personName}, {p.personLastName}</div></span>
                                                    </td>
                                                    <td>
                                                        <span className="fw-normal"><div className="button-small-font text-gray">{p.dni}</div></span>
                                                    </td>
                                                    <td>
                                                        <Button className="m-1 button-small-font" variant="primary" size="sm" onClick={() => { onClickEditar(p) }}>
                                                            <FontAwesomeIcon variant="primary" icon={faEdit} />
                                                        </Button>

                                                        <Button className="button-small-font" variant="instagram" size="sm" onClick={() => { onClickEliminar(p) }}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>

                                <CristianPagination  totalResults={10} totalPages={2} findPersonal={findPersonal} activePage={activePage}/>

                        </Card>
                    </Col>

                    <Col xs={12} sm={6} xl={6} className="mb-2">
                        <Card border="light" className="table-wrapper table-responsive shadow-sm">
                            <Card.Header>
                                <Row className='align-items-center mt-2 mb-0'>
                                    <div className="btn-toolbar justify-content-end d-lg-flex  flex-wrap flex-md-nowrap  ">
                                        <Button className="me-1" variant="primary" size="sm" disabled={!formDisabled} onClick={() => { onClickNuevo() }}>   {/*as={Link} to={Routes.Cliente.path} */}
                                            <FontAwesomeIcon icon={faPlusSquare} className="me-1" /> <span className='small'> Nuevo </span>
                                        </Button>
                                        <Button className="me-1" variant="facebook" size="sm" disabled={formDisabled} onClick={() => { onClickGuardar() }} > {/* className=" w-25" */}
                                            <FontAwesomeIcon icon={faSave} className="me-1" /> <span className='small'> Guardar </span>
                                        </Button>
                                        <Button className="me-1" variant="primary" size="sm" disabled={formDisabled} onClick={() => { onClickCancelar() }} > {/* className=" w-25" */}
                                            <FontAwesomeIcon icon={faWindowClose} className="me-1" /> <span className='small'> Cancelar </span>
                                        </Button>
                                    </div>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Form >
                                    <Row>
                                        <Col md={12} className="mb-3">
                                            <Form.Group id="firstName">
                                                <Form.Label className="small text-gray" >Nombre</Form.Label>
                                                <Form.Control required type="text" id="personName" disabled={formDisabled} name="personName" onChange={onChangeForm} value={personName} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>    
                                        <Col md={12} className="mb-3">
                                            <Form.Group id="lastName">
                                                <Form.Label className="small text-gray">Apellido</Form.Label>
                                                <Form.Control required type="text" id="personLastName" disabled={formDisabled} name="personLastName" onChange={onChangeForm} value={personLastName} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <Form.Group id="firstName">
                                                <Form.Label className="small text-gray" >Documento</Form.Label>
                                                <Form.Control required type="number" id="dni" disabled={formDisabled} name="dni" value={dni} onChange={onChangeForm} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Form.Group id="lastName">
                                                <Form.Label className="small text-gray">Inicio</Form.Label>
                                                <Form.Control required type="date" id="start" disabled={formDisabled} name="start" value={start} onChange={onChangeForm} />
                                            </Form.Group>
                                        </Col>

                                        <Col md={4} className="mb-3">
                                            <Form.Group id="fgDependencies">
                                                <Form.Label className="small text-gray" >Dependencia</Form.Label>
                                                <Form.Select className="w-75" id="dependency_id" disabled={formDisabled} name="dependency_id" value={dependency_id} onChange={onChangeForm} >
                                                    {dependencies.map(d => (
                                                        <option key={d.id} value={d.id}> {d.dependencyName} </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={4} className="mb-4">
                                            <Form.Group id="fgType">
                                                <Form.Label className="small text-gray">Roles</Form.Label>
                                                <Form.Check label="Docente" id="docente" name="docente" disabled={formDisabled} value={docente} checked={docente} onChange={onChangeForm} />
                                                <Form.Check label="NoDocente" id="nodocente" name="nodocente" disabled={formDisabled} value={nodocente} checked={nodocente} onChange={onChangeForm} />
                                                <Form.Check label="Estudiante" id="estudiante" name="estudiante" disabled={formDisabled} value={estudiante} checked={estudiante} onChange={onChangeForm} />
                                                <Form.Check label="Graduado" id="graduado" name="graduado" disabled={formDisabled} value={graduado} onChange={onChangeForm} />
                                                <Form.Check label="Visitante" id="visitante" name="visitante" disabled={formDisabled} value={visitante} checked={visitante} onChange={onChangeForm} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4} className="mb-4">
                                            <Form.Label className="small text-gray">Semanario</Form.Label>
                                            <Form.Check label="Lunes" id="monday" name="lunes" disabled={formDisabled} value={lunes} checked={lunes} onChange={onChangeForm} />
                                            <Form.Check label="Martes" id="tuesday" name="martes" disabled={formDisabled} value={martes} checked={martes} onChange={onChangeForm} />
                                            <Form.Check label="Miercoles" id="wednesday" name="miercoles" disabled={formDisabled} value={miercoles} checked={miercoles} onChange={onChangeForm} />
                                            <Form.Check label="Jueves" id="thursday" name="jueves" disabled={formDisabled} value={jueves} checked={jueves} onChange={onChangeForm} />
                                            <Form.Check label="Viernes" id="friday" name="viernes" disabled={formDisabled} value={viernes} checked={viernes} onChange={onChangeForm} />
                                            <Form.Check label="Sabado" id="saturday" name="sabado" disabled={formDisabled} value={sabado} checked={sabado} onChange={onChangeForm} />
                                            <Form.Check label="Domingo" id="sunday" name="domingo" disabled={formDisabled} value={domingo} checked={domingo} onChange={onChangeForm} />
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Image className="w-100" fluid rounded src={img} />

                                            {img ? <div className="btn-toolbar justify-content-center d-lg-flex  flex-wrap flex-md-nowrap  ">
                                                <Button className="me-1" variant="primary" size="sm" onClick={() => { showPerson(true) }} > {/* className=" w-25" */}
                                                    <FontAwesomeIcon icon={faQrcode} className="me-1" /> <span className='small'> Ampliar </span>
                                                </Button>
                                            </div> :null}
                                        </Col>
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