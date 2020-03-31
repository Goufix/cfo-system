import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "@reach/router";

export function NavigationBar() {
  return (
    <Navbar
      variant="dark"
      className="mb-3"
      style={{ backgroundColor: "#033357" }}
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand>Centro de Formação de Oficiais</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link
            to="/administration"
            style={{ fontWeight: "bolder" }}
            disabled
            as={Link}
          >
            Administração
          </Nav.Link>
          <Nav.Link
            to="/legislation"
            style={{ fontWeight: "bolder" }}
            as={Link}
          >
            Legislação
          </Nav.Link>
          <Nav.Link
            to="/militarcareer"
            style={{ fontWeight: "bolder" }}
            as={Link}
          >
            Carreira Militar
          </Nav.Link>
          <Nav.Link
            to="/militarcience"
            style={{ fontWeight: "bolder" }}
            as={Link}
          >
            Ciências Militares
          </Nav.Link>
          <Nav.Link
            to="/assessments"
            style={{ fontWeight: "bolder" }}
            as={Link}
          >
            Avaliações
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link
            className="m-auto"
            href="https://api.whatsapp.com/send?phone=5519991913193"
            target="_blank"
            style={{ color: "#f5f5f5" }}
          >
            {"<Goufix />"}
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
