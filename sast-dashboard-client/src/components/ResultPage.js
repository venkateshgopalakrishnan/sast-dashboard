import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

// Hardcoding api url here since there was an issue with Heroku config vars when url was declared
// To be changed to http://localhost:8000 when run locally
const baseUrl = "https://sast-dashboard.herokuapp.com";

// Function to get the result by id or pk(primary key) from api
async function getResultById(pk) {
  const response = await fetch(baseUrl + "/get-result/" + pk);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const result = await response.json();
  return result;
}

// Component to render the selected results findings as cards
const ResultPage = (props) => {
  const [result, setResult] = useState("");
  const [items, setItems] = useState([]);

  // make api call after component render/mount
  useEffect(() => {
    let isMounted = true;
    getResultById(props.match.params.pk)
      .then((_result) => {
        if (isMounted) {
          setResult(_result);
          // items state being set to render the findings/details in the form of cards
          setItems(
            _result.findings.map((finding) => {
              return {
                header: finding.ruleId,
                description: finding.metadata.description,
                meta: finding.metadata.severity,
              };
            })
          );
        }
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
        <h2 style={{ textAlign: "center" }}>{result.repo_name}</h2>
        <Link className="btn btn-secondary" to="/">
          Back
        </Link>
      </div>
      <br />
      {/* Render all items/findings in the form of cards */}
      <Card.Group centered items={items} />
    </Container>
  );
};

export default ResultPage;
