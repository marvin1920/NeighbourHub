import { useState } from "react";
import EventCard from "../components/EventCard";
import AddEventForm from "../components/AddEventForm";
import "../styles/Events.css";
import "../styles/AddEventForm.css";

function Events() {

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Community Clean-up",
      date: "2026-08-20",
      time: "10:00",
      location: "Community Hall",
      organizer: "Martin"
    },
    {
      id: 2,
      name: "Independence Day Celebration",
      date: "2026-08-15",
      time: "18:00",
      location: "Society Garden",
      organizer: "Rahul"
    },
    {
      id: 3,
      name: "Sports Day",
      date: "2026-08-25",
      time: "09:00",
      location: "Community Ground",
      organizer: "Priya"
    }
  ]);

  const [search, setSearch] = useState("");

  // Add Event
  function addEvent(newEvent) {
    setEvents([...events, newEvent]);
  }

  // Delete Event
  function deleteEvent(id) {
    setEvents(
      events.filter((event) => event.id !== id)
    );
  }

  // Edit Event
  function editEvent(event) {

    const newName = prompt(
      "Enter event name:",
      event.name
    );

    const newDate = prompt(
      "Enter date:",
      event.date
    );

    const newTime = prompt(
      "Enter time:",
      event.time
    );

    const newLocation = prompt(
      "Enter location:",
      event.location
    );

    const newOrganizer = prompt(
      "Enter organizer:",
      event.organizer
    );

    if (
      newName &&
      newDate &&
      newTime &&
      newLocation &&
      newOrganizer
    ) {

      setEvents(
        events.map((item) =>
          item.id === event.id
            ? {
                ...item,
                name: newName,
                date: newDate,
                time: newTime,
                location: newLocation,
                organizer: newOrganizer
              }
            : item
        )
      );
    }
  }

  // Search Events
  const filteredEvents = events.filter((event) =>
    event.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="events-page">

      <h1>Community Events</h1>

      {/* Search */}

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Add Event */}

      <AddEventForm onAddEvent={addEvent} />

      {/* Event Cards */}

      <div className="events-container">

        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={deleteEvent}
            onEdit={editEvent}
          />
        ))}

      </div>

    </div>
  );
}

export default Events;