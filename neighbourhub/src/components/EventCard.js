function EventCard({
  event,
  onDelete,
  onEdit,
  currentUser
}) {

  const isOwner =
    currentUser &&
    currentUser.name === event.organizer;

  return (
    <div className="event-card">

      <h2>{event.name}</h2>

      <p>📅 Date: {event.date}</p>

      <p>🕒 Time: {event.time}</p>

      <p>📍 Location: {event.location}</p>

      <p>👤 Organizer: {event.organizer}</p>

      {isOwner && (
        <>
          <button
            onClick={() => onEdit(event)}
            className="edit-button"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(event.id)}
            className="delete-button"
          >
            Delete
          </button>
        </>
      )}

    </div>
  );
}

export default EventCard;