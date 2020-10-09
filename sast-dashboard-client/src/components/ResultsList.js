import React from "react";
import { Link } from "react-router-dom";
import { Icon, Label } from "semantic-ui-react";
import PropTypes from "prop-types";

// Child component that accepts the results as props from Dashboard component and renders as a table
function ResultsList(props) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Repo Name</th>
            <th>Status</th>
            <th>Findings</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterating through the results to construct severity list that can later 
          be used to render label with different icons for different levels of severity. Not implemented now...*/}
          {props.results.reverse().map((result, index) => {
            const severity = result.fields.findings.map((finding) => {
              return finding.metadata.severity;
            });
            return (
              <tr key={result.pk}>
                <td>{index + 1}</td>
                <td>{result.fields.repo_name}</td>
                <td>{result.fields.status}</td>
                <td>
                  {/* Link to go the details/findings of the selected result page */}
                  <Link to={"view/" + result.pk}>
                    <Label>
                      {/* Render the number of findings for the result as a label */}
                      <Icon name="bomb" color="red" />{" "}
                      {result.fields.findings[0]?.ruleId &&
                      result.fields.findings[0].ruleId === null
                        ? 0
                        : result.fields.findings.length}
                    </Label>
                  </Link>
                </td>
                <td>
                  {/* Render the timestamp whichever is not null. This was done under the assumption that there will only be
                  one timestamp for one result based on its status. Later this can be extended to work on multiple timestamp values */}
                  {result.fields.queued_at ||
                    result.fields.scanning_at ||
                    result.fields.finished_at}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

// Proptypes for keeping a check on the type of props being passed to the component during development
ResultsList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      pk: PropTypes.number.isRequired,
      fields: PropTypes.shape({
        repo_name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        findings: PropTypes.array.isRequired,
        queued_at: PropTypes.string,
        scanned_at: PropTypes.string,
        finished_at: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};
ResultsList.defaultProps = {
  results: [],
};

export default ResultsList;
