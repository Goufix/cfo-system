import React, { useState, useEffect, useCallback } from "react";
import tabletop from "tabletop";
import MemberCard from "../MemberCard";
import SearchBar from "../SearchBar";
import Header from "../Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import Typing from "react-typing-animation";
import { RouteComponentProps } from "@reach/router";
import CopyToClipboard from "react-copy-to-clipboard";

interface Sheet {
  professor: string;
}
interface UserData {
  Nick: string;
  points: number;
}

interface Props extends RouteComponentProps {
  sheetKey: string;
  title: string;
}

export default function GoalPresenter(props: Props) {
  const [loading, setLoading] = useState(true);
  const [sheetData, setSheetData] = useState<Sheet[]>([]);
  const [userData, setuserData] = useState<UserData[]>([]);
  const [filterNick, setFilterNick] = useState("");

  const setRenderData = useCallback(() => {
    const users = [
      ...new Set(sheetData.map(line => line.professor.toLowerCase()))
    ];
    const userDataPivot: any[] = [];

    users.forEach(user => {
      const points = sheetData.filter(
        line => line.professor.toLowerCase() === user
      ).length;

      if (points === 0) {
        return;
      }

      userDataPivot.push({ Nick: user, points });
    });

    setuserData(
      userDataPivot
        .filter(line => line.Nick.includes(filterNick))
        .sort((a, b) => a.points - b.points)
        .reverse()
    );
  }, [sheetData, filterNick]);

  useEffect(() => {
    async function getSheetData() {
      await tabletop.init({
        key: props.sheetKey,
        callback: (data: Sheet[]) => {
          setSheetData(data);
          setLoading(false);
        },
        simpleSheet: true
      });
    }
    getSheetData();
  }, [loading, props.sheetKey]);

  useEffect(() => {
    setRenderData();
  }, [sheetData, setRenderData]);

  if (loading) {
    return (
      <Container>
        <Header title={props.title} />
        <h1 style={{ display: "inline" }}>
          <Typing hideCursor speed={0}>
            carregando
            <Typing.Speed ms={50} />
            ...
          </Typing>
        </h1>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <Header title={props.title} />
        <SearchBar
          handleChange={e => setFilterNick(e.currentTarget.value.toLowerCase())}
        />
        <CopyToClipboard
          text={userData
            .map(({ Nick, points }) => `${Nick} - ${points}0%`)
            .join("\n")}
          onCopy={() => alert(`meta de ${props.title} copiada com sucesso!`)}
        >
          <Button variant="dark"> Copiar meta</Button>
        </CopyToClipboard>
        <Row>
          {userData.map((user, index) => {
            return (
              <Col sm={4} key={index}>
                <MemberCard key={index} name={user.Nick} points={user.points} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
