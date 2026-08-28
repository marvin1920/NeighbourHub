import API from "../api/api";
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import AddEventForm from "../components/AddEventForm";
import "../styles/Events.css";
import "../styles/AddEventForm.css";

function Events() {

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await API.get(`/events?society=${encodeURIComponent(currentUser.society)}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  }

  async function addEvent(newEvent) {
    try {
      const eventWithOrganizer = {
        name: newEvent.name,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        organizer: currentUser ? currentUser.name : "Unknown",
        society: currentUser ? currentUser.society : ""
      };

      const response = await API.post("/events", eventWithOrganizer);
      setEvents([...events, response.data]);

    } catch (error) {
      console.error("Failed to add event:", error);
      alert("Failed to add event.");
    }
  }

  async function deleteEvent(id) {
    try {
      await API.delete(`/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event.");
    }
  }

  async function editEvent(event) {

    const newName = prompt("Enter event name:", event.name);
    const newDate = prompt("Enter date:", event.date);
    const newTime = prompt("Enter time:", event.time);
    const newLocation = prompt("Enter location:", event.location);

    if (newName && newDate && newTime && newLocation) {

      try {
        const updatedData = {
          name: newName,
          date: newDate,
          time: newTime,
          location: newLocation,
          organizer: event.organizer,
          society: event.society
        };

        const response = await API.put(`/events/${event.id}`, updatedData);

        setEvents(
          events.map((item) =>
            item.id === event.id ? response.data : item
          )
        );

      } catch (error) {
        console.error("Failed to update event:", error);
        alert("Failed to update event.");
      }
    }
  }

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="events-page">

      <h1>Community Events</h1>

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <AddEventForm onAddEvent={addEvent} />

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