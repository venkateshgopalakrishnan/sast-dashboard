import React from "react";
import Dashboard from "./Dashboard";
import AboutPage from "./AboutPage";
import ResultForm from "./ResultForm";
import ResultPage from "./ResultPage";
import Header from "./common/Header";
import NotFoundPage from "./NotFoundPage";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
function App() {
  return (
    <Container>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/about" component={AboutPage} />
          <Route path="/view/:pk" component={ResultPage} />
          <Route path="/add" component={ResultForm} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </Container>
  );
}

export default App;
