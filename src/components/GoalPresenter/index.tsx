import React, { useState, useEffect, useCallback } from "react";
import tabletop from "tabletop";
import MemberCard from "../MemberCard";
import SearchBar from "../SearchBar";
import Header from "../Header";
import { Container, Row, Col, Button } from "react-bootstrap";
import Typing from "react-typing-animation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouteComponentProps } from "@reach/router";
import CopyToClipboard from "react-copy-to-clipboard";

interface Sheet {
  professor: string;
  tipo: string;
}
interface UserData {
  Nick: string;
  points: number;
  lessons: number;
  activities: number;
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
      ...new Set(sheetData.map((line) => line.professor.toLowerCase())),
    ];
    const userDataPivot: UserData[] = [];

    users.forEach((user) => {
      let points;
      let lessons;
      let activities;

      if (props.title === "ADMINISTRAÇÃO") {
        points =
          sheetData.filter((line) => line.professor.toLowerCase() === user)
            .length * 5;
        lessons =
          sheetData.filter(
            (line) =>
              line.professor.toLowerCase() === user &&
              line.tipo === "Relatório de aula"
          ).length * 5;

        activities = points - lessons;
      } else {
        points =
          sheetData.filter((line) => line.professor.toLowerCase() === user)
            .length * 10;

        lessons =
          sheetData.filter(
            (line) =>
              line.professor.toLowerCase() === user &&
              line.tipo === "Relatório de aula"
          ).length * 10;

        activities = points - lessons;
      }

      if (points === 0) {
        return;
      }

      userDataPivot.push({ Nick: user, points, lessons, activities });
    });

    setuserData(
      userDataPivot
        .filter((line) => line.Nick.includes(filterNick))
        .sort((a, b) => a.points - b.points)
        .reverse()
    );
  }, [sheetData, filterNick, props.title]);

  useEffect(() => {
    async function getSheetData() {
      await tabletop.init({
        key: props.sheetKey,
        callback: (data: Sheet[]) => {
          setSheetData(data);
          setLoading(false);
        },
        simpleSheet: true,
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
          handleChange={(e) =>
            setFilterNick(e.currentTarget.value.toLowerCase())
          }
        />
        <CopyToClipboard
          text={userData
            .map(({ Nick, points, lessons, activities }, index) => {
              const lessonsCount = points / 10;
              if (lessons) {
                if (index === 0) {
                  return `[color="#999"][b]${Nick}[/b] {${lessons} Aul/${activities} Atv} - ${points}% [Melhor professor da semana][/color]`;
                } else if (points > 50) {
                  return `[color="#090"][b]${Nick}[/b] {${lessons} Aul/${activities} Atv} - ${points}%[/color]`;
                } else {
                  return `[color="#c00"][b]${Nick}[/b] {${lessons} Aul/${activities} Atv} - ${points}%[/color]`;
                }
              } else if (props.title !== "AVALIAÇÕES") {
                if (index === 0) {
                  return `[color="#999"][b]${Nick}[/b] {${lessonsCount} Aul} - ${points}% [Melhor professor do mês][/color]`;
                } else if (points > 50) {
                  return `[color="#090"][b]${Nick}[/b] {${lessonsCount} Aul} - ${points}%[/color]`;
                } else {
                  return `[color="#c00"][b]${Nick}[/b] {${lessonsCount} Aul} - ${points}%[/color]`;
                }
              } else {
                if (index === 0) {
                  return `[color="#999"][b]${Nick}[/b] {${lessonsCount} Avl} - ${points}% [Melhor avaliador da quinzena][/color]`;
                } else if (points > 80) {
                  return `[color="#090"][b]${Nick}[/b] {${lessonsCount} Avl} - ${points}%[/color]`;
                } else {
                  return `[color="#c00"][b]${Nick}[/b] {${lessonsCount} Avl} - ${points}%[/color]`;
                }
              }
            })
            .join("\n")}
          onCopy={() => toast("Meta copiada com sucesso!", { type: "success" })}
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
        <ToastContainer autoClose={2000} />
      </Container>
    </>
  );
}
