import { useState } from "react";

function ReportIssueForm({ onAddIssue }) {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !category || !location || !description) {
      alert("Please fill all fields");
      return;
    }

    const newIssue = {
      id: Date.now(),
      title: title,
      category: category,
      location: location,
      description: description
    };

    onAddIssue(newIssue);

    setTitle("");
    setCategory("");
    setLocation("");
    setDescription("");
  }

  return (
    <div className="report-issue-form">

      <h2>Report a Civic Issue</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <textarea
          placeholder="Describe the issue..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">
          Report Issue
        </button>

      </form>

    </div>
  );
}

export default ReportIssueForm;