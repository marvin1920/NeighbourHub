function NoticeCard({ notice, onDelete, onEdit }) {
  return (
    <div className="notice-card">

      <h2>{notice.title}</h2>

      <p className="notice-category">
        Category: {notice.category}
      </p>

      <p>
        {notice.description}
      </p>

      <p>
        📅 Date: {notice.date}
      </p>

      <button
        onClick={() => onEdit(notice)}
        className="edit-button"
      >
        Edit
      </button>

      <button
        onClick={() => onDelete(notice.id)}
        className="delete-button"
      >
        Delete
      </button>

    </div>
  );
}

export default NoticeCard;