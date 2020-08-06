import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../../assets/cfo-logo.gif';

interface Props {
  title: string;
}

export default function Header(props: Props) {
  return (
    <>
      <Container style={{ textAlign: 'center', fontFamily: 'Inria Sans' }}>
        <img src={logo} alt="" />
        <h4>{props.title}</h4>
        <h6>
          Imperatriz: <strong>Vacita</strong>
        </h6>
        <hr />
      </Container>
    </>
  );
}
