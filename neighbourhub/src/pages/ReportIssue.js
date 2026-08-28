import API from "../api/api";
import { useState, useEffect } from "react";
import IssueCard from "../components/IssueCard";
import ReportIssueForm from "../components/ReportIssueForm";
import "../styles/ReportIssue.css";
import "../styles/ReportIssueForm.css";

function ReportIssue() {

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchIssues();
  }, []);

  async function fetchIssues() {
    try {
      const response = await API.get(`/issues?society=${encodeURIComponent(currentUser.society)}`);
      setIssues(response.data);
    } catch (error) {
      console.error("Failed to fetch issues:", error);
    }
  }

  async function addIssue(newIssue) {
    try {
      const issueWithReporter = {
        title: newIssue.title,
        category: newIssue.category,
        location: newIssue.location,
        description: newIssue.description,
        reportedBy: currentUser ? currentUser.name : "Unknown",
        society: currentUser ? currentUser.society : ""
      };

      const response = await API.post("/issues", issueWithReporter);
      setIssues([...issues, response.data]);

    } catch (error) {
      console.error("Failed to report issue:", error);
      alert("Failed to report issue.");
    }
  }

  async function deleteIssue(id) {
    try {
      await API.delete(`/issues/${id}`);
      setIssues(issues.filter((issue) => issue.id !== id));
    } catch (error) {
      console.error("Failed to delete issue:", error);
      alert("Failed to delete issue.");
    }
  }

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