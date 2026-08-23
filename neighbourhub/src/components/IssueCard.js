function IssueCard({ issue, onDelete }) {
  return (
    <div className="issue-card">

      <h2>{issue.title}</h2>

      <p className="issue-category">
        Category: {issue.category}
      </p>

      <p>
        📍 Location: {issue.location}
      </p>

      <p>
        {issue.description}
      </p>

      <button
        onClick={() => onDelete(issue.id)}
        className="delete-button"
      >
        Delete
      </button>

    </div>
  );
}

export default IssueCard;