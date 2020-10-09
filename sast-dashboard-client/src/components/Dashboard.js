import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ResultsList from "./ResultsList";

// Hardcoding api url here since there was an issue with Heroku config vars when url was declared
// To be changed to http://localhost:8000 when run locally
const baseUrl = "https://sast-dashboard.herokuapp.com";

// Funtion to get all the results from API and return the object
async function getResults() {
  const response = await fetch(baseUrl + "/get-all-results/");
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const results = await response.json();
  return results;
}
// Dashboard component (parent component that calls child ResultList component)
function Dashboard() {
  const [results, setResults] = useState([]);
  // lifecycle method to get all results from api on component render
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
