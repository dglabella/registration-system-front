
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faEnvelopeOpen, faSearch, faSignOutAlt, faUserShield, faIdCardAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Form, Image, Navbar, Dropdown, Container, ListGroup, InputGroup, Button } from '@themesberg/react-bootstrap';

import NOTIFICATIONS_DATA from "../data/notifications";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import { Routes } from "../routes";
import AuthContext from '../context/autenticacion/authContext';


export default (props) => {

  const authContext=useContext(AuthContext);
  const {usuario, usuarioAutenticado, cerrarSesion, paginaActual}=authContext;
 
  const salir = ()=>{
    //cerrarSesion();
    console.log(props);
    props.history.push(Routes.Presentation.path);
  }

  return (

    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">

        <div className="media d-flex align-items-center">
          <div className="media-body ms-2 text-dark align-items-center d-none d-sm-block">
            <span className="mb-0  fw-bold"> {paginaActual}  </span>
          </div>
        </div>

        <div className="d-flex justify-content-end w-50">
          {/*<div className="d-flex align-items-center">
            <Form className="navbar-search">
              <Form.Group id="topbarSearch">
                <InputGroup className="input-group-merge search-bar">
                  <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                  <Form.Control type="text" placeholder="Search" />
                </InputGroup>
              </Form.Group>
            </Form>
          </div>*/}
          <Nav className="align-items-center">
            {/*<Dropdown as={Nav.Item} onToggle={markNotificationsAsRead} >
              <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faBell} className="bell-shake" />
                  {areNotificationsRead ? null : <span className="icon-badge rounded-circle unread-notifications" />}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <ListGroup className="list-group-flush">
                  <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                    Notifications
                  </Nav.Link>

                  {notifications.map(n => <Notification key={`notification-${n.id}`} {...n} />)}

                  <Dropdown.Item className="text-center text-primary fw-bold py-3">
                    View all
                  </Dropdown.Item>
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>*/}

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                <div className="media d-flex align-items-center">
                  <FontAwesomeIcon icon={faIdCardAlt} className="user-avatar md-avatar rounded-circle text-primary" /> 
                  {/*<Image src={Profile3} className="user-avatar md-avatar rounded-circle" />*/}
                  <div className="media-body ms-2 text-dark align-items-center d-none d-sm-block">
                    {/*<span className="mb-0 font-small fw-bold"> {usuario ? `${usuario.usuariosNombre} ${usuario.usuariosApellido}` : 'Desconocido' }  </span>*/}
                    <span className="mb-0 font-small fw-bold"> Nombre Usuario  </span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-2">
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserCircle} className="me-2" /> Mi Perfil
                </Dropdown.Item>
                {/*<Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faEnvelopeOpen} className="me-2" /> Messages
                </Dropdown.Item>
                <Dropdown.Item className="fw-bold">
                  <FontAwesomeIcon icon={faUserShield} className="me-2" /> Support
                </Dropdown.Item>*/}

                <Dropdown.Divider />


                <Dropdown.Item className="fw-bold" as={Button} onClick={()=>{ salir() }}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Cerrar Sesi??n
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};