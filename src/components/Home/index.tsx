import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "@reach/router";

const HelpTip = styled.div`
  text-align: center;

  .help-tip__title {
    display: block;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .help-tip__avatar {
    display: inline-block;
    width: 150px;
    height: 150px;
    margin: 1rem 0;
    border: solid 2px #ddd;
    border-radius: 100px;
    background-size: 100%;
    background-position: center -20px;
    background-repeat: no-repeat;
    background-image: url(https://www.habbo.com.br/habbo-imaging/avatarimage?hb=image&user=Goufix&headonly=0&direction=2&head_direction=2&action=&gesture=&size=l);
    box-shadow: inset -2px -3px rgba(0, 0, 0, 0.05);
    transition: all linear 500ms;

    &:hover {
      background-position-y: -30px;
      transform: rotate(360deg) scale(1.2);
      background-image: url(https://www.habbo.com.br/habbo-imaging/avatarimage?hb=image&user=Goufix&headonly=0&direction=2&head_direction=2&action=wav&gesture=&size=l);
    }
  }
`;

export default function Home(_: RouteComponentProps) {
  return (
    <HelpTip>
      <span className="help-tip__title">Seja bem-vindo(a) ao CFO System!</span>
      <span className="help-tip__avatar" />
      <p className="help-tip__description">
        O sistema foi feito com intuito de agilizar a contagem e gerenciamento
        da meta do Centro de Formação de Oficiais.
      </p>
      <p className="help=tip__description">
        Qualquer bug ou sugestão deve ser encaminhado para{" "}
        <a
          href="https://api.whatsapp.com/send?phone=5519991913193"
          style={{ color: "#555" }}
        >
          <strong>Goufix</strong>
        </a>
        .
      </p>
    </HelpTip>
  );
}
