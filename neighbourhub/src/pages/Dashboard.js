import { useState, useEffect } from "react";
import API from "../api/api";
import "../styles/Dashboard.css";

function Dashboard() {

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [listingCount, setListingCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [issueCount, setIssueCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [noticeCount, setNoticeCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const societyParam = encodeURIComponent(user.society);

        const [
          listingsRes,
          eventsRes,
          issuesRes,
          servicesRes,
          noticesRes
        ] = await Promise.all([
          API.get(`/listings?society=${societyParam}`),
          API.get(`/events?society=${societyParam}`),
          API.get(`/issues?society=${societyParam}`),
          API.get(`/services?society=${societyParam}`),
          API.get(`/notices?society=${societyParam}`)
        ]);

        setListingCount(listingsRes.data.length);
        setEventCount(eventsRes.data.length);
        setIssueCount(issuesRes.data.length);
        setServiceCount(servicesRes.data.length);
        setNoticeCount(noticesRes.data.length);

      } catch (error) {
        console.error("Failed to fetch dashboard counts:", error);
      }
    }

    if (user) {
      fetchCounts();
    }
  }, [user]);

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-badge">NEIGHBOURHUB</span>

          <h1>
            Welcome back, {user ? user.name : "Guest"}! 👋
          </h1>

          <p>
            Here's what's happening in your community today.
          </p>
        </div>

        <div className="community-info">
          <span>🏠</span>
          <div>
            <small>YOUR COMMUNITY</small>
            <strong>{user?.society || "Neighbourhood"}</strong>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-container">

        <div className="stat-card marketplace-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-content">
            <span>MARKETPLACE</span>
            <h2>{listingCount}</h2>
            <p>Active Listings</p>
          </div>
        </div>

        <div className="stat-card events-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <span>EVENTS</span>
            <h2>{eventCount}</h2>
            <p>Upcoming Events</p>
          </div>
        </div>

        <div className="stat-card issues-card">
          <div className="stat-icon">🚨</div>
          <div className="stat-content">
            <span>ISSUES</span>
            <h2>{issueCount}</h2>
            <p>Reported Issues</p>
          </div>
        </div>

        <div className="stat-card services-card">
          <div className="stat-icon">🛠️</div>
          <div className="stat-content">
            <span>SERVICES</span>
            <h2>{serviceCount}</h2>
            <p>Local Services</p>
          </div>
        </div>

        <div className="stat-card notices-card">
          <div className="stat-icon">📢</div>
          <div className="stat-content">
            <span>NOTICES</span>
            <h2>{noticeCount}</h2>
            <p>Community Notices</p>
          </div>
        </div>

      </div>

      {/* Community Section */}
      <div className="dashboard-bottom">

        <div className="welcome-card">
          <div className="welcome-icon">🏡</div>

          <div>
            <h2>Your community, connected.</h2>
            <p>
              Stay updated, discover local services, buy and sell
              products, join events and report community issues —
              all in one place.
            </p>
          </div>
        </div>

        <div className="dashboard-tip">
          <span>💡</span>
          <div>
            <strong>Community Tip</strong>
            <p>
              Keep your neighbourhood active by participating
              in events and sharing useful services.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;