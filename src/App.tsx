import React from "react";
import GoalPresenter from "./components/GoalPresenter";
import { NavigationBar } from "./components/NavBar";
import { Router } from "@reach/router";
import Home from "./components/Home";

function App() {
  return (
    <>
      <NavigationBar />
      <Router>
        <Home path="/" />
        <GoalPresenter
          title="LEGISLAÇÃO"
          sheetKey="1PS-OTqtz3PD4gfuCezJymXCFv3urAEMLqN0FS0XeEsE"
          path="/legislation"
        />
        <GoalPresenter
          title="CARREIRA MILITAR"
          sheetKey="1qPcHQ9FrnHJuztAmaRftR9tenubDUHHr5jB_t_-c9a0"
          path="/militarcareer"
        />
        <GoalPresenter
          title="CIÊNCIAS MILITARES"
          sheetKey="11pCpr4e2VB-O7sWv-sv56ftedpwz1CDVeBSN4RkYjTs"
          path="/militarcience"
        />
        <GoalPresenter
          title="ADMINISTRAÇÃO"
          sheetKey=""
          path="/administration"
        />
        <GoalPresenter
          title="AVALIAÇÕES"
          sheetKey="16T6bC4PACB0GXwOeFPCC91T18G4bHb8u-kNAxWyZziw"
          path="/assessments"
        />
      </Router>
    </>
  );
}

export default App;
