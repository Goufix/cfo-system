import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  handleChange: (e: React.FormEvent<HTMLSelectElement>) => void;
}

export default function SearchBar(props: Props) {
  return (
    <Form onSubmit={(event: React.FormEvent) => event.preventDefault()}>
      <Form.Group controlId="search">
        <Form.Control
          autoComplete="off"
          onChange={props.handleChange}
          type="text"
          placeholder="Pesquisar policial"
        />
        <Form.Text className="text-muted">
          Escrava o nick do policial, a pesquisa é feita automáticamente.
        </Form.Text>
      </Form.Group>
    </Form>
  );
}
