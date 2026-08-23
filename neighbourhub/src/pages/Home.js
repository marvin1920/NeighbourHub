import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";
function Home() {
  return (
    <div className="home">
      <Navbar />
      <div className="hero">
        <h1>Welcome to NeighbourHub</h1>
        <p>Your Community. One Platform.</p>

        <a href="/register" className="hero-button">
          Join Your Community
        </a>
      </div>

      <div className="features">

        <div className="feature-card">
          <h3>Marketplace</h3>
          <p>Buy and sell products within your community.</p>
        </div>

        <div className="feature-card">
          <h3>Services</h3>
          <p>Find and offer useful services to your neighbours.</p>
        </div>

        <div className="feature-card">
          <h3>Community Events</h3>
          <p>Stay updated with events happening around you.</p>
        </div>

      </div>
      <Footer />
    </div>
  );
}
export default Home;