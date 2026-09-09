import { Link, useLocation } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🏠</div>

        <div>
          <h2>NeighbourHub</h2>
          <span>COMMUNITY</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">

        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active" : ""}
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </Link>

        <Link
          to="/marketplace"
          className={location.pathname === "/marketplace" ? "active" : ""}
        >
          <span className="nav-icon">🛍️</span>
          <span>Marketplace</span>
        </Link>

        <Link
          to="/profile"
          className={location.pathname === "/profile" ? "active" : ""}
        >
          <span className="nav-icon">👤</span>
          <span>Profile</span>
        </Link>

        <Link
          to="/services"
          className={location.pathname === "/services" ? "active" : ""}
        >
          <span className="nav-icon">🛠️</span>
          <span>Services</span>
        </Link>

        <Link
          to="/events"
          className={location.pathname === "/events" ? "active" : ""}
        >
          <span className="nav-icon">📅</span>
          <span>Events</span>
        </Link>

        <Link
          to="/report-issue"
          className={location.pathname === "/report-issue" ? "active" : ""}
        >
          <span className="nav-icon">🚨</span>
          <span>Report Issue</span>
        </Link>

        <Link
          to="/notice-board"
          className={location.pathname === "/notice-board" ? "active" : ""}
        >
          <span className="nav-icon">📢</span>
          <span>Notice Board</span>
        </Link>

      </div>

      {/* Logout */}
      <div className="sidebar-bottom">

        <Link to="/login" className="logout">
          <span className="nav-icon">↪</span>
          <span>Logout</span>
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;