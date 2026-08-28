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

        const [listingsRes, eventsRes, issuesRes, servicesRes, noticesRes] = await Promise.all([
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

      <div className="dashboard-header">
        <h1>Welcome back, {user ? user.name : "Guest"}! 👋</h1>
        <p>Here's what's happening in your community.</p>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Marketplace</h3>
          <h2>{listingCount}</h2>
          <p>Active Listings</p>
        </div>

        <div className="stat-card">
          <h3>Events</h3>
          <h2>{eventCount}</h2>
          <p>Upcoming Events</p>
        </div>

        <div className="stat-card">
          <h3>Issues</h3>
          <h2>{issueCount}</h2>
          <p>Reported Issues</p>
        </div>

        <div className="stat-card">
          <h3>Services</h3>
          <h2>{serviceCount}</h2>
          <p>Local Services</p>
        </div>

        <div className="stat-card">
          <h3>Notices</h3>
          <h2>{noticeCount}</h2>
          <p>Community Notices</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;