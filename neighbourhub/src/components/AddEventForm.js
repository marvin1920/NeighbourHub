import { useState } from "react";

function AddEventForm({ onAddEvent }) {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !date || !time || !location) {
      alert("Please fill all fields");
      return;
    }

    const newEvent = {
      name: name,
      date: date,
      time: time,
      location: location
    };

    onAddEvent(newEvent);

    setName("");
    setDate("");
    setTime("");
    setLocation("");
  }

  return (
    <div className="add-event-form">

      <h2>Add Community Event</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">
          Add Event
        </button>

      </form>

    </div>
  );
}

export default AddEventForm;