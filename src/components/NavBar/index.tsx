import { Link } from '@reach/router';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

export function NavigationBar() {
  return (
    <Navbar
      variant="dark"
      className="mb-3"
      style={{ backgroundColor: '#033357' }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand>Centro de Formação de Oficiais</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link className="aa" to="/administration" as={Link}>
            <strong>Administração</strong>
          </Nav.Link>
          <Nav.Link to="/legislation" as={Link}>
            <strong>Legislação</strong>
          </Nav.Link>
          <Nav.Link to="/militarcareer" as={Link}>
            <strong>Carreira Militar</strong>
          </Nav.Link>
          <Nav.Link to="/militarcience" as={Link}>
            <strong>Ciências Militares</strong>
          </Nav.Link>
          <Nav.Link to="/assessments" as={Link}>
            <strong>Avaliações</strong>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link
            className="m-auto"
            href="https://api.whatsapp.com/send?phone=5519991913193"
            target="_blank"
            style={{ color: '#f5f5f5' }}
          >
            {'<Goufix />'}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
