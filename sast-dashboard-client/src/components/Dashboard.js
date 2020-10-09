import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ResultsList from "./ResultsList";
const baseUrl = "http://localhost:8000/";

async function getResults() {
  const response = await fetch(baseUrl + "get-all-results/");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const results = await response.json();
  return results;
}

function Dashboard() {
  const [results, setResults] = useState([]);
  useEffect(() => {
    let isMounted = true;
    getResults()
      .then((_results) => {
        if (isMounted) setResults(_results);
      })
      .catch((error) => console.log(error.message));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <br />
      <div>
        <h2 style={{ textAlign: "center" }}>Results Dashboard</h2>
        <Link className="btn btn-primary" to="/add">
          Add
        </Link>
      </div>
      <br /> <ResultsList results={results} />
    </Container>
  );
}

export default Dashboard;
