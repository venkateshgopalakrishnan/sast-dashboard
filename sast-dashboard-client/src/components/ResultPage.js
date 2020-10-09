import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

const baseUrl = "https://sast-dashboard.herokuapp.com";

async function getResultById(pk) {
  const response = await fetch(baseUrl + "/get-result/" + pk);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  const result = await response.json();
  return result;
}

const ResultPage = (props) => {
  const [result, setResult] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getResultById(props.match.params.pk)
      .then((_result) => {
        if (isMounted) {
          setResult(_result);
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
      <Card.Group centered items={items} />
    </Container>
  );
};

export default ResultPage;
