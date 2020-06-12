import React from "react";
import { Card, Col, Row, ProgressBar, Image } from "react-bootstrap";

interface Props {
  name: string;
  points: number;
}

export default function MemberCard(props: Props) {
  return (
    <Card style={{ margin: "3px" }}>
      <Card.Header style={{ backgroundColor: "#033357", color: "#fff" }}>
        <Row>
          <Col className="justify-content-center align-self-center">
            <strong>{props.name}</strong>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Image
              src={`https://www.habbo.com.br/habbo-imaging/avatarimage?hb=image&user=${
                props.name
              }&headonly=1&direction=4&head_direction=4&action=&gesture=&size=m&__date__=${Date.now()}`}
              alt="Avatar"
              style={{ margin: 0 }}
            />
          </Col>
        </Row>
      </Card.Header>
      <ProgressBar
        now={
          props.name !== "AVALIAÇÕES"
            ? (props.points / 50) * 100
            : (props.points / 80) * 100
        }
        style={{ borderRadius: 0 }}
        label={`${props.points}%`}
        animated
      />
    </Card>
  );
}
