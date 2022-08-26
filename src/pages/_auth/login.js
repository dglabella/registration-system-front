import React, {useState, useContext, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
//import BgImage from "../../assets/img/illustrations/signin.svg";
import AlertaContext from "../../context/alerta/alertaContext";
import AuthContext from "../../context/autenticacion/authContext";
import { Alert } from '@themesberg/react-bootstrap';

const Login = (props) => {

    //Extraer valores del context
    const alertaContext=useContext(AlertaContext);
    const {alerta, mostrarAlerta}=alertaContext;

    const authContext=useContext(AuthContext);
    const {autenticado, mensaje, iniciarSesion}=authContext;

    //State para inicio de sesion
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    // extraigo los datos para utilizarlos más facil
    const { email, password } = usuario;

    useEffect(()=>{
        //Si el usuario esta autenticado
        if(autenticado){
            props.history.push(Routes.Usuarios.path);   //Routes.Clientes.path
        }   
        //Si usuario o pass estan mal
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
    },[mensaje, autenticado, props.history]);


    //Toma los cambios en el formulario y actualiza el estado de inicio de Sesión
    const onChange = (e) => {
        setUsuario({
            ...usuario, 
            [e.target.name] : e.target.value
        });
    }

    //Iniciar Sesión
    const onSubmit = (e) => {
        e.preventDefault();
        //Validamos los datos ingresados
        /*if(email.trim()==='' || password.trim()===''){
            mostrarAlerta('Todos Los Campos Son Obligatorios', 'alerta-error');
            return;
        }*/
        
        //Pasar al action
        //iniciarSesion({email, password});

        const user=email;
        iniciarSesion({user, password});

    }

    return (
        <main>
            <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                <Container>
                    <p className="text-center">
                        <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
                            <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Pagina Principal 
                        </Card.Link>
                    </p>
                    <Row className="justify-content-center form-bg-image" >
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                                <div className="text-center text-md-center mb-4 mt-md-0">
                                    <h3 className="mb-0">Bienvenido!</h3>
                                </div>
                                <Form className="mt-4" onSubmit={onSubmit}>
                                    <Form.Group id="gemail" className="mb-4">
                                        <Form.Label>Correo Electronico</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faEnvelope} />
                                            </InputGroup.Text>
                                            <Form.Control autoFocus required type="text" id="email" name="email"  value={email} onChange={onChange} placeholder="correo@ultramail.com" />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Group id="gpassword" className="mb-4">
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                                </InputGroup.Text>
                                                <Form.Control required type="password" id="password" name="password" value={password} onChange={onChange} placeholder="Password" />
                                            </InputGroup>
                                        </Form.Group>
                                        
                                    </Form.Group>

                                    {alerta ? <Alert variant={alerta.categoria}> {alerta.msg} </Alert>: null}
                                    
                                    <Button variant="primary" type="submit" className="w-100">
                                        Sign in
                                    </Button>
                                </Form>

                                
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <span className="fw-normal">
                                        Eres Nuevo? 
                                        <Card.Link as={Link} to={Routes.Registro.path} className="fw-bold">
                                            {`  Crea Tu Usuario`}
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

export default Login
