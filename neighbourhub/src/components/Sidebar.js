import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>NeighbourHub</h2>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/marketplace">Marketplace</Link>

      <Link to="/profile">Profile</Link>

      <Link to="/services">Services</Link>

      <Link to="/events">Events</Link>

      <Link to="/report-issue">Report Issue</Link>

      <Link to="/notice-board">Notice Board</Link>

      <Link to="/login" className="logout">
        Logout
      </Link>

    </div>
  );
}

export default Sidebar;