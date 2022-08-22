import React, {Fragment, useState, useContext, useEffect} from 'react';
import { Button, ButtonGroup, Row, Col, InputGroup, Form, Dropdown, Card, Table} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faEye, faUserPlus, faCog, faCheck, faSearch, faSlidersH, faUserCog, faFileContract, faFileCode, faFolder } from '@fortawesome/free-solid-svg-icons';
import UsuariosContext from "../context/usuarios/usuariosContext"
const Home = () => {

    const contextoUsuarios = useContext(UsuariosContext);
    const {mensaje, usuarios, cantidadUsuarios, obtenerUsuarios, seleccionarUsuario, deseleccionarUsuario, verUsuario, eliminarUsuario, reiniciarMensaje}=contextoUsuarios;
    
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
    
    useEffect(()=>{
        obtenerUsuarios();
    },[]);


  return (
    <Fragment>

            <div className="btn-toolbar d-lg-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 pt-4 ">
                <h5 className="">Administración de Usuarios</h5>
            </div>

            <div className="table-settings mb-2">

                <Row className="align-items-center mb-2"> {/*justify-content-between*/}
                    <Col xs={6} lg={8} className="d-flex">
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
                            <option value="3">Estado</option>
                        </Form.Select>
                    </Col>
                    <Col xs={6} lg={4}>
                        <div className="btn-toolbar d-lg-flex  flex-wrap flex-md-nowrap align-items-center ">
                            <Button variant="primary" size="sm" className="me-2 me-lg-3 " >
                                <FontAwesomeIcon icon={faSearch} className="me-2" /> Buscar
                            </Button>
                            <Button variant="secondary" size="sm" className="me-2 me-lg-3 ">   {/*as={Link} to={Routes.Cliente.path} */}
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Nuevo 
                            </Button>
                        </div>
                    </Col>

                </Row>

                <Card border="light" className="table-wrapper table-responsive shadow-sm">
                    <Card.Body>
                        <Table hover className="user-table align-items-center">
                            <thead className="thead-light">
                                <tr>
                                    <th className="border-bottom">Acciones</th>
                                    <th className="border-bottom">Nombre y Apellido</th>
                                    <th className="border-bottom">Estado</th>
                                    {/*<th className="border-bottom">E-mail</th>*/}
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(u => (
                                    <tr key={u.id}>
                                        <td>
                                            <Dropdown as={ButtonGroup}>
                                                <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                                                    <span className="icon icon-sm">
                                                        <FontAwesomeIcon icon={faUserCog} className="text-gray" />{/*icon-dark*/}
                                                    </span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Button} onClick={()=>{/*onClickVerCliente(u)*/}}  >
                                                        <FontAwesomeIcon icon={faEye} className="me-1" /> Ver
                                                    </Dropdown.Item>
                                                    <Dropdown.Item as={Button} onClick={() => {/*onClickEditarCliente(u)*/}} >
                                                        <FontAwesomeIcon icon={faEdit} className="me-1" /> Editar
                                                    </Dropdown.Item>
                                                    <Dropdown.Item className="text-secondary" as={Button} onClick={() => { /*onClickEliminarCliente(u)*/ } } >
                                                        <FontAwesomeIcon icon={faTrashAlt} className="me-1" /> Eliminar
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                        <td>
                                            {/*<Card.Link className="d-flex align-items-center">
                                                <Image src={u.image} className="user-avatar rounded-circle me-3" />
                                                <div className="d-block">*/}
                                                    <span className="fw-normal" as={Button} onClick={()=>{ /*onClickVerCliente(u)*/ }} ><div className="small text-gray">{u.nombre}, {u.apellido}</div></span>                                                  
                                                {/*</div>
                                            </Card.Link>*/}
                                        </td>
                                        <td><span className="fw-normal"><div className="small text-gray">{u.estado}</div></span></td>
                                        {/*<td><span className="fw-normal"><div className="small text-gray">{u.clienteEmail}</div></span></td>*/}
                                        {/*<td><span className="fw-normal">{u.dateCreated}</span></td>*/}
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </Fragment>
  )
}

export default Home;