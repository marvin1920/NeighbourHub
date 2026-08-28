import API from "../api/api";
import { useState, useEffect } from "react";
import NoticeCard from "../components/NoticeCard";
import AddNoticeForm from "../components/AddNoticeForm";
import "../styles/NoticeBoard.css";
import "../styles/AddNoticeForm.css";

function NoticeBoard() {

  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchNotices();
  }, []);

  async function fetchNotices() {

    if (!currentUser || !currentUser.society) {
      console.error("No logged-in user or society found.");
      return;
    }

    try {
      const response = await API.get(`/notices?society=${encodeURIComponent(currentUser.society)}`);
      setNotices(response.data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  }

  async function addNotice(newNotice) {
    try {
      const noticeWithPoster = {
        title: newNotice.title,
        category: newNotice.category,
        description: newNotice.description,
        date: newNotice.date,
        postedBy: currentUser ? currentUser.name : "Unknown",
        society: currentUser ? currentUser.society : ""
      };

      const response = await API.post("/notices", noticeWithPoster);
      setNotices([...notices, response.data]);

    } catch (error) {
      console.error("Failed to add notice:", error);
      alert("Failed to add notice.");
    }
  }

  async function deleteNotice(id) {
    try {
      await API.delete(`/notices/${id}`);
      setNotices(notices.filter((notice) => notice.id !== id));
    } catch (error) {
      console.error("Failed to delete notice:", error);
      alert("Failed to delete notice.");
    }
  }

  async function editNotice(notice) {

    const newTitle = prompt("Enter notice title:", notice.title);
    const newCategory = prompt("Enter category:", notice.category);
    const newDescription = prompt("Enter notice description:", notice.description);
    const newDate = prompt("Enter date:", notice.date);

    if (newTitle && newCategory && newDescription && newDate) {

      try {
        const updatedData = {
          title: newTitle,
          category: newCategory,
          description: newDescription,
          date: newDate,
          postedBy: notice.postedBy,
          society: notice.society
        };

        const response = await API.put(`/notices/${notice.id}`, updatedData);

        setNotices(
          notices.map((item) =>
            item.id === notice.id ? response.data : item
          )
        );

      } catch (error) {
        console.error("Failed to update notice:", error);
        alert("Failed to update notice.");
      }
    }
  }

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notice-board-page">

      <h1>Notice Board</h1>

      <input
        type="text"
        placeholder="Search notices..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <AddNoticeForm onAddNotice={addNotice} />

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