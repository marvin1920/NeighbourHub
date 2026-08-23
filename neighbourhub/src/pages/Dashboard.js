import "../styles/Dashboard.css";
function Dashboard() {
  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Welcome back! 👋</h1>
        <p>Here's what's happening in your community.</p>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h3>Marketplace</h3>
          <h2>12</h2>
          <p>Active Listings</p>
        </div>

        <div className="stat-card">
          <h3>Events</h3>
          <h2>5</h2>
          <p>Upcoming Events</p>
        </div>

        <div className="stat-card">
          <h3>Issues</h3>
          <h2>2</h2>
          <p>Reported Issues</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;