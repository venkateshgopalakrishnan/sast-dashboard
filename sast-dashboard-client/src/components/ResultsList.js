import React from "react";
import { Link } from "react-router-dom";
import { Icon, Label } from "semantic-ui-react";
import PropTypes from "prop-types";
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
          {props.results.reverse().map((result, index) => {
            const severity = result.fields.findings.map((finding) => {
              return finding.metadata.severity;
            });
            // console.log(result);
            return (
              <tr key={result.pk}>
                <td>{index + 1}</td>
                <td>{result.fields.repo_name}</td>
                <td>{result.fields.status}</td>
                <td>
                  <Link to={"view/" + result.pk}>
                    <Label>
                      <Icon name="bomb" color="red" />{" "}
                      {result.fields.findings[0]?.ruleId &&
                      result.fields.findings[0].ruleId === null
                        ? 0
                        : result.fields.findings.length}
                    </Label>
                  </Link>
                </td>
                <td>
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
