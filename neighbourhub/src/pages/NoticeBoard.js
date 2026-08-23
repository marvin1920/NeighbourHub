import { useState } from "react";
import NoticeCard from "../components/NoticeCard";
import AddNoticeForm from "../components/AddNoticeForm";
import "../styles/NoticeBoard.css";
import "../styles/AddNoticeForm.css";

function NoticeBoard() {

  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Community Meeting",
      category: "Meeting",
      description: "Monthly society meeting will be held in the community hall.",
      date: "2026-08-25"
    },
    {
      id: 2,
      title: "Water Supply Notice",
      category: "Important",
      description: "Water supply will be unavailable from 10 AM to 2 PM.",
      date: "2026-08-20"
    },
    {
      id: 3,
      title: "Parking Guidelines",
      category: "General",
      description: "Residents are requested to follow the new parking guidelines.",
      date: "2026-08-22"
    }
  ]);

  const [search, setSearch] = useState("");

  // Add Notice
  function addNotice(newNotice) {
    setNotices([...notices, newNotice]);
  }

  // Delete Notice
  function deleteNotice(id) {
    setNotices(
      notices.filter((notice) => notice.id !== id)
    );
  }

  // Edit Notice
  function editNotice(notice) {

    const newTitle = prompt(
      "Enter notice title:",
      notice.title
    );

    const newCategory = prompt(
      "Enter category:",
      notice.category
    );

    const newDescription = prompt(
      "Enter notice description:",
      notice.description
    );

    const newDate = prompt(
      "Enter date:",
      notice.date
    );

    if (
      newTitle &&
      newCategory &&
      newDescription &&
      newDate
    ) {
      setNotices(
        notices.map((item) =>
          item.id === notice.id
            ? {
                ...item,
                title: newTitle,
                category: newCategory,
                description: newDescription,
                date: newDate
              }
            : item
        )
      );
    }
  }

  // Search Notices
  const filteredNotices = notices.filter((notice) =>
    notice.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="notice-board-page">

      <h1>Notice Board</h1>

      {/* Search */}

      <input
        type="text"
        placeholder="Search notices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Add Notice */}

      <AddNoticeForm onAddNotice={addNotice} />

      {/* Notice Cards */}

      <div className="notices-container">

        {filteredNotices.map((notice) => (
          <NoticeCard
            key={notice.id}
            notice={notice}
            onDelete={deleteNotice}
            onEdit={editNotice}
          />
        ))}

      </div>

    </div>
  );
}

export default NoticeBoard;