import React, { useState, useEffect, useCallback } from 'react';
import tabletop from 'tabletop';
import MemberCard from '../../MemberCard';
import SearchBar from '../../SearchBar';
import { Container, Row, Col } from 'react-bootstrap';
import Typing from 'react-typing-animation';

interface Sheet {
  Nick: string;
  whoVoted: string;
  STATUS: string;
}
interface UserData {
  Nick: string;
  points: number;
}

export default function Administration() {
  const [loading, setLoading] = useState(true);
  const [sheetData, setSheetData] = useState<Sheet[]>([]);
  const [userData, setuserData] = useState<UserData[]>([]);
  const [filterNick, setFilterNick] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);

  const setRenderData = useCallback(() => {
    const users = [
      ...new Set(sheetData.map((line) => line.Nick.toLowerCase()))
    ];
    const userDataPivot: any[] = [];

    setTotalPoints(
      sheetData.filter((line) => line.STATUS === 'APROVADO').length
    );

    users.forEach((user) => {
      const points = sheetData
        .filter((line) => line.STATUS === 'APROVADO')
        .filter((line) => line.Nick.toLowerCase() === user).length;

      if (points === 0) {
        return;
      }

      userDataPivot.push({ Nick: user, points });
    });

    setuserData(
      userDataPivot
        .filter((line) => line.Nick.includes(filterNick))
        .sort((a, b) => a.points - b.points)
        .reverse()
    );
  }, [sheetData, filterNick]);

  useEffect(() => {
    async function getSheetData() {
      await tabletop.init({
        key: '1FwYH3PzWkwC9FBMnp2xPRlrG-FY7kJUpl4oC1GpOllU',
        callback: (data: Sheet[]) => {
          setSheetData(data);
          setLoading(false);
        },
        simpleSheet: true
      });
    }
    getSheetData();
  }, [loading]);

  useEffect(() => {
    setRenderData();
  }, [sheetData, setRenderData]);

  if (loading) {
    return (
      <Container>
        <h1 style={{ display: 'inline' }}>
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
        <SearchBar
          handleChange={(e) =>
            setFilterNick(e.currentTarget.value.toLowerCase())
          }
        />
        <div>
          <h2>
            Os policiais já conseguiram <strong>{totalPoints}</strong> votos!
          </h2>
          <button
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              outline: 'inherit'
            }}
          >
            <strong>
              <p
                style={{ color: '#000' }}
                onClick={() => window.location.reload(false)}
              >
                Recaregar lista
              </p>
            </strong>
          </button>
        </div>
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
