import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_API_URL;

const ResultForm = (props) => {
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState({
    repo_name: "",
    status: "Queued",
    date: "",
    time: "",
    findings: [],
    findings_box: 1,
  });

  const handleFindingsChange = ({ target }, index) => {
    const finding = result.findings[index];
    finding[target.name] = target.value;
    // }
    const newFindings = result.findings.map((f, i) => {
      if (i !== index) {
        return f;
      }
      return finding;
    });
    setResult({ ...result, findings: newFindings });
  };

  const handleChange = ({ target }) => {
    setResult({ ...result, [target.name]: target.value });
  };

  const formIsValid = () => {
    const _errors = {};
    if (!result.repo_name) _errors.repo_name = "Repo name is required";
    if (!result.status) _errors.status = "Status is required";
    if (!result.date) _errors.date = "Date is required";
    if (!result.time) _errors.date = "Time is required";
    setErrors(_errors);
    //Form is valid if errors object is empty
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formIsValid()) return;
    const json = {
      repo_name: result.repo_name,
      status: result.status,
      status_time: result.date + " " + result.time,
      findings: result.findings.map((finding) => {
        return {
          ruleId: finding.rule_id,
          type: finding.type,
          metadata: {
            severity: finding.severity,
            description: finding.description,
          },
        };
      }),
    };
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(json),
    };
    const response = await fetch(baseUrl + "/add-result/", requestOptions);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    } else {
      props.history.push("/");
      toast.success("Course Saved");
    }
  };

  const renderFindings = (i) => {
    return (
      <div>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Type</Form.Label>
            <Form.Control
              //   value={result.findings[i].type}
              id="type"
              name="type"
              as="select"
              onChange={(event) => {
                handleFindingsChange(event, i);
              }}
              defaultValue="----"
            >
              <option disabled>----</option>
              <option value="DAST">DAST</option>
              <option value="SAST">SAST</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Rule ID</Form.Label>
            <Form.Control
              value={result.findings[i].rule_id}
              onChange={(event) => {
                handleFindingsChange(event, i);
              }}
              id="rule_id"
              type="text"
              name="rule_id"
              placeholder="Enter rule id"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Severity</Form.Label>
            <Form.Control
              //   value={result.findings[i].severity}
              id="severity"
              name="severity"
              as="select"
              onChange={(event) => {
                handleFindingsChange(event, i);
              }}
              defaultValue="----"
            >
              <option disabled>----</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              <option value="Informational">Informational</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={result.findings[i].description}
              onChange={(event) => {
                handleFindingsChange(event, i);
              }}
              id="description"
              type="text"
              name="description"
              placeholder="Describe the vulnerability"
            />
          </Form.Group>
        </Form.Row>
        <br />
      </div>
    );
  };

  return (
    <Container>
      <br />
      <div>
        <h2 style={{ textAlign: "center" }}>Add Scan Result</h2>
        <Link className="btn btn-secondary" to="/">
          Back
        </Link>
      </div>
      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Repo Name</Form.Label>
            <Form.Control
              value={result.repo_name}
              onChange={handleChange}
              id="repo_name"
              type="text"
              name="repo_name"
              placeholder="Enter repository name"
              error={errors.repo_name}
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Status</Form.Label>
            <Form.Control
              id="status"
              name="status"
              as="select"
              onChange={handleChange}
              defaultValue="----"
              error={errors.status}
            >
              <option disabled>----</option>
              <option value="Queued">Queued</option>
              <option value="In Progress">In Progress</option>
              <option value="Success">Success</option>
              <option value="Failure">Failure</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>

        {(result.status === "Success" || result.status === "Failure") && (
          <>
            <Button
              style={{ float: "right" }}
              variant="secondary"
              type="button"
              onClick={() =>
                setResult({
                  ...result,
                  findings: [...result.findings, {}],
                  [result.findings_box]: [result.findings_box + 1],
                })
              }
            >
              Add
            </Button>
            <h3>Findings</h3>
            {"  "}
            {result.findings.map((f, i) => renderFindings(i))}
          </>
        )}

        <Form.Row>
          <Form.Group>
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              value={result.date}
              onChange={handleChange}
              id="date"
              type="date"
              name="date"
              placeholder="Date"
              error={errors.date}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Time</Form.Label>
            <Form.Control
              value={result.time}
              onChange={handleChange}
              id="time"
              type="time"
              name="time"
              placeholder="Time"
              error={errors.time}
            />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ResultForm;
