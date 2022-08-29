import React, {useState, useContext, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faSignature} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import AlertaContext from "../../context/alerta/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
import { Alert } from '@themesberg/react-bootstrap';

const Registro = (props) => {

    //Extraer valores del context
    const alertaContext=useContext(AlertaContext);
    const {alerta, mostrarAlerta}=alertaContext;

    const authContext=useContext(AuthContext);
    const {autenticado, mensaje, registrarUsuario}=authContext;

    //En caso de estar ya registrado o estar duplicado
    /*useEffect(()=>{
        //Si el usuario esta autenticado
        if(autenticado){
            props.history.push(Routes.Clientes.path);   
        }    
        //Si esta repetido
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    },[mensaje, autenticado, props.history ]);*/

    //State para inicio de sesion
    const [usuario, setUsuario] = useState({
        nombre:'',
        apellido:'',
        email: '',
        password: '',
        confirmPassword:''
    });

    // extraigo los datos para utilizarlos más facil
    const { nombre, apellido, email, password, confirmPassword } = usuario;

    //Toma los cambios en el formulario y actualiza el estado de inicio de Sesión
    const onChange = (e) => {
        setUsuario({
            ...usuario, 
            [e.target.name] : e.target.value
        });
    }

    //Cuando el usuario Inicia Sesion
    //Iniciar Sesión
    const onSubmit = (e) => {
        e.preventDefault();
        
        //Validamos que no haya campos vacios
        if(nombre.trim()==='' || apellido.trim()==='' || email.trim()==='' || password.trim()==='' || confirmPassword.trim()===''){
            mostrarAlerta('Todos Los Campos Son Obligatorios', 'danger');
            return;
        }
        //Validamos que el password tenga 6 caracteres
        if(password.trim().length<6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'danger');
            return;
        }

        //Validamos que el password y la confirmación sean iguales
        if(password.trim()!== confirmPassword.trim()){
            mostrarAlerta('El password y su confirmación deben ser iguales', 'danger');
            return;    
        }

        registrarUsuario({nombre, apellido, email, password});
        //console.log("Submiteando usuario...");

    }

    return (

        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <p className="text-center">
                        <Card.Link as={Link} to={Routes.Presentation.path} className="text-gray-700">
                            <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Pagina Principal
                        </Card.Link>
                    </p> 
                    {/*  style={{ backgroundImage: `url(${BgImage})` }}    <----   Esta linea iba en el control Row de abajo es un estilo en linea y mete una imagen*/}
                    <Row className="justify-content-center form-bg-image" > 
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Crea Una Cuenta</h3>
                                </div>
                                <Form onSubmit={onSubmit} className="mt-4">
                                    <Form.Group id="gnombre" className="mb-4">
                                        <Form.Label>Nombre</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSignature} />
                                            </InputGroup.Text>
                                            <Form.Control autoFocus  type="text"  id="nombre" name="nombre" value={nombre} onChange={onChange}placeholder="Nombre" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="gapellido" className="mb-4">
                                        <Form.Label>Apellido</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faSignature} />
                                            </InputGroup.Text>
                                            <Form.Control autoFocus  type="text" id="apellido" name="apellido" value={apellido} onChange={onChange} placeholder="Apellido" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="gemail" className="mb-4">
                                        <Form.Label>Correo</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control autoFocus  type="email" id="email" name="email"  value={email} onChange={onChange} placeholder="correo@ultramail.com" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="gpassword" className="mb-4">
                                        <Form.Label>Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt} />
                                            </InputGroup.Text>
                                            <Form.Control  type="password" id="password" name="password" value={password} onChange={onChange} placeholder="Password" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group id="gconfirmPassword" className="mb-4">
                                        <Form.Label>Confirma Password</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUnlockAlt} />
                                            </InputGroup.Text>
                                            <Form.Control  type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={onChange} placeholder="Confirma Password" />
                                        </InputGroup>
                                    </Form.Group>
                                    
                                    {alerta ? <Alert variant={alerta.categoria}> {alerta.msg} </Alert>: null}

                                    <Button variant="primary" type="submit" className="w-100">
                                        Sign up
                                    </Button>
                                </Form>

                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <span className="fw-normal">
                                        Ya Tienes una Cuenta?
                                        <Card.Link as={Link} to={Routes.Login.path} className="fw-bold">
                                            {` Ingresa Aquí `}
                                        </Card.Link>
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Registro;
