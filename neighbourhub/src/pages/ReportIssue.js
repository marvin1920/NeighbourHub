import { useState } from "react";
import IssueCard from "../components/IssueCard";
import ReportIssueForm from "../components/ReportIssueForm";
import "../styles/ReportIssue.css";
import "../styles/ReportIssueForm.css";

function ReportIssue() {

  const [issues, setIssues] = useState([
    {
      id: 1,
      title: "Street Light Not Working",
      category: "Electricity",
      location: "Building B",
      description: "The street light near the parking area is not working."
    },
    {
      id: 2,
      title: "Water Leakage",
      category: "Water",
      location: "Building A",
      description: "There is water leakage near the entrance."
    },
    {
      id: 3,
      title: "Garbage Not Collected",
      category: "Cleanliness",
      location: "Block C",
      description: "Garbage has not been collected for the last two days."
    }
  ]);

  const [search, setSearch] = useState("");

  // Add Issue
  function addIssue(newIssue) {
    setIssues([...issues, newIssue]);
  }

  // Delete Issue
  function deleteIssue(id) {
    setIssues(
      issues.filter((issue) => issue.id !== id)
    );
  }

  // Search Issues
  const filteredIssues = issues.filter((issue) =>
    issue.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="report-issue-page">

      <h1>Civic Issue Reporting</h1>

      <input
        type="text"
        placeholder="Search reported issues..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <ReportIssueForm onAddIssue={addIssue} />

      <div className="issues-container">

        {filteredIssues.map((issue) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onDelete={deleteIssue}
          />
        ))}

      </div>

    </div>
  );
}

export default ReportIssue;