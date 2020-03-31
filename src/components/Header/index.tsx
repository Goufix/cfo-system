import React from "react";
import { Container } from "react-bootstrap";
import logo from "../../assets/cfo-logo.gif";

interface Props {
  title: string;
}

export default function Header(props: Props) {
  return (
    <>
      <Container style={{ textAlign: "center", fontFamily: "Inria Sans" }}>
        <img src={logo} alt="" />
        <h1>{props.title}</h1>
        <h4>
          Imperatriz: <strong>Vacita</strong>
        </h4>
        <hr />
      </Container>
    </>
  );
}
