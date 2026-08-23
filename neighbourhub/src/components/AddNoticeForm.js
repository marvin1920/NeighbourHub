import { useState } from "react";

function AddNoticeForm({ onAddNotice }) {

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !category || !description || !date) {
      alert("Please fill all fields");
      return;
    }

    const newNotice = {
      id: Date.now(),
      title: title,
      category: category,
      description: description,
      date: date
    };

    onAddNotice(newNotice);

    setTitle("");
    setCategory("");
    setDescription("");
    setDate("");
  }

  return (
    <div className="add-notice-form">

      <h2>Add Notice</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Notice Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Notice Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button type="submit">
          Add Notice
        </button>

      </form>

    </div>
  );
}

export default AddNoticeForm;